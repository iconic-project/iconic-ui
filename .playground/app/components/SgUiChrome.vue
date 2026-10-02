<script setup lang="ts">
const tabItems: Array<{ label: string, value: string }> = [
  { label: 'Overview', value: 'overview' },
  { label: 'Guests', value: 'guests' },
  { label: 'Extras', value: 'extras' },
  { label: 'Payments', value: 'payments' },
  { label: 'Documents', value: 'documents' },
  { label: 'History', value: 'history' },
]

const page = ref(2)
</script>

<template>
  <section class="sg-section">
    <AnkLabel class="sg-section__title">
      UBadge
    </AnkLabel>
    <div class="sg-ank-pills">
      <UBadge>Neutral</UBadge>
      <UBadge color="success">
        Confirmed
      </UBadge>
      <UBadge color="warning">
        Hold
      </UBadge>
      <UBadge color="info">
        Pending
      </UBadge>
      <UBadge color="primary">
        Overdue
      </UBadge>
    </div>

    <AnkLabel class="sg-section__title" style="display: block; margin-top: 28px">
      UCard
    </AnkLabel>
    <UCard>
      <template #header>
        <h3 class="font-display font-normal text-[22px] tracking-normal text-(--fg-default)">
          Bookings
        </h3>
      </template>
      List table and filters sit inside a panel.
    </UCard>

    <AnkLabel class="sg-section__title" style="display: block; margin-top: 28px">
      UTabs
    </AnkLabel>
    <UTabs :items="tabItems" />
    <SgCompare
      src="/reference/14-booking-overview.png"
      caption="14-booking-overview.png · drawer tabs"
      position="82% 10%"
    >
      <UTabs :items="tabItems" />
    </SgCompare>

    <AnkLabel class="sg-section__title" style="display: block; margin-top: 28px">
      UPagination
    </AnkLabel>
    <div class="sg-states">
      <SgState label="Default">
        <UPagination v-model="page" :total="48" :items-per-page="10" />
      </SgState>
    </div>
  </section>
</template>
