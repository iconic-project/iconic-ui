/**
 * Hand-written shapes for configuration documents and related payloads.
 * Scramble emits `document` / `changes` / `scenarios` / `registry` as untyped
 * objects. Each type mirrors a PHP class and must change with it.
 */

/** Mirrors App\Support\Config\Documents\Rates\Season. Update when the PHP class changes. */
export type RateSeason = {
  code: string
  name: string
  from: string
  to: string
}

/** Mirrors App\Support\Config\Documents\Rates\RoomRate. Update when the PHP class changes. */
export type RoomNightlyRate = {
  room_type: string
  season: string
  nightly: number
}

/** Mirrors App\Support\Config\Documents\Rates\Occupancy. Update when the PHP class changes. */
export type RateOccupancy = {
  extra_adult_nightly: number
  extra_child_nightly: number
  single_occupancy_pct: number
}

/** Mirrors App\Support\Config\Documents\Rates\DayOfWeek. Keys are ISO weekdays 1–7. */
export type RateDayOfWeek = {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
  '6': number
  '7': number
}

/** Mirrors App\Support\Config\Documents\Rates\LengthOfStayBand. Update when the PHP class changes. */
export type RateLengthOfStay = {
  min_nights: number
  discount_pct: number
}

/** Mirrors App\Support\Config\Documents\Rates\Supplement. Update when the PHP class changes. */
export type RateSupplement = {
  code: string
  label: string
  from: string
  to: string
  per_night: number
  basis: 'ROOM' | 'PERSON'
}

/** Mirrors App\Support\Config\Documents\Rates\RatePlan. Update when the PHP class changes. */
export type RatePlan = {
  code: string
  name: string
  default: boolean
  adjust_pct: number
  refundable: boolean
  deposit_pct: number
  balance_days: number
  cancellation: string
  meal_plan: 'RO' | 'BB' | 'HB' | 'FB'
}

/** Mirrors App\Support\Config\Documents\RatesDocument. Update when the PHP document changes. */
export type RatesDocument = {
  currency: string
  schema_version: number
  seasons: Array<RateSeason>
  room_rates: Array<RoomNightlyRate>
  occupancy: RateOccupancy
  day_of_week: RateDayOfWeek
  length_of_stay: Array<RateLengthOfStay>
  supplements: Array<RateSupplement>
  rate_plans: Array<RatePlan>
}

/** Mirrors App\Support\Config\Documents\GuestsSettings. Update when the PHP class changes. */
export type GuestsSettings = {
  max_per_property: number
  child_min_age: number
  child_max_age: number
  adult_required_with_children: boolean
  under_age_message: string
}

/** Mirrors App\Support\Config\Documents\CalendarSettings. Update when the PHP class changes. */
export type CalendarSettings = {
  default_search_from: string
  default_search_to: string
  default_adults: number
  horizon_months: number
}

/** Mirrors App\Support\Config\Documents\LocaleSettings. Update when the PHP class changes. */
export type LocaleSettings = {
  default: string
  live: Array<string>
  currency: string
}

/** Mirrors App\Support\Config\Documents\FeesSettings. Update when the PHP class changes. */
export type FeesSettings = {
  show_in_price_panel: boolean
  footnote: string
}

/** Mirrors App\Support\Config\Documents\CopySettings. Update when the PHP class changes. */
export type CopySettings = {
  book_now_pay_later: string
  traveling_with_children: string
  solo_and_triple: string
  pay_today: string
  details_note: string
  confirmation_steps: Array<string>
  online_deposit_advantage: string
  online_deposit_perk: string
}

/** Mirrors App\Support\Config\Documents\EngineSettingsDocument. Update when the PHP document changes. */
export type EngineSettingsDocument = {
  guests: GuestsSettings
  calendar: CalendarSettings
  locale: LocaleSettings
  fees: FeesSettings
  copy: CopySettings
}

/** Mirrors App\Support\Config\Documents\CommissionRules. Update when the PHP class changes. */
export type CommissionRules = {
  cap_pct: number
  default_pct: number
  payable_days_after_check_out: number
}

/** Mirrors App\Support\Config\Documents\PaymentsRules. Update when the PHP class changes. */
export type PaymentsRules = {
  extras_due_hours: number
  wire_window_hours: number
  balance_reminder_days: Array<number>
}

/** Mirrors App\Support\Config\Documents\DiscountsRules. Update when the PHP class changes. */
export type DiscountsRules = {
  online_deposit_discount_pct: number
  max_total_discount_pct: number | null
}

/** Mirrors App\Support\Config\Documents\HoldsRules. Update when the PHP class changes. */
export type HoldsRules = {
  web_minutes: number
  web_extension_minutes: number
  near_term_business_hours: number
  long_lead_business_days: number
  business_days: Array<number>
  business_day_start: string
  business_day_end: string
  holidays: Array<string>
  near_term_max_days: number
}

