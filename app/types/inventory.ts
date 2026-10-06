/**
 * Inventory aliases over generated schemas. Leftovers are closed unions
 * Scramble still emits as string. Each leftover mirrors a PHP class.
 */

import type { components } from './api'

export type BlockReason = components['schemas']['BlockReason']

/** Mirrors App\Enums\ClaimKind. Scramble emits string. */
export type ClaimKind = 'BLOCK' | 'HOLD' | 'BOOKING'

/** Mirrors App\Enums\HoldType. Scramble emits string. */
export type HoldType = 'WEB' | 'REQUEST' | 'AGENCY'

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

export type InternalBlock = Omit<
  components['schemas']['InternalBlockResource'],
  'reason'
> & {
  reason: BlockReason
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

/** Mirrors App\Http\Resources\Rms\PropertyResource content fields. */
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

/** Mirrors App\Http\Resources\Rms\RoomTypeResource content fields. */
export type RoomTypeContent = Omit<components['schemas']['RoomTypeResource'], 'photos'> & {
  photos: Array<RoomTypePhoto> | null
  completeness: ContentCompleteness
  engine_visible: boolean
}

/** Mirrors App\Http\Resources\Rms\RoomResource. */
export type RoomRow = components['schemas']['RoomResource']
