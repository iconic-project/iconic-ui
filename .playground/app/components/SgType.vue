<script setup lang="ts">
type TypeRow = {
  meta: string
  kind: 'h1' | 'body' | 'mono' | 'label' | 'panel' | 'kpi' | 'manrope'
  sample: string
}

const rows: Array<TypeRow> = [
  { meta: 'h1 · Satoshi 400 · 28px · tracking 0', kind: 'h1', sample: 'Bookings' },
  { meta: 'body · Satoshi 400 · 16px / 1.6', kind: 'body', sample: 'Body text in Satoshi on ink, for checking type and colour in both themes.' },
  { meta: '.mono · Satoshi 400 · 11px · .06em · uppercase', kind: 'mono', sample: 'Section label' },
  { meta: '.label / AnkLabel · 11px · .06em · --fg-subtle', kind: 'label', sample: 'Guest / client name' },
  { meta: 'panel title · Satoshi 400 · 18px', kind: 'panel', sample: 'Incoming requests' },
  { meta: 'KPI value · Satoshi 700 · 32px · -.02em', kind: 'kpi', sample: 'USD 28,520' },
  { meta: 'wordmark · Satoshi 700 · uppercase', kind: 'manrope', sample: 'Iconic' },
]
</script>

<template>
  <section class="sg-section">
    <AnkLabel class="sg-section__title">
      Type scale
    </AnkLabel>
    <div
      v-for="row in rows"
      :key="row.meta"
      class="sg-type-row"
    >
      <p class="label sg-type-row__meta">
        {{ row.meta }}
      </p>
      <h1 v-if="row.kind === 'h1'" class="sg-type-h1">
        {{ row.sample }}
      </h1>
      <p v-else-if="row.kind === 'body'" class="sg-type-body">
        {{ row.sample }}
      </p>
      <p v-else-if="row.kind === 'mono'" class="mono">
        {{ row.sample }}
      </p>
      <AnkLabel v-else-if="row.kind === 'label'">
        {{ row.sample }}
      </AnkLabel>
      <p v-else-if="row.kind === 'panel'" class="sg-type-panel">
        {{ row.sample }}
      </p>
      <p v-else-if="row.kind === 'kpi'" class="sg-type-kpi">
        {{ row.sample }}
      </p>
      <p
        v-else
        class="font-sans font-bold uppercase tracking-normal text-[22px]"
      >
        {{ row.sample }}
      </p>
    </div>
  </section>
</template>
