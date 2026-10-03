# Changelog

## Unreleased

- `AnkStayInput` is the shared two-month stay picker. `AnkNights` is the nights pill. `useDates` adds `nightsBetween`, `eachNight`, `addNights` and `formatStay` for plain `YYYY-MM-DD` dates.
- The shared theme follows the HILO brand book. Satoshi replaces Oswald, Archivo, IBM Plex Mono, and Manrope. Light is the default colour mode. Cards are 16px, controls are 8px, and cobalt is the primary action colour. `AnkWordmark` is the HILO wordmark.

## v0.17.1

- The `@internationalized/date` alias is set only when the layer has that package installed. A git clone of the layer (Netlify) has no `node_modules`, so the alias no longer points Vite at a missing path.

## v0.16.0

- Regenerated API types from the Sprint 15 OpenAPI spec (shared inbox conversations and messages, CRM B2B partners, and the portal payment-link request).
- `crm.ts` gains `Conversation`, `ConversationMessage`, `ConversationStatus`, `MessageDirection`, `ConversationReplyInput`, `ConversationLinkInput` and `B2bPartnerRow`. Enums are the OpenAPI schemas. `B2bPartnerRow` is the list/detail union. The detail arm includes `deals`.
- `portal.ts` gains `PortalPaymentLinkInput`. The created link is the existing `PaymentLink` alias. No portal payment-link resource.

## v0.15.0

- Regenerated API types from the Sprint 14 OpenAPI spec (segments, journeys, enrolments, automations, message templates, and the engine marketing lead and unsubscribe view).
- `crm.ts` gains `Segment`, `SegmentCondition`, `SegmentVocabulary`, `SegmentInput`, `SegmentUpdate`, `AutomationRow`, `AutomationSwitchInput`, `Journey`, `JourneyStep`, `JourneyEnrolment`, `JourneyUpdate`, `MessageTemplate`, `MessageTemplateVersion`, `TemplateDraftInput`, `PublishTemplateInput` and `TemplatePreviewInput`. Enums are the OpenAPI schemas (`ContactSegment`, `SegmentKind`, `SegmentDimension`, `AutomationKind`, `AutomationAudience`, `JourneyStepAction`, `JourneyEnrolmentStatus`).
- The contact band alias is `ContactSegment`. `Segment` is the audience (`CrmSegmentResource`).
- `engine.ts` gains `MarketingLeadInput` and `UnsubscribeView`. There is no unsubscribe input. Lead `consent` stays Laravel's `accepted` union. A template test send's status is the existing `AlertNotificationStatus` schema.

## v0.14.1

- Regenerated API types so an agency user includes `invite_sent_at`, `invite_expires_at` and `last_login_at`, and an agency includes `portal_suspended_by`. No new aliases.

## v0.14.0

- Regenerated API types from the Sprint 13 OpenAPI spec (portal session and agency profile, net rates, availability, bookings, commissions, requests, and sales materials, plus RMS materials, portal activity, and portal suspension).
- New `app/types/portal.ts` (`PortalSession`, `PortalAgency`, `PortalNetRates`, `PortalAvailabilityRow`, `PortalBooking`, `PortalCommission`, `PortalMaterial`, `PortalRequest`, `PortalRequestCreated`, `PortalRequestInput`, and the auth inputs). Enums are the OpenAPI schemas. It does not import CRM or panel types.
- `payments.ts` gains `SalesMaterial`, `SalesMaterialKind`, `StoreSalesMaterialInput`, `PortalActivity`, `SuspendPortalInput` and `ResumePortalInput` beside the agency aliases.
- `inventory.ts` `EngineLabelCode` now uses the named schema. `payment_state` is the inline enum on `PortalBooking`. `next` and activity `event` stay strings. The invite route has no body. Material file routes stay streams.

## v0.13.0

