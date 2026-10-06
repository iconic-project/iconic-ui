/**
 * Portal /api/portal aliases. Sources are portal schemas only.
 * This file does not import CRM or panel types.
 *
 * payment_state on PortalBooking and PortalRequest is the inline enum
 * Scramble emitted (three sentences from paymentStateWords). next stays a
 * string because the sentence interpolates the SLA hours.
 */

import type { components } from './api'

export type PortalSession = components['schemas']['PortalMeResource']
export type PortalAgency = components['schemas']['PortalAgencyMeResource']
export type PortalNetRates = components['schemas']['PortalStayRatesResource']
export type PortalAvailabilityRow = components['schemas']['PortalAvailabilityResource']
export type PortalBooking = components['schemas']['PortalBookingResource']
export type PortalCommission = components['schemas']['PortalCommissionResource']
export type PortalMaterial = components['schemas']['PortalSalesMaterialResource']
export type PortalRequest = components['schemas']['PortalRequestResource']
export type PortalRequestCreated = components['schemas']['PortalRequestCreatedResource']
export type PortalRequestInput = components['schemas']['StorePortalRequestRequest']

export type PortalStayLimits = {
  min_nights: number
  max_nights: number
  max_rooms: number
}

export type PortalStayQuote = {
  rate_plan: string
  total: number
  deposit: number
  deposit_pct: number
  total_including_charged_taxes: number
}

export type PortalStayRoomType = {
  code: string
  name: string
  bookable: boolean
  reasons: Array<string>
  rooms_left: number
  quotes: Array<PortalStayQuote>
}

export type PortalStayAvailability = {
  check_in: string
  check_out: string
  adults: number
  child_ages: Array<number>
  rooms: number
  commission_pct: number
  stay: PortalStayLimits
  room_types: Array<PortalStayRoomType>
}

export type PortalCalendarNight = {
  night: string
  available: boolean
  from_price: number | null
  closed_to_arrival: boolean
  closed_to_departure: boolean
  min_stay: number
}

export type PortalStayCalendar = {
  from: string
  months: number
  adults: number
  children: number
  nights: Array<PortalCalendarNight>
  commission_pct: number
  stay: PortalStayLimits
}

export type PortalSeason = {
  code: string
  name: string
  from: string
  to: string
}

export type PortalRoomRate = {
  room_type: string
  season: string
  nightly: number
}

export type PortalRatePlan = {
  code: string
  name: string
  default: boolean
  adjust_pct: number
  refundable: boolean
  deposit_pct: number
  balance_days: number
  cancellation: string
  meal_plan: string
}

export type PortalLengthOfStay = {
  min_nights: number
  discount_pct: number
}

export type PortalSupplement = {
  code: string
  label: string
  from: string
  to: string
  per_night: number
  basis: string
}

export type PortalStayRates = {
  commission_pct: number
  currency: string
  stay: PortalStayLimits
  seasons: Array<PortalSeason>
  room_types: Array<{ code: string, name: string }>
  room_rates: Array<PortalRoomRate>
  rate_plans: Array<PortalRatePlan>
  length_of_stay: Array<PortalLengthOfStay>
  supplements: Array<PortalSupplement>
}

export type PortalRoomTypeRef = {
  code: string
  name: string
} | null

export type PortalStayBooking = {
  id: number
  reference: string | null
  check_in: string
  check_out: string
  room_type: PortalRoomTypeRef
  status: PortalBooking['status']
  lead_guest: string
  net_due: number
  payment_state: PortalBooking['payment_state']
  open_payment_kinds: PortalBooking['open_payment_kinds']
}

export type PortalStayCommission = {
  reference: string | null
  check_in: string
  check_out: string
  room_type: PortalRoomTypeRef
  rate: number | null
  commission_amount: number
  payable_date: string
  status: PortalCommission['status']
  payout: PortalCommission['payout']
}

export type PortalStayRequestRoom = {
  room_type: string
  adults: number
  child_ages: Array<number>
  rate_plan?: string
}

export type PortalStayRequestInput = {
  check_in: string
  check_out: string
  rooms: Array<PortalStayRequestRoom>
  client: {
    name: string
    email: string
  }
  notes?: string
  client_of_record: true
}
export type PortalPaymentLinkInput = components['schemas']['CreatePortalPaymentLinkRequest']
export type AcceptPortalInviteInput = components['schemas']['AcceptInviteRequest']
export type PortalLoginInput = components['schemas']['PortalLoginRequest']
export type PortalForgotInput = components['schemas']['PortalForgotPasswordRequest']
export type PortalResetInput = components['schemas']['PortalResetPasswordRequest']
