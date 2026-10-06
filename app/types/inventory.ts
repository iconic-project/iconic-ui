/**
 * Inventory aliases over generated schemas. Leftovers are closed unions
 * Scramble still emits as string, ItineraryPair tuples, ItineraryDefaults
 * seed literals, and overlays that only narrow. Each leftover mirrors a PHP
 * class and must change with it.
 */

import type { components, operations } from './api'

export type CabinCategory = components['schemas']['CabinCategory']
export type ItineraryStatus = components['schemas']['ItineraryStatus']
export type DepartureStatus = components['schemas']['DepartureStatus']
export type BlockReason = components['schemas']['BlockReason']

/** Mirrors App\Enums\CabinState. Scramble emits string. */
export type CabinState = 'FREE' | 'HELD' | 'SOLD' | 'BLOCKED'

/** Mirrors App\Enums\ClaimKind. Scramble emits string. */
export type ClaimKind = 'BLOCK' | 'HOLD' | 'BOOKING'

/** Mirrors App\Enums\HoldType. Scramble emits string. */
export type HoldType = 'WEB' | 'REQUEST' | 'AGENCY' | 'CHARTER_QUOTE'

export type EngineLabelCode = components['schemas']['EngineLabelCode']

/** Mirrors App\Enums\EngineLabelTone. Scramble emits string. */
export type EngineLabelTone = 'wait' | 'comp' | 'pend' | 'canc' | 'hold' | 'conf'

/**
 * Mirrors App\Enums\CabinState leftover used by the departure calendar.
 * Generated items type id / sort as string.
 */
export type Cabin = {
  id: number
  code: string
  label: string
  category: CabinCategory
  sort: number
}

/**
 * Mirrors App\Http\Resources\Rms\PropertyResource.
 * The generated name is PropertyResource. Screens that still say yacht
 * import this alias until they move to properties.
 */
export type Yacht = components['schemas']['PropertyResource']

/** Mirrors itinerary facts / day_plan / faqs pairs (list<array{0: string, 1: string}>). */
export type ItineraryPair = [string, string]

/** Mirrors App\Support\Itineraries\Gradients::catalog() entries. */
export type ItineraryGradient = {
  key: string
  css: string
}

export type ItineraryCompleteness = components['schemas']['ItineraryResource']['completeness']

export type Itinerary = Omit<
  components['schemas']['ItineraryResource'],
  'status' | 'hero_image_url' | 'facts' | 'day_plan' | 'faqs'
> & {
  status: ItineraryStatus
  hero_image_url: string | null
  facts: Array<ItineraryPair>
  day_plan: Array<ItineraryPair>
  faqs: Array<ItineraryPair>
}

export type ItineraryListItem = Itinerary

/**
 * Mirrors App\Support\Itineraries\Defaults::payload().
 * Generated ItineraryDefaultsResource freezes seed literals and types
 * day_plan as string[]. Update when the PHP payload changes.
 */
export type ItineraryDefaults = {
  status: ItineraryStatus
  sort_order: number
  festive: boolean
  days: number
  nights: number
  embark: string
  disembark: string
  tagline: string
  hero_alt: string
  fallback_gradient: string
  fallback_gradient_key: string
  gradients: Array<ItineraryGradient>
  card_description: string
  overview: string
  long_description: string
  highlights: Array<string>
  chips: Array<string>
  facts: Array<ItineraryPair>
  day_plan: Array<ItineraryPair>
  included: Array<string>
  excluded: Array<string>
  faqs: Array<ItineraryPair>
  slug: string | null
  meta_title: string
  meta_description: string
}

/** Mirrors App\Support\Inventory\EngineLabel. Code is the named schema. Tone is still a string. */
export type EngineLabel = {
  code: EngineLabelCode
  text: string
  tone: EngineLabelTone
}

/**
 * Mirrors App\Services\Inventory\Availability holder.detail.
 * Generated oneOf is usable; enums on each arm stay string in the spec.
 */
export type ClaimHolderDetail =
  | {
    reason: BlockReason
    reason_label: string
  }
  | {
    status: components['schemas']['BookingStatus']
    type: components['schemas']['BookingType']
    segment: components['schemas']['BookingSegment']
    display_reference: string | null
    owner_id: number
    owner_name: string
    party_label: string
    hold_expired: boolean
  }
  | null

export type ClaimHolder = {
  type: string
  id: number
  reference: string | null
  label: string | null
  detail: ClaimHolderDetail
}

export type ClaimSummary = {
  kind: ClaimKind
  hold_type: HoldType | null
  expires_at: string | null
  holder: ClaimHolder
}

export type CabinAvailability = {
  cabin: {
    code: string
    label: string
    category: CabinCategory
  }
  state: CabinState
  claim: ClaimSummary | null
}

export type AvailabilityCounts = components['schemas']['DepartureResource']['availability']['counts']

export type Availability = {
  counts: AvailabilityCounts
  engine_label: EngineLabel
  cabins?: Array<CabinAvailability>
}