/** Mirrors App\Support\Config\Documents\SlaRules. Update when the PHP class changes. */
export type SlaRules = {
  response_hours: number
  refund_business_days: number
  agency_approval_business_days: number
}

/** Mirrors App\Support\Config\Documents\AlertsRules. Update when the PHP class changes. */
export type AlertsRules = {
  low_occupancy_pct: number
  low_occupancy_days_before: number
}

/** Mirrors App\Support\Config\Documents\RetentionRules. Update when the PHP class changes. */
export type RetentionRules = {
  passport_months_after_check_out: number
  medical_days_after_check_out: number
  behavioural_raw_months: number
  behavioural_unstitched_days: number
}

/** Mirrors App\Support\Config\Documents\CancellationBand. Update when the PHP class changes. */
export type CancellationBand = {
  min_days: number
  penalty_pct: number
}

/** Mirrors App\Support\Config\Documents\Tax. Update when the PHP class changes. */
export type TaxRule = {
  code: string
  label: string
  basis: 'PER_STAY' | 'PER_NIGHT' | 'PER_PERSON_PER_NIGHT' | 'PCT_OF_ROOM'
  amount: number
  child_exempt_under_age: number | null
  charged: boolean
  shown_in_price_panel: boolean
}

/** Mirrors App\Support\Config\Documents\ConsentVersions. Update when the PHP class changes. */
export type ConsentVersions = {
  terms: string
  cancellation: string
  privacy: string
  insurance: string
  marketing: string
}

/** Mirrors App\Support\Config\Documents\ExtraItem. Update when the PHP class changes. */
export type ExtrasCatalogueItem = {
  code: string
  name: string
  unit: string
  price_usd: number | null
  triggers_transfer_voucher: boolean
  active: boolean
}

/** Mirrors App\Support\Config\Documents\ExtrasDocument. Update when the PHP document changes. */
export type ExtrasCatalogue = {
  items: Array<ExtrasCatalogueItem>
}

export type ExtrasDocument = ExtrasCatalogue

/** Mirrors App\Support\Config\Documents\BankRules. Update when the PHP class changes. */
export type BankDetails = {
  bank_name: string
  account_name: string
  account_number: string
  routing: string
  swift: string
}

/** Mirrors App\Support\Config\Documents\LegalEntityRules. Update when the PHP class changes. */
export type LegalEntity = {
  name: string
  address_lines: Array<string>
  email: string
  website: string
  ein: string
  bank: BankDetails
}

/** Mirrors App\Support\Config\Documents\DocumentsRules. Update when the PHP class changes. */
export type DocumentsRules = {
  pretrip_days_before: number
  voucher_days_before: number
}

/** Mirrors App\Support\Config\Documents\BusinessRulesDocument. Update when the PHP document changes. */
export type BusinessRulesDocument = {
  commission: CommissionRules
  modification_fee_usd: number
  payments: PaymentsRules
  discounts: DiscountsRules
  holds: HoldsRules
  sla: SlaRules
  alerts: AlertsRules
  retention: RetentionRules
  cancellation: {
    bands: Array<CancellationBand>
    charter_bands?: Array<CancellationBand>
    sets?: Record<string, Array<CancellationBand>>
  }
  taxes?: Array<TaxRule>
  legal: {
    consent_versions: ConsentVersions
  }
  legal_entity: LegalEntity
  documents: DocumentsRules
}

/** Mirrors App\Support\Config\Change. Update when the PHP class changes. */
export type ConfigChange = {
  path: string
  label: string
  from: unknown
  to: unknown
}

/** Mirrors App\Support\Config\Warning. Update when the PHP class changes. */
export type ConfigWarning = {
  path: string
  message: string
}

/** Mirrors App\Services\Config\ValidationReport. Update when the PHP class changes. */
export type ConfigValidation = {
  errors: Record<string, Array<string>>
  warnings: Array<ConfigWarning>
  changes: Array<ConfigChange>
}

/**
 * Mirrors App\Http\Resources\Rms\EngineSettingsValidationResource.
 * Update when the PHP resource changes.
 */
export type EngineSettingsValidation = ConfigValidation & {
  rule_fields_changed: boolean
}

/** Mirrors the `published_by` object on ConfigCurrentResource. Update when the PHP resource changes. */
export type ConfigPublisher = {
  id: number
  name: string
}

/**
 * Shared current-version envelope. Mirrors App\Http\Resources\Rms\ConfigCurrentResource
 * with a typed `document`. Update when the PHP resource changes.
 */
export type ConfigVersion<TDocument> = {
  version: number
  document: TDocument
  published_at: string | null
  published_by: ConfigPublisher | null
  approval_reference: string | null
}

/**
 * Mirrors App\Http\Resources\Rms\ConfigVersionDetailResource.
 * Update when the PHP resource changes.
 */