- Regenerated API types from the Sprint 12 OpenAPI spec (commercial metrics and their definition sentences, report definitions, runs and subscriptions, waitlist `auto_notified` and position, charter enquiry proposal state, and the engine charter proposal page).
- New `app/types/metrics.ts` (`CommercialMetrics`, `MetricDefinition`, `MetricWindow`, `MetricScope`) and `app/types/reports.ts` (`ReportDefinition`, `ReportRun`, `ReportRunStatus`, `ReportCadence`, `ReportSubscription`, `RunReportInput`, `UpdateSubscriptionInput`). Enums are the OpenAPI schemas.
- `offers.ts` gains `CharterProposal` and `CharterProposalState`. `engine.ts` gains `CharterProposalView`, `AcceptCharterProposalInput` and `DeclineCharterProposalInput` from `/api/engine` only. `inventory.ts` gains `WaitlistNotice` for the new waitlist fields.

## v0.12.1

- Regenerated API types so `AgencyUser.status` is `AgencyUserStatus` (`INVITE_ON_APPROVAL`, `INVITE_ON_PORTAL_LAUNCH`, `ACTIVE`, `DISABLED`). The previous leftover union named statuses the API no longer returns.

## v0.12.0

- Regenerated API types from the Sprint 11 OpenAPI spec (alert inbox and kind registry, manifests, departure guest experience and preferences, the NPS view and staff response, commission payout, the agency portal preview, the scheduled-job catalogue, and the engine questionnaire and survey).
- New `app/types/alerts.ts` aliases from the generated schemas (`Alert`, `AlertKind`, `AlertSeverity`, `AlertKindRow`, `AlertCounts`). Enums are the OpenAPI schemas, not copied case lists.
- `documents.ts` gains `ManifestRow`, `ManifestVersion`, `ManifestKind` and `ManifestIssued`. `guests.ts` gains `PreferenceQuestion`, `DepartureGuestExperience`, `GuestPreferences`, `GuestResponse`, `NpsView` and the write inputs. `payments.ts` gains `CommissionPayout`, `PortalPreview` and the payout / agency-user inputs. `crm.ts` gains `ScheduledJobCatalogueRow` from `/api/crm` only. `engine.ts` gains `QuestionnaireView`, `QuestionnaireAnswersInput`, `SurveyQuestion`, `SurveyView` (including `questions`) and `SurveyInput` from `/api/engine` only. The survey write field is `rec`.
- Restricted preference strings (`accessibility`, `emergency_contact`) are optional properties on the generated guest-experience and preference schemas. The `*_provided` booleans are always present.

## v0.11.0

- Regenerated API types from the Sprint 10 OpenAPI spec (consent register, contact consents, the pipeline and stage map, tasks, campaigns, the delivery log, and `/api/privacy` subject requests).
- `app/types/crm.ts` gains the Sprint 10 aliases from `/api/crm` schemas only (`ConsentPurpose`, `ConsentRegisterRow`, `ContactConsentState`, `DealStage`, `DealType`, `PipelineColumn`, `PipelineKpis`, `StageMapRow`, `DealDetail`, `CrmTask`, `TaskKind`, `TaskKpis`, `ContactActivity`, `Campaign`, `CampaignMeasures`, `AttributionModelRow`, `DeliveryRow`, `DeliveryKpis`, and the write inputs).
- New `app/types/privacy.ts` for `/api/privacy` only (`SubjectRequest`, `SubjectRequestType`, `SubjectRequestStatus`, `SubjectRequestChannel`, and the write inputs). It does not import CRM or RMS types.

## v0.10.0

