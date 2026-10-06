/**
 * Document, plan and delivery aliases over generated schemas.
 * Overlays only where Scramble still cannot express the shape.
 * Each leftover mirrors a PHP class.
 */

import type { components, operations } from './api'

export type DocumentKind = components['schemas']['DocumentKind']
export type DocumentPlanKind = components['schemas']['DocumentPlanKind']
export type DocumentStatus = components['schemas']['DocumentPlanStatus']

/**
 * Mirrors App\Enums\DeliveryKind. No FormRequest enum schema.
 */
export type DeliveryKind =
  | 'INVOICE'
  | 'FINAL_INVOICE'
  | 'SUMMARY'
  | 'RECEIPT'
  | 'REMINDER'
  | 'VOUCHER'
  | 'PRETRIP'
  | 'PAYMENT_LINK'
  | 'WIRE_INSTRUCTIONS'

/**
 * Mirrors App\Enums\DeliveryStatus. No FormRequest enum schema.
 */
export type DeliveryStatus = 'QUEUED' | 'SENT' | 'FAILED' | 'BLOCKED'

export type IssuedDocument = Omit<
  components['schemas']['DocumentResource'],
  'kind'
> & {
  kind: DocumentKind
}

export type DocumentPlanRow = Omit<
  components['schemas']['DocumentPlanRowResource'],
  'kind' | 'status'
> & {
  kind: DocumentPlanKind
  status: DocumentStatus
}

/**
 * Same row as DocumentPlanRow. GET /documents paginates
 * DocumentPlanRowResource.
 */
export type ClientDocumentRow = DocumentPlanRow

export type ClientDocumentFilters = operations['clientDocument.index']['responses'][200]['content']['application/json']['meta']['filters']

export type Delivery = Omit<
  components['schemas']['DeliveryResource'],
  'kind' | 'status'
> & {
  kind: DeliveryKind
  status: DeliveryStatus
}