export type ConfigVersionDetail<TDocument> = ConfigVersion<TDocument> & {
  changes: Array<ConfigChange>
}

/**
 * Mirrors App\Http\Resources\Rms\ConfigVersionSummaryResource.
 * Update when the PHP resource changes.
 */
export type ConfigVersionSummary = {
  version: number
  published_at: string | null
  published_by: ConfigPublisher | null
  approval_reference: string | null
  changes: Array<ConfigChange>
}

/** Mirrors App\Services\Pricing\QuoteLine. Update when the PHP class changes. */
export type QuoteLine = {
  code: string
  label: string
  amount: number
}

/** Mirrors App\Services\Pricing\Quote. Update when the PHP class changes. */
export type Quote = {
  lines: Array<QuoteLine>
  total: number
  deposit_pct: number
  deposit: number
}

/** Mirrors App\Services\Pricing\NoRate. Update when the PHP class changes. */
export type NoRate = {
  reason: string
}

/** One night on a stay quote. Mirrors App\Services\Pricing\NightLine. */
export type StayNightLine = {
  night: string
  season: string
  base: number
  extras: number
  single: number
  dow: number
  supplements: number
  plan_adjust: number
  total: number
}

/** Mirrors App\Services\Pricing\TaxLine. */
export type StayTaxLine = {
  code: string
  label: string
  amount: number
  charged: boolean
  shown_in_price_panel: boolean
}

/** Mirrors App\Services\Pricing\StayQuote::toArray. */
export type StayQuote = {
  night_lines: Array<StayNightLine>
  lines: Array<QuoteLine>
  total: number
  deposit_pct: number
  deposit: number
  rates_version_id: number | null
  terms: {
    balance_days: number
    charter: unknown
    deposit_pct?: number
    refundable?: boolean
    cancellation_set?: string
  }
  tax_lines: Array<StayTaxLine>
  total_including_charged_taxes: number
}

/** The stay a price-check scenario was priced for. */
export type PriceCheckStay = {
  room_type: string
  check_in: string
  check_out: string
  nights: number
  adults: number
  child_ages: Array<number>
  rate_plan: string
}

export type PriceCheckQuote = StayQuote | NoRate | { errors: Array<string> }

/**
 * One price-check scenario. Mirrors the list items in
 * App\Http\Resources\Rms\PriceCheckResource. Update when the PHP resource changes.
 */
export type PriceCheckRow = {
  key: string
  label: string
  input: PriceCheckStay
  published: PriceCheckQuote
  draft: PriceCheckQuote
  difference: number | null
}

/** Mirrors App\Enums\RuleGroup. Update when the PHP enum changes. */
export type RuleGroup =
  | 'pricing_payments'
  | 'holds_service_levels'
  | 'cancellation'
  | 'guests_capacity'
  | 'data_retention'
  | 'legal'
  | 'crm'
  | 'stay'
  | 'structural_locked'

/** Mirrors App\Enums\RuleStatus. Update when the PHP enum changes. */
export type RuleStatus =
  | 'CONFIRMED'
  | 'PENDING_CLIENT'
  | 'PENDING_LEGAL'
  | 'TEXT_IN_DRAFTING'
  | 'RMS_SPEC'

/** Mirrors App\Enums\RuleWhere. Update when the PHP enum changes. */
export type RuleWhere =
  | 'here'
  | 'rates'
  | 'engine_settings'
  | 'locked'

/**
 * Mirrors App\Support\BusinessRules\Registry::rows().
 * Update when the PHP registry row shape changes.
 */
export type RuleRegistryRow = {
  key: string
  group: RuleGroup
  group_label: string
  source_code: string
  name: string
  status: RuleStatus
  where: RuleWhere
  paths: Array<string>
  source_display: string
  source_value: unknown
  current_display: string
  differs: boolean
  used_in: string
  lock_reason: string | null
  note: string | null
  link: string | null
}

/**
 * Mirrors App\Support\BusinessRules\Registry::counts().
 * Update when the PHP method changes.
 */
export type RuleRegistryCounts = {
  all: number
  here: number
  other_pages: number
  locked: number
  differs_or_flagged: number
}

/** GET /rms/rates — ConfigCurrentResource with a typed rates document. */
export type RatesVersion = ConfigVersion<RatesDocument>

/** GET /rms/engine-settings — EngineSettingsCurrentResource with a typed document. */
export type EngineSettingsVersion = ConfigVersion<EngineSettingsDocument> & {
  copy_paths: Array<string>
}

/** GET /rms/business-rules — BusinessRulesCurrentResource with a typed document. */
export type BusinessRulesVersion = ConfigVersion<BusinessRulesDocument> & {
  registry: Array<RuleRegistryRow>
  counts: RuleRegistryCounts
}

/** GET /rms/extras — ConfigCurrentResource with a typed extras document. */
export type ExtrasVersion = ConfigVersion<ExtrasCatalogue>
