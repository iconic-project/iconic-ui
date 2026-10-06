/**
 * Booking aliases over generated schemas. Overlays only where Scramble
 * still cannot express the shape. Each leftover mirrors a PHP class.
 */

import type { components, operations } from './api'
import type { CancellationBandLabel, PaymentLink, RefundStatus } from './payments'

export type BookingStatus = components['schemas']['BookingStatus'] | 'IN_HOUSE' | 'CHECKED_OUT' | 'NO_SHOW'

export type DeskAction = 'check_in' | 'check_out' | 'no_show' | 'modify_stay' | 'move_room'
export type BookingType = components['schemas']['BookingType']
export type BookingSegment = components['schemas']['BookingSegment']
export type MainChannel = components['schemas']['MainChannel']
export type ChannelOfOrigin = components['schemas']['ChannelOfOrigin']
export type PreferredChannel = components['schemas']['PreferredChannel']

export type PriceLine = {
  code: string
  label: string
  amount: number
}

/**
 * Mirrors App\Support\Bookings\Transitions::allowedFor() items.
 * BookingResource.allowed_transitions items serialise as [] in OpenAPI.
 */
export type AllowedTransition = {
  to: BookingStatus
  reason_required: boolean
}

export type Contact = components['schemas']['ContactResource']
export type ContactSearchResult = Contact

export type GroupSummary = {
  id: number
  reference: string
  name: string
  coordinator: {
    id: number
    name: string
  }
}

export type Group = Omit<components['schemas']['GroupResource'], 'statuses'> & {
  statuses: Array<BookingStatus>
}

export type BookingOwner = components['schemas']['BookingOwnerResource']

/**
 * Mirrors App\Support\Bookings\RequestSummary::for().
 * Generated sla.due_at is string | null; the API always sends a string.
 */
export type BookingRequestSummary = {
  preferred_channel: string
  travel_advisor: boolean
  notes: string | null
  hold: {
    expires_at: string | null
    expired: boolean
    rule: string
    remaining_business_minutes: number
  }
  sla: {
    due_at: string
    remaining_minutes: number
    breached: boolean
  }
}

export type Booking = Omit<
  components['schemas']['BookingResource'],
  | 'type'
  | 'status'
  | 'segment'
  | 'main_channel'
  | 'channel_of_origin'
  | 'can_act'
  | 'allowed_transitions'
  | 'price_lines'
  | 'contact'
  | 'group'
  | 'request'
  | 'refund'
  | 'payment_links'
  | 'commission_cap_pct'
> & {
  type: BookingType
  status: BookingStatus
  segment: BookingSegment
  main_channel: MainChannel
  channel_of_origin: ChannelOfOrigin
  can_act: boolean
  allowed_transitions: Array<AllowedTransition>
  price_lines: Array<PriceLine>
  contact: Contact
  group: GroupSummary | null
  request: BookingRequestSummary | null
  commission_cap_pct: number
  refund: {
    status: RefundStatus
    penalty_amount: number
    refund_due: number
    band_label: CancellationBandLabel
    due_by: string
  } | null
  payment_links: Array<PaymentLink>
  property_id: number | null
  stay: {
    check_in: string
    check_out: string
    nights: number
  } | null
  room: {
    id: number
    code: string
    label: string
  } | null
  room_type: {
    id: number
    code: string
    name: string
  } | null
  rate_plan: string | null
  night_lines: Array<{ night: string, total: number }> | null
  tax_lines: Array<{ code: string, label: string, amount: number, charged: boolean }> | null
  times: {
    expected_arrival_time: string | null
    checked_in_at: string | null
    checked_out_at: string | null
    no_show_at: string | null
  }
  allowed_actions: Array<DeskAction>
}

export type BookingListItem = Booking

export type BookingQuoteRequest = components['schemas']['QuoteReservationRequest']
export type CreateReservationRequest = components['schemas']['StoreReservationRequest']
export type StayFormRoomType = {
  id: number
  code: string
  name: string
  property_id: number
  base_occupancy: number
  max_occupancy: number
  max_adults: number
  max_children: number
  restrictions: Array<string>
}

export type BookingFormOptions = components['schemas']['BookingFormOptionsResource'] & {
  stay: {
    min_nights: number
    max_nights: number
    max_rooms_per_booking: number
    booking_horizon_days: number
  }
  room_types: Array<StayFormRoomType>
  rate_plans: Array<{
    code: string
    name: string
    default: boolean
    deposit_pct: number
    balance_days: number
    refundable: boolean
  }>
}

/**
 * Mirrors App\Http\Resources\Rms\ReservationQuoteResource.
 * Generated cabins is unknown[] and total / deposit freeze as 0 | null.
 * terms comes through from the generated schema.
 */
export type BookingQuote = {
  departure_id: number
  type: BookingType
  back_to_back: boolean
  cabins: Array<{
    cabin_code: string | null
    cabin_label: string
    adults: number
    children: number
    available: boolean
    quote: {
      lines: Array<PriceLine>
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
  terms: components['schemas']['ReservationQuoteResource']['terms']
}

type CreatedBody = operations['booking.store']['responses'][201]['content']['application/json']

export type CreateReservationResponse = Omit<CreatedBody, 'bookings'> & {
  bookings: Array<Booking>
}

export type MovePreview = components['schemas']['MovePreviewResource']

/**
 * Mirrors App\Http\Resources\Rms\BookingAuditResource.
 * Generated client / what are unknown.
 */
export type BookingAuditRow = Omit<
  components['schemas']['BookingAuditResource'],
  'client' | 'what' | 'at'
> & {
  at: string
  client: string | null
  what: string
}

/**
 * Mirrors App\Http\Resources\Rms\BookingRequestResource.
 * Generated can_act is string; party freezes a seed literal;
 * hold / sla are `string | object` (Scramble follows the runtime `??` fallback).
 */
export type RequestQueueItem = Omit<
  components['schemas']['BookingRequestResource'],
  'can_act' | 'party' | 'contact' | 'hold' | 'sla' | 'departure' | 'cabin_label'
> & {
  can_act: boolean
  party: string
  contact: {
    name: string
    preferred_channel: string
  }
  hold: BookingRequestSummary['hold']
  sla: BookingRequestSummary['sla']
  stay: {
    check_in: string
    check_out: string
  }
  nights: number
  room_type: {
    id: number
    code: string
    name: string
  } | null
  rooms_count: number
  copy: string
}

/**
 * Mirrors App\Http\Resources\Rms\HoldResource.
 * Generated type is string | null; booking_id is number (PHPDoc is int|null).
 */
export type HoldListItem = Omit<
  components['schemas']['HoldResource'],
  'type' | 'booking_id'
> & {
  type: string
  booking_id: number | null
}

export type WaitlistEntry = Omit<
  components['schemas']['WaitlistEntryResource'],
  'cabin_category' | 'cabin_type' | 'cabin_available' | 'departure'
> & {
  stay: {
    check_in: string
    check_out: string
    room_type: {
      code: string
      name: string
    }
  }
  room_available: boolean
}

export type RequestQueueRules = operations['request.index']['responses'][200]['content']['application/json']['meta']['rules']

export type HoldListRules = operations['hold.index']['responses'][200]['content']['application/json']['meta']['rules']
