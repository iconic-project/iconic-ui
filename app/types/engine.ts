/**
 * Public /api/engine aliases. Sources are Engine / Complete schemas
 * only — never an RMS resource. Overlays only where Scramble still
 * cannot express the shape. Each leftover mirrors a PHP class.
 */

import type { components } from './api'

/**
 * Mirrors App\Enums\OfferType. Public offers use the same values.
 */
export type EngineOfferType = 'CREDIT' | 'AMT' | 'PCT' | 'VALUE' | 'COMM'

export type EngineOffer = {
  code: string
  name: string
  type: EngineOfferType
  value: number
}

/**
 * Mirrors App\Http\Resources\Engine\EngineSettingsResource.
 */
export type EngineSettings = {
  guests: {
    max_per_property: number
    child_min_age: number
    child_max_age: number
    adult_required_with_children: boolean
    under_age_message: string
  }
  policies: {
    web_hold_minutes: number
    web_hold_extension_minutes: number
    hold_near_business_hours: number
    hold_long_lead_business_days: number
    response_sla_hours: number
    modification_fee_usd: number
    extras_due_hours: number
  }
  legal: {
    consent_versions: {
      terms: string
      cancellation: string
      privacy: string
      insurance: string
      marketing: string
      analytics?: string
      checkout_marketing?: string
    }
  }
  calendar: {
    default_search_from: string
    default_search_to: string
    default_adults: number
    horizon_months: number
    first_bookable_month: string
  }
  locale: {
    default: string
    live: Array<string>
    currency: string
  }
  copy: {
    book_now_pay_later: string
    traveling_with_children: string
    solo_and_triple: string
    pay_today: string
    details_note: string
    confirmation_steps: Array<string>
    online_deposit_advantage: string
    online_deposit_perk: string
  }
  fees: {
    show_in_price_panel: boolean
    footnote: string
  }
}

export type PromoCheck = components['schemas']['PromoCheckResource']

export type CheckoutCreated = components['schemas']['CheckoutCreatedResource']

export type CheckoutExtended = components['schemas']['CheckoutExtendedResource']

export type CheckoutPath = components['schemas']['CheckoutPath']

/**
 * Mirrors App\Http\Resources\Engine\CheckoutStatusResource.
 * Database-only — no live Stripe retrieve.
 */
export type CheckoutStatus = {
  status: 'HOLDING' | 'SUBMITTED' | 'RELEASED' | 'EXPIRED'
  path: CheckoutPath | null
  email: string | null
  bookings: Array<{
    reference: string | null
    status: string
  }>
  stripe_checkout_session_id: string | null
  stripe_expires_at: string | null
}

/**
 * Mirrors App\Http\Resources\Engine\CheckoutSubmittedResource.
 * Generated references is string; email / checkout_url are always required.
 */
export type CheckoutSubmitted = {
  path: CheckoutPath
  references: Array<string>
  email?: string
  checkout_url?: string
}

export type EngineWaitlist = components['schemas']['EngineWaitlistResource']

/**
 * Mirrors CompleteReservationResource.declarations items.
 * Generated declarations is unknown[].
 */
export type CompleteDeclaration = {
  document: string
  label: string
  version: string
  accepted: boolean
  required: boolean
}

/**
 * Mirrors CompleteReservationResource.countries items — not RMS Country.
 * Generated countries is unknown[].
 */
export type EngineCountry = {
  code: string
  name: string
}

export type CompleteGuest = components['schemas']['CompleteGuestResource']

export type CompleteBooking = Omit<
  components['schemas']['CompleteBookingResource'],
  'guests'
> & {
  guests: Array<CompleteGuest>
}

export type CompleteReservation = Omit<
  components['schemas']['CompleteReservationResource'],
  'bookings' | 'declarations' | 'countries'
> & {
  bookings: Array<CompleteBooking>
  declarations: Array<CompleteDeclaration>
  countries: Array<EngineCountry>
}

/**
 * 409 body for POST /engine/checkout/{token}/submit.
 * Mirrors App\Exceptions\PriceChangedException.
 */
export type PriceChangedError = {
  message: string
  quote: {
    total?: number
  }
}

export type EngineEventsAccepted = components['schemas']['EngineEventsAcceptedResource']

export type EngineEventName =
  | NonNullable<components['schemas']['StoreEngineEventsRequest']['events'][number]['name']>
  | 'search_performed'
  | 'room_type_viewed'

/**
 * Mirrors App\Support\Engine\BehaviouralEventParams whitelist keys.
 * Generated params is string[] | null.
 */
export type EngineEventParams = {
  itinerary_code?: string
  departure_id?: number
  step?: string
  cabin_count?: number
  path?: CheckoutPath
  currency?: string
  value?: number
  coupon_code?: string
  page_path?: string
  check_in?: string
  check_out?: string
  adults?: number
  children?: number
  rooms?: number
  room_type?: string
}

/**
 * Mirrors App\Http\Requests\Engine\StoreEngineEventsRequest.
 * session_id is required; generated type is string | null.
 */
export type EngineEventsInput = Omit<
  components['schemas']['StoreEngineEventsRequest'],
  'session_id' | 'events'
> & {
  session_id: string
  events: Array<{
    event_id: string
    name: EngineEventName
    occurred_at: string
    params?: EngineEventParams | null
  }>
}

/**
 * Mirrors App\Support\Crm\AttributionTouch.
 * Generated SubmitCheckoutRequest.attribution touches are string[].
 */
export type AttributionTouch = {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  landing_path?: string
  captured_at?: string
}

export type AttributionInput = {
  first_touch?: AttributionTouch | null
  last_touch?: AttributionTouch | null
}

export type QuestionnaireView = components['schemas']['QuestionnaireResource']

/**
 * Scramble types a PHP associative `answers` array as string[].
 * The validator accepts question key → value.
 */
export type QuestionnaireAnswersInput = Omit<
  components['schemas']['UpdateQuestionnaireRequest'],
  'answers'
> & {
  answers: Record<string, string>
}

export type SurveyQuestion = components['schemas']['SurveyQuestionResource']
export type SurveyView = components['schemas']['SurveyResource']
export type SurveyInput = components['schemas']['StoreSurveyResponseRequest']

export type MarketingLeadInput = components['schemas']['StoreMarketingLeadRequest']
export type UnsubscribeView = components['schemas']['UnsubscribeResource']
