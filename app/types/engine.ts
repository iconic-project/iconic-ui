/**
 * Public /api/engine aliases. Sources are Engine / Complete schemas
 * only — never an RMS resource. Overlays only where Scramble still
 * cannot express the shape. Each leftover mirrors a PHP class.
 */

import type { components } from './api'

export type EngineFeed = Omit<
  components['schemas']['FeedResource'],
  'itineraries' | 'departures' | 'rates' | 'settings' | 'offers'
> & {
  itineraries: Array<EngineItinerary>
  departures: Array<EngineDeparture>
  rates: EngineRates
  settings: EngineSettings
  offers: Array<EngineOffer>
}

export type EngineItinerary = Omit<
  components['schemas']['EngineItineraryResource'],
  'card'
> & {
  card: Omit<components['schemas']['EngineItineraryResource']['card'], 'hero_image'> & {
    hero_image: string | null
  }
}

/**
 * Mirrors App\Http\Resources\Engine\EngineDepartureResource.
 * Generated id / festive / counts / waitlist / offers freeze as string.
 */
export type EngineDeparture = {
  id: number
  itinerary: string
  yacht: string
  embark: string
  disembark: string
  festive: boolean
  rate_year: number
  status: string
  suites_free: number
  owner_free: boolean
  label: string
  urgency_threshold: number
  waitlist: boolean
  note: string | null
  offers: Array<string>
}

/**
 * Mirrors App\Enums\OfferType. Public feed offers use the same
 * values; COMM never appears on /api/engine.
 */
export type EngineOfferType = 'CREDIT' | 'AMT' | 'PCT' | 'VALUE' | 'COMM'

export type EngineOffer = Omit<components['schemas']['EngineOfferResource'], 'type'> & {
  type: EngineOfferType
}

/**
 * Mirrors App\Http\Resources\Engine\EngineRatesResource.
 * Generated year maps and years freeze as string.
 */
export type EngineRates = {
  currency: string
  years: Array<number>
  suite_pp_double: Record<string, number>
  owner_pp_double: Record<string, number>
  charter_week: Record<string, number>
  terms: components['schemas']['EngineRatesResource']['terms']
  rules: components['schemas']['EngineRatesResource']['rules']
}

/**
 * Mirrors App\Http\Resources\Engine\EngineSettingsResource.
 * Generated guests / locale / copy / fees freeze as string.
 */
export type EngineSettings = {
  guests: {
    max_per_cabin: number
    max_per_yacht: number
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
    tct_pp: number
    png: {
      foreign_over_12: number
      foreign_12_and_under: number
      can_adult: number
      can_minor: number
      national_or_resident: number
      exempt_under_age: number
    }
    show_in_price_panel: boolean
    footnote: string
  }
  charter: {
    headline: string
    intro: string
    itinerary_label: string
    response_sla_hours: number
    group_contexts: Array<string>
    thank_you: string
    capacity: number
  }
}

export type EngineCabin = components['schemas']['DepartureCabinResource']
export type PromoCheck = components['schemas']['PromoCheckResource']

export type EnginePriceLine = {
  code: string
  label: string
  amount: number
}

/**
 * Mirrors App\Http\Resources\Engine\EngineQuoteResource.
 * Generated cabins is unknown[] and total / deposit freeze as 0 | null.
 */
export type EngineQuote = {
  departure_id: number
  type: string
  back_to_back: boolean
  cabins: Array<{
    cabin_code: string | null
    cabin_label: string
    adults: number
    children: number
    available: boolean
    quote: {
      lines: Array<EnginePriceLine>
      total: number
      deposit_pct: number
      deposit: number
    } | null
    errors: Array<string>
    warnings: Array<string>
  }>
  total: number | null
  deposit: number | null
  warnings: Array<string>
  terms: components['schemas']['EngineQuoteResource']['terms']
}

export type CheckoutCreated = Omit<
  components['schemas']['CheckoutCreatedResource'],
  'quote'
> & {
  quote: EngineQuote
}

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

/**
 * Mirrors App\Http\Resources\Engine\EngineWaitlistResource.
 * Generated cabin_category / source stay string.
 */
export type EngineWaitlist = Omit<
  components['schemas']['EngineWaitlistResource'],
  'cabin_category'
> & {
  cabin_category: components['schemas']['CabinCategory']
}

export type CharterProposalView = components['schemas']['CharterProposalViewResource']
export type AcceptCharterProposalInput = components['schemas']['AcceptCharterProposalRequest']
export type DeclineCharterProposalInput = components['schemas']['DeclineCharterProposalRequest']

/**
 * Mirrors App\Http\Resources\Engine\EngineCharterEnquiryResource.
 */
export type EngineCharterEnquiry = Omit<
  components['schemas']['EngineCharterEnquiryResource'],
  'status' | 'source'
> & {
  status: 'NEW'
  source: 'ENGINE'
}

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
  quote: EngineQuote
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
