<script setup lang="ts">
const tones: Array<{ tone: 'neutral' | 'ok' | 'warn' | 'sand' | 'coral', label: string }> = [
  { tone: 'neutral', label: 'Neutral' },
  { tone: 'ok', label: 'Confirmed' },
  { tone: 'warn', label: 'Hold' },
  { tone: 'sand', label: 'Pending' },
  { tone: 'coral', label: 'Cancelled' },
]
</script>

<template>
  <section class="sg-section">
    <AnkLabel class="sg-section__title">
      Ank components
    </AnkLabel>

    <AnkLabel>AnkLabel</AnkLabel>
    <p class="sg-type-body" style="margin: 8px 0 20px">
      Default slot, mono 9px uppercase.
    </p>

    <AnkLabel>AnkPill</AnkLabel>
    <div class="sg-ank-pills">
      <AnkPill
        v-for="item in tones"
        :key="item.tone"
        :tone="item.tone"
      >
        {{ item.label }}
      </AnkPill>
    </div>
    <SgCompare
      src="/reference/02-bookings.png"
      caption="02-bookings.png · status pills"
      position="92% 42%"
    >
      <div class="sg-ank-pills">
        <AnkPill tone="ok">
          Confirmed
        </AnkPill>
        <AnkPill tone="sand">
          Pending
        </AnkPill>
        <AnkPill tone="coral">
          Cancelled
        </AnkPill>
      </div>
    </SgCompare>
    <SgCompare
      src="/reference/03-payments.png"
      caption="03-payments.png · overdue / confirmed"
      position="90% 70%"
    >
      <div class="sg-ank-pills">
        <AnkPill tone="ok">
          Confirmed
        </AnkPill>
        <AnkPill tone="coral">
          Overdue
        </AnkPill>
      </div>
    </SgCompare>

    <AnkLabel style="display: block; margin-top: 28px">
      AnkPanel
    </AnkLabel>
    <div class="sg-stack" style="margin-top: 12px">
      <AnkPanel title="Title only">
        <p class="px-5 py-4">
          Header with a Satoshi title, no actions.
        </p>
      </AnkPanel>
      <AnkPanel title="Incoming requests">
        <template #actions>
          <AnkPill>Admin</AnkPill>
        </template>
        <p class="px-5 py-4">
          Title plus actions slot.
        </p>
      </AnkPanel>
      <AnkPanel>
        <p class="px-5 py-4">
          Body only — no header row.
        </p>
      </AnkPanel>
    </div>

    <AnkLabel style="display: block; margin-top: 28px">
      AnkKpi · AnkMoney
    </AnkLabel>
    <div class="sg-kpi-row" style="margin-top: 12px">
      <AnkKpi label="Collected to date" sub="deposits + balances, all channels">
        <AnkMoney :amount="28520" />
      </AnkKpi>
      <AnkKpi label="Document cents">
        <AnkMoney :cents="2852000" />
      </AnkKpi>
    </div>
    <SgCompare
      src="/reference/03-payments.png"
      caption="03-payments.png · KPI row"
      position="50% 18%"
    >
      <AnkKpi label="Collected to date" sub="deposits + balances, all channels">
        <AnkMoney :amount="103492" />
      </AnkKpi>
    </SgCompare>

    <AnkLabel style="display: block; margin-top: 28px">
      AnkThemeToggle
    </AnkLabel>
    <div style="margin-top: 12px">
      <AnkThemeToggle />
    </div>
  </section>
</template>
