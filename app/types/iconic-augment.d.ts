import type { ApiError } from '../composables/useApi'

declare module '#app' {
  interface RuntimeNuxtHooks {
    'iconic:api-error': (error: ApiError) => void
  }
}

declare module 'nuxt/schema' {
  interface AppConfig {
    iconic?: {
      displayTimeZone?: string
    }
  }
}

export {}