export type DepartureLocks = components['schemas']['DepartureResource']['locks']

export type DepartureKpis = operations['departure.index']['responses'][200]['content']['application/json']['meta']['kpis']

export type Departure = Omit<
  components['schemas']['DepartureResource'],
  'status' | 'availability' | 'locks'
> & {
  status: DepartureStatus
  availability: Availability & { cabins: Array<CabinAvailability> }
  locks: DepartureLocks
}

export type DepartureListItem = Omit<
  components['schemas']['DepartureResource'],
  'status' | 'availability' | 'locks'
> & {
  status: DepartureStatus
  availability: Availability
  locks?: DepartureLocks
}

export type DepartureLayout = Departure

export type DepartureMutationResponse = Departure & {
  warnings: Array<string>
}

export type GenerateSeasonResult = components['schemas']['GenerateSeasonResource']

export type CalendarDeparture = Omit<
  components['schemas']['CalendarGridResource']['departures'][number],
  'status'
> & {
  status: DepartureStatus
}

export type CalendarCell = {
  state: CabinState
  claim: ClaimSummary | null
}

export type CalendarRow = Omit<
  components['schemas']['CalendarGridResource']['rows'][number],
  'cabin' | 'cells'
> & {
  cabin: Cabin
  cells: Record<string, CalendarCell>
}

export type CalendarGrid = {
  departures: Array<CalendarDeparture>
  rows: Array<CalendarRow>
}

/** Mirrors App\Enums\RoomNightState. */
export type NightState = 'FREE' | 'HELD' | 'SOLD' | 'BLOCKED'

/** Mirrors the claim object on App\Services\Inventory\NightGrid. */
export type NightClaim = {
  claim_group: string
  reference: string | null
  guest_surname: string | null
  owner: string | null
  holder_type: string
  holder_id: number
}

/** Mirrors one cell on App\Services\Inventory\NightGrid. */
export type NightCell = {
  night: string
  state: NightState
  claim: NightClaim | null
}

/** Mirrors one room row on App\Services\Inventory\NightGrid. */
export type NightRoom = {
  id: number
  code: string
  label: string
  sort: number
  room_type: {
    id: number
    code: string
    name: string
  }
  cells: Array<NightCell>
}

/** Mirrors the per-night type counts on App\Services\Inventory\NightGrid. */
export type NightCounts = {
  total: number
  free: number
  held: number
  sold: number
  blocked: number
}

/** Mirrors App\Services\Inventory\NightGrid. `to` is exclusive. */
export type NightCalendar = {
  property: {
    id: number
    code: string
    name: string
  }
  from: string
  to: string
  nights: Array<string>
  rooms: Array<NightRoom>
  counts: Record<string, Record<string, NightCounts>>
  occupancy: {
    room_nights_available: number
    room_nights_sold: number
    pct: number
  }
  kpis: {
    occupancy_pct: number
    free_room_nights: number
    nights_fully_sold: number
    nights_below_threshold: number
  }
}

export type BlockClaim = Omit<
  components['schemas']['InternalBlockResource']['claims'][number],
  'kind'
> & {
  kind: ClaimKind
}

export type InternalBlock = Omit<
  components['schemas']['InternalBlockResource'],
  'reason' | 'claims'
> & {
  reason: BlockReason
  claims: Array<BlockClaim>
}

type UnavailableBody = components['responses']['CabinUnavailableException']['content']['application/json']

export type CabinUnavailableItem = Omit<UnavailableBody['unavailable'][number], 'held_by'> & {
  held_by: {
    kind: ClaimKind
    holder_type: string
    reference: string | null
  }
}

export type CabinUnavailableError = {
  message: string
  unavailable: Array<CabinUnavailableItem>
}

/** Sprint 12 waitlist list fields. The row stays `WaitlistEntry` in bookings.ts. */
export type WaitlistNotice = Pick<
  components['schemas']['WaitlistEntryResource'],
  'auto_notified' | 'position' | 'notified'
>

/** Mirrors App\Support\Content\Completeness. */
export type ContentCompleteness = {
  pct: number
  missing: Array<string>
  blocking: Array<string>
}

/**
 * Mirrors App\Http\Resources\Rms\PropertyResource after the content fields.
 * Generated PropertyResource lags the PHP resource until `pnpm types:api`.
 */
export type PropertyContent = components['schemas']['PropertyResource'] & {
  hero_image_url: string | null
  completeness: ContentCompleteness
}

/** Mirrors a room type photo on RoomTypeResource. */
export type RoomTypePhoto = {
  path: string
  alt: string | null
  url: string | null
}

/**
 * Mirrors App\Http\Resources\Rms\RoomTypeResource after the content fields.
 */
export type RoomTypeContent = Omit<components['schemas']['RoomTypeResource'], 'photos'> & {
  photos: Array<RoomTypePhoto> | null
  completeness: ContentCompleteness
  engine_visible: boolean
}

/** Mirrors App\Http\Resources\Rms\RoomResource. */
export type RoomRow = components['schemas']['RoomResource']
