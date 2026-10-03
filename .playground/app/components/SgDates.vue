<script setup lang="ts">
import type { NightMark, StayRange } from '../../../app/components/AnkStayInput.vue'

const { format, zoneLabel } = useDates()

const instant = '2026-12-31T23:30:00Z'
const calendar = '2027-01-07'
const stay = ref<StayRange | null>(null)

function nightInfo(date: string): NightMark {
  if (date === '2026-10-10') {
    return { closedToArrival: true }
  }

  if (date === '2026-10-12') {
    return { closedToDeparture: true }
  }

  if (date === '2026-10-16') {
    return { minStay: 3 }
  }

  return {}
}
</script>

<template>
  <section class="sg-section">
    <AnkLabel class="sg-section__title">
      Dates
    </AnkLabel>

    <div class="sg-type-row">
      <p class="label sg-type-row__meta">
        Instant · {{ instant }}
      </p>
      <p class="sg-type-body">
        {{ zoneLabel('UTC') }} — {{ format(instant, 'dateTime', { timeZone: 'UTC' }) }}
      </p>
      <p class="sg-type-body">
        {{ zoneLabel('Pacific/Galapagos') }} — {{ format(instant, 'dateTime', { timeZone: 'Pacific/Galapagos' }) }}
      </p>
    </div>

    <div class="sg-type-row">
      <p class="label sg-type-row__meta">
        Calendar date · {{ calendar }}
      </p>
      <p class="sg-type-body">
        {{ zoneLabel('UTC') }} — {{ format(calendar, 'short', { timeZone: 'UTC' }) }}
      </p>
      <p class="sg-type-body">
        {{ zoneLabel('Pacific/Galapagos') }} — {{ format(calendar, 'short', { timeZone: 'Pacific/Galapagos' }) }}
      </p>
    </div>

    <AnkLabel style="display: block; margin-top: 28px">
      AnkNights
    </AnkLabel>
    <div class="sg-ank-pills" style="margin-top: 12px">
      <AnkNights :nights="1" />
      <AnkNights :nights="3" />
    </div>

    <AnkLabel style="display: block; margin-top: 28px">
      AnkStayInput
    </AnkLabel>
    <p class="sg-type-body" style="margin: 8px 0 12px">
      Demo bounds for the style guide. Apps pass the published stay rules.
    </p>
    <AnkStayInput
      v-model="stay"
      :min-nights="1"
      :max-nights="14"
      :night-info="nightInfo"
    />
  </section>
</template>