- Regenerated API types from the Sprint 9 OpenAPI spec (CRM contacts, duplicates, merges, timeline, activity `meta.kpis`, the five sync endpoints, and the engine's events and attribution inputs).
- New `app/types/crm.ts` aliases from `/api/crm` schemas only — never an RMS resource (`Contact`, `ContactType`, `Lifecycle`, `Segment`, `ContactProfile`, `ContactDuplicate`, `ContactMerge`, `TimelineItem`, `ActivityEvent`, `ActivityKpis`, `OwnershipRow`, `ScheduledJobRun`, `SyncFailure`, `EventCatalogueRow`).
- Barrel exports the CRM people row as `CrmContact`. RMS `Contact` stays the search row from `bookings.ts`.
- `engine.ts` gains `EngineEventsAccepted`, `EngineEventsInput`, `EngineEventName` (client names only), `EngineEventParams`, `AttributionTouch` and `AttributionInput`.

## v0.9.0

- Regenerated API types from the Sprint 8 OpenAPI spec (RMS offers and charter enquiries, the complete-link, and every `/api/engine` response: feed, cabins, promo check, quote, checkout, waitlist, charter enquiry, complete-reservation).
- New `app/types/offers.ts` aliases (`Offer`, `OfferType`, `OfferChannel`, `OfferStatus` including derived `EXPIRED`, `CharterEnquiry`, `CompleteLink`).
- New `app/types/engine.ts` aliases from `/api/engine` schemas only — never an RMS resource (`EngineFeed`, `EngineItinerary`, `EngineDeparture`, `EngineOffer`, `EngineRates`, `EngineSettings`, `EngineCabin`, `PromoCheck`, `EngineQuote`, checkout / waitlist / charter / complete types, `EngineCountry`, `PriceChangedError`).
- `CopySettings` leftover gains `online_deposit_advantage` and `online_deposit_perk`.
- `Booking` keeps the Sprint 4 name. `promo_code`, `online_deposit` and `sold_on` come through from `BookingResource`.

## v0.8.1

- Regenerated API types for client-documents list fields: `DocumentPlanRowResource.booking_reference` and `client`, and `GET /documents` `meta.filters` (`kinds` / `statuses` as `{ value, label }`). `ClientDocumentFilters` picks the filters object from the generated operation. No leftover overlay.

## v0.8.0

- Regenerated API types from the Sprint 7 OpenAPI spec (issued documents, the document plan, client documents, deliveries, billing fields on `BookingResource`, payment-link / wire send including the LEG-004 `warning`).
- New `app/types/documents.ts` aliases (`IssuedDocument`, `DocumentKind`, `DocumentPlanKind`, `DocumentPlanRow`, `DocumentStatus`, `ClientDocumentRow`, `Delivery`, `DeliveryKind`, `DeliveryStatus`). Plan `kind` is `DocumentPlanKind` (includes `REMINDER` and `QUESTIONNAIRE`); issued rows stay on `DocumentKind` (includes `WIRE_INSTRUCTIONS`).
- `Booking` keeps the Sprint 4 name. `billing_name`, `billing_address`, `billing_email` and `billing_phone` come through from `BookingResource`.
- `BusinessRulesDocument` leftover gains sibling `legal_entity` and `documents`. `legal.consent_versions` is unchanged.
- HTML preview and PDF download endpoints are `text/html` / `application/pdf`. They have no JSON body type — use the URL.

## v0.7.1

- Regenerated API types for the guest-list summary: `max` and `can_add` on `GET /rms/bookings/{booking}/guests`. `GuestListSummary` picks them up from the generated operation. No leftover overlay.

## v0.7.0

- Regenerated API types from the Sprint 6 OpenAPI spec (guests, masked notes, consents, extras catalogue and booking extras, charges fields on `BookingResource`, Contacts In, `GET /rms/countries`).
- New `app/types/guests.ts` aliases (`Guest`, `GuestIssue`, `Consent`, `BookingConsent`, `Country`, `ContactInRow`, `NationalityRow`). Notes stay `{ value: string | null, on_file: boolean }` as the API sends them. `PngCategory` and `ConsentSource` are leftovers (no FormRequest schema).
- New `app/types/extras.ts` (`BookingExtra`, `ExtrasListSummary`). Catalogue leftovers (`ExtrasCatalogue`, `ExtrasCatalogueItem`, `ExtrasVersion`) live in `config.ts` like the other three documents. `BusinessRulesDocument` gains `legal.consent_versions`; `RuleGroup` gains `legal`.
- `Booking` keeps the Sprint 4 name. `guests_summary`, `extras_total`, `fees_collected_total`, `png_collected`, `tct_collected`, `png_pending_count`, `charges_total`, `cruise_outstanding` and `extras_due_at` come through from `BookingResource`.

## v0.6.4

- Regenerated API types for New Reservation: `BookingFormOptionsResource.payments.wire_window_hours` (with existing `commission` / `agencies`). No new leftover overlays.

## v0.6.3

- Regenerated API types for the Refund Approvals / B2B prelude: agency list `bookings_count` / `revenue` / `commission_accrued` / `held_bookings_count`, `GET /agencies` `from` / `to` and `meta.kpis` rule numbers, `GET /refunds` `meta.rules.refund_business_days`, and `BookingResource.commission_cap_pct` (overlayed as `number`). No new AgencyListItem overlays; the Agency / AgencyListItem split is `portal_preview`.

## v0.6.2

- Regenerated API types for the Payments & Revenue prelude: `GET /bookings` `pending_payment`, `PaymentResource.booking.client`, `GET /payments` `meta.kpis.commission_cap_pct` / `wire_window_hours`, and reconciliation `counts.gateway` / `counts.discrepancies`.

## v0.6.1

- Regenerated API types for `GET /rms/payments/options` (`PaymentOptionsResource`: kinds and methods as `{ value, label, recordable }`).
- Alias `PaymentOptions` / `PaymentOption` in `payments.ts`. Booking form-options is unchanged.

## v0.6.0

- Regenerated API types from the Sprint 5 OpenAPI spec (payments ledger, payment links, reconciliation, agencies, commissions, refunds, booking money / overdue / agency / refund fields, `GET /rms/payments` `meta.kpis`).
- New `app/types/payments.ts` aliases (`Payment` / `PaymentListItem` on the same schema, `PaymentLink`, `ReconciliationReport`, `Agency`, `CommissionRow`, `RefundRequest`, generated `PaymentsKpis`). Overlays remain where Scramble emits `string` for bools / enums (`can_mark_wire`, `sla_breached`, `kind` / `status` on resources).
- `Booking` keeps the Sprint 4 name and overlays `refund` and `payment_links`. `paid`, `pledged`, `overdue`, `agency` and `commission_*` come through from `BookingResource`.

## v0.5.3

- Regenerated API types for Task 09: `RequestSummary.hold.remaining_business_minutes`, `HoldResource.booking_id` / typed `departure` and `remaining_business_minutes`, `GET /holds` `from` / `to` and `meta.rules.business_day_minutes`.
- Aliases: `HoldListItem` (overlays only `type` and `booking_id`), `HoldListRules`, `BookingRequestSummary.hold.remaining_business_minutes`. `RequestQueueItem` overlays `hold` / `sla` because Scramble still emits `string | object`.

## v0.5.2

- Regenerated API types for Task 08: `GET /bookings/form-options` (`BookingFormOptionsResource`) and `ReservationQuoteResource.terms` (`balance_days` plus CHARTER deposit / business days / DPNG).
- Alias: `BookingFormOptions`. `BookingQuote` leftover overlay now includes `terms`.

## v0.5.1

- Regenerated API types for the Task 07 prelude: `BookingResource.request` (preferred channel, advisor, notes, hold, sla), `departure` extras (`return_date`, `itinerary_name`, `embark`, `festive`), `GET /bookings/owners` (`BookingOwnerResource`), and `GET /groups` `from` / `to`.
- Aliases: `BookingRequestSummary`, `BookingOwner`.

## v0.5.0

- Regenerated API types from the Sprint 4 OpenAPI spec (bookings, groups, contacts, requests, holds, waitlist, move preview, audit, request `meta.rules`, G5 `holds.*` fields).
- Retired hand-written inventory shapes that now have real generated properties (`CalendarGrid*`, `GenerateSeasonResult`, `DepartureMutationResponse`, `DepartureKpis`, availability / claim / lock objects, `CabinUnavailable*`, `CabinCategory`).
- Booking aliases (`Booking`, `BookingQuote`, `RequestQueueItem`, `HoldListItem`, `WaitlistEntry`, …). Overlays remain where Scramble emits `unknown[]` / `string[]` / seed literals (`allowed_transitions`, quote cabins, created-schema `bookings`, `HoldResource.departure`).
- Claim holder `detail` is the generated union: block `{ reason, reason_label }` or booking `{ status, type, segment, display_reference, owner_id, owner_name, party_label, hold_expired }` or `null`.
- `HoldsRules` G5 fields: `business_days`, `business_day_start`, `business_day_end`, `holidays`, `near_term_max_days`.

## v0.4.2

- Claim holder `detail`: `{ reason, reason_label }` on internal-block claims, otherwise `null`.
- `useApi().useFetch` accepts a computed URL (`MaybeRefOrGetter<string>`), matching Nuxt `useFetch`.

## v0.4.1

- Itinerary overlays: `fallback_gradient_key` on `Itinerary`, and `gradients` (`{ key, css }`) plus `fallback_gradient_key` on `ItineraryDefaults`.

## v0.4.0

- Regenerated API types from the Sprint 3 OpenAPI spec (yachts, itineraries, departures, calendar, internal blocks, generate season).
- Sprint 3 aliases (`Yacht`, `Cabin`, `Itinerary`, `Departure`, `CalendarGrid`, `InternalBlock`, `GenerateSeasonResult`, plus defaults / mutation / 409 envelopes) and hand-written inventory shapes in `app/types/inventory.ts` where Scramble emits untyped or over-literal JSON. Calendar dates stay `YYYY-MM-DD` strings.

## v0.3.0

- Regenerated API types from the Sprint 2 OpenAPI spec (rates, engine settings, business rules, price check, `engine_copy.manage`).
- Sprint 2 aliases (`RatesDocument`, `EngineSettingsDocument`, `BusinessRulesDocument`, `ConfigVersion<T>`, `ConfigVersionSummary`, `ConfigChange`, `ConfigValidation`, `PriceCheckRow`, `Quote`, `RuleRegistryRow`, `RuleRegistryCounts`, `Permission`) plus hand-written document shapes in `app/types/config.ts` where Scramble emits untyped objects.

## v0.2.1

- Moved the `iconic:api-error` hook and `iconic.displayTimeZone` AppConfig augmentation to `app/types/iconic-augment.d.ts` so it is committed. `nuxt.d.ts` stays gitignored (Nuxt’s generated file).

## v0.2.0

- Generated API types from the Scramble OpenAPI spec (`pnpm types:api`, committed `app/types/api.d.ts`) and Sprint 1 aliases (`Me`, `Role`, `PermissionItem`, `UserListItem`, `ChangeHistoryEntry`, `Paginated<T>`).
- `createApiClient` `onError` callback and the `iconic:api-error` Nuxt runtime hook (not fired on a 419 that succeeds on retry).
- `useDates()` display time zone (`iconic.displayTimeZone`, default UTC): instants convert with `hourCycle: 'h23'`; calendar dates never shift; naive datetimes throw. New `time` style and `zoneLabel()`.

## v0.1.0

First tagged layer for the panel and the engine.

- Prototype colour tokens on `:root` (light) and `.dark` (dark), mapped to Nuxt UI `--ui-*`. Oswald, Archivo, IBM Plex Mono, Manrope.
- Back-office Nuxt UI theme: buttons, fields, list table, badges, card, tabs, modal, slideover, plus house-rule dropdown, tooltip, toast, checkbox, switch, pagination.
- Shared `AnkLabel`, `AnkPill`, `AnkPanel`, `AnkKpi`, `AnkMoney`, `AnkThemeToggle`.
- `useMoney()`, `useDates()`, `useApi()` (Sanctum cookie CSRF on the client).
- Playground style guide on port 3010.
