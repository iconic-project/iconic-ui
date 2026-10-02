import type { MaybeRefOrGetter } from 'vue'

export const API_ERROR_STATUSES = [401, 403, 409, 419, 422] as const

export type ApiErrorStatus = (typeof API_ERROR_STATUSES)[number]

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export type ConflictingContact = {
  id: number
  name: string
}

export class ApiError extends Error {
  status: ApiErrorStatus
  errors?: Record<string, Array<string>>
  conflictingContact?: ConflictingContact

  constructor(
    status: ApiErrorStatus,
    message: string,
    errors?: Record<string, Array<string>>,
    conflictingContact?: ConflictingContact,
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
    this.conflictingContact = conflictingContact
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

export type ApiRequestOptions = {
  method?: HttpMethod | Lowercase<HttpMethod>
  headers?: HeadersInit
  body?: unknown
  credentials?: RequestCredentials
  baseURL?: string
}

export type ApiFetch = (url: string, options?: ApiRequestOptions) => Promise<unknown>

function isApiErrorStatus(status: number): status is ApiErrorStatus {
  return (API_ERROR_STATUSES as ReadonlyArray<number>).includes(status)
}

function responseStatus(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) {
    return undefined
  }

  if ('status' in error && typeof error.status === 'number') {
    return error.status
  }

  if ('statusCode' in error && typeof error.statusCode === 'number') {
    return error.statusCode
  }

  if (
    'response' in error
    && typeof error.response === 'object'
    && error.response !== null
    && 'status' in error.response
    && typeof error.response.status === 'number'
  ) {
    return error.response.status
  }

  return undefined
}

function responseData(error: unknown): {
  message?: string
  errors?: Record<string, Array<string>>
  conflicting_contact?: { id?: unknown, name?: unknown }
} {
  if (typeof error !== 'object' || error === null || !('data' in error) || typeof error.data !== 'object' || error.data === null) {
    return {}
  }

  return error.data as {
    message?: string
    errors?: Record<string, Array<string>>
    conflicting_contact?: { id?: unknown, name?: unknown }
  }
}

function conflictingContactFrom(data: {
  conflicting_contact?: { id?: unknown, name?: unknown }
}): ConflictingContact | undefined {
  const contact = data.conflicting_contact

  if (!contact || typeof contact.id !== 'number' || typeof contact.name !== 'string') {
    return undefined
  }

  return { id: contact.id, name: contact.name }
}

export function toApiError(error: unknown): ApiError | null {
  if (error instanceof ApiError) {
    return error
  }

  const status = responseStatus(error)

  if (status === undefined || !isApiErrorStatus(status)) {
    return null
  }

  const data = responseData(error)

  return new ApiError(status, data.message ?? 'Request failed', data.errors, conflictingContactFrom(data))
}

function readDocumentXsrfToken(): string | null {
  const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/)

  return match?.[1] ? decodeURIComponent(match[1]) : null
}

export function createApiClient(options: {
  baseURL: string
  isClient: boolean
  fetchImpl: ApiFetch
  readXsrfToken?: () => string | null
  onError?: (error: ApiError) => void
}) {
  const { baseURL, isClient, fetchImpl, onError } = options
  const readXsrfToken = options.readXsrfToken ?? readDocumentXsrfToken
  let csrfPromise: Promise<void> | null = null

  async function ensureCsrfCookie(): Promise<void> {
    if (!isClient) {
      return
    }

    if (!csrfPromise) {
      csrfPromise = Promise.resolve(fetchImpl('/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include',
        baseURL,
      }))
        .then(() => undefined)
        .catch((error: unknown) => {
          csrfPromise = null
          throw error
        })
    }

    await csrfPromise
  }

  async function request(url: string, requestOptions: ApiRequestOptions = {}, retried = false): Promise<unknown> {
    const method = (requestOptions.method ?? 'GET').toUpperCase() as HttpMethod
    const headers = new Headers(requestOptions.headers)

    if (isClient && MUTATING_METHODS.has(method)) {
      await ensureCsrfCookie()
      const token = readXsrfToken()

      if (token) {
        headers.set('X-XSRF-TOKEN', token)
      }
    }

    try {
      return await fetchImpl(url, {
        ...requestOptions,
        method,
        headers,
        credentials: 'include',
        baseURL,
      })
    }
    catch (error) {
      const apiError = toApiError(error)

      if (apiError?.status === 419 && isClient && !retried) {
        csrfPromise = null

        return request(url, requestOptions, true)
      }

      if (apiError) {
        onError?.(apiError)
        throw apiError
      }

      throw error
    }
  }

  return {
    request,
  }
}

export function useApi() {
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()
  const baseURL = String(config.public.apiBase)
  const client = createApiClient({
    baseURL,
    isClient: import.meta.client,
    fetchImpl: (url, options) => $fetch(url, {
      baseURL,
      credentials: 'include',
      method: options?.method,
      headers: options?.headers,
      body: options?.body as BodyInit | Record<string, unknown> | null | undefined,
    }),
    readXsrfToken: () => {
      if (!import.meta.client) {
        return null
      }

      return readDocumentXsrfToken()
    },
    onError: (error) => {
      void nuxtApp.callHook('iconic:api-error', error)
    },
  })

  function useApiFetch<DataT>(
    url: MaybeRefOrGetter<string>,
    options: Record<string, unknown> = {},
  ) {
    return useFetch<DataT>(url, {
      ...options,
      $fetch: client.request as typeof $fetch,
    })
  }

  return {
    request: client.request,
    useFetch: useApiFetch,
  }
}
