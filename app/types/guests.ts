/**
 * Guest, consent and Contacts In aliases over generated schemas.
 * Overlays only where Scramble still cannot express the shape.
 * Each leftover mirrors a PHP class.
 */

import type { components, operations } from './api'
import type {
  BookingSegment,
  BookingStatus,
  ChannelOfOrigin,
  MainChannel,
} from './bookings'

export type MaskedNote = components['schemas']['MaskedNoteResource']

/**
 * Mirrors GuestIssues::issue() severity. The DocumentedResponse
 * still serialises the field as string.
 */
export type GuestIssueSeverity = 'error' | 'warning'

type GuestIssueGenerated =
  operations['guest.index']['responses'][200]['content']['application/json']['issues'][number]

/**
 * Mirrors App\Support\Guests\GuestIssues::issue().
 */
export type GuestIssue = Omit<GuestIssueGenerated, 'severity'> & {
  severity: GuestIssueSeverity
}

type GuestIndexBody =
  operations['guest.index']['responses'][200]['content']['application/json']

export type GuestListSummary = Omit<GuestIndexBody, 'data' | 'issues'> & {
  issues: Array<GuestIssue>
}

export type Guest = components['schemas']['GuestResource']

export type ConsentDocument = components['schemas']['ConsentDocument']

/**
 * Mirrors App\Enums\ConsentSource. No FormRequest enum schema.
 */
export type ConsentSource = 'ENGINE' | 'PAYMENT_LINK' | 'STAFF'

export type Consent = Omit<
  components['schemas']['ConsentResource'],
  'document' | 'source'
> & {
  document: ConsentDocument
  source: ConsentSource
}

/**
 * Mirrors App\Http\Resources\Rms\BookingConsentResource.
 * The panel consent table iterates this row, not Consent alone.
 */
export type BookingConsent = Omit<
  components['schemas']['BookingConsentResource'],
  'document' | 'consent'
> & {
  document: ConsentDocument
  consent: Consent | null
}

export type Country = components['schemas']['CountryResource']

export type ContactInRow = Omit<
  components['schemas']['ContactInResource'],
  'status' | 'segment' | 'main_channel' | 'channel_of_origin'
> & {
  status: BookingStatus
  segment: BookingSegment
  main_channel: MainChannel
  channel_of_origin: ChannelOfOrigin
}

export type NationalitiesSummary =
  components['schemas']['ContactsInNationalitiesResource']

export type NationalityRow = NationalitiesSummary['nationalities'][number]

export type PreferenceQuestion = components['schemas']['PreferenceQuestionResource']
export type PreferenceSource = components['schemas']['PreferenceSource']

/** Scramble does not emit this enum; it matches App\Enums\PreferenceStatus. */
export type PreferenceStatus = 'ANSWERED' | 'SENT_NO_REPLY' | 'SCHEDULED'
export type ArrivalGuestList = components['schemas']['ArrivalGuestListResource']
export type GuestPreferences = components['schemas']['GuestPreferencesResource']
export type GuestResponse = components['schemas']['GuestResponseResource']
export type NpsView = components['schemas']['NpsViewResource']
export type SurveyGuest = components['schemas']['SurveyGuestResource']

/**
 * Scramble types a PHP associative `answers` array as string[].
 * The validator accepts question key → value.
 */
export type GuestPreferencesInput = Omit<
  components['schemas']['UpdateGuestPreferencesRequest'],
  'answers'
> & {
  answers: Record<string, string>
}

export type GuestResponseInput = components['schemas']['StoreGuestResponseRequest']
