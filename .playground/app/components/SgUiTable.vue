<script setup lang="ts">
type BookingRow = {
  ref: string
  guest: string
  checkIn: string
  status: string
}

const columns: Array<{ accessorKey: keyof BookingRow, header: string }> = [
  { accessorKey: 'ref', header: 'Ref' },
  { accessorKey: 'guest', header: 'Guest' },
  { accessorKey: 'checkIn', header: 'Check-in' },
  { accessorKey: 'status', header: 'Status' },
]

const rows: Array<BookingRow> = [
  { ref: 'ANK-2026-0005', guest: 'Alvear', checkIn: '14 Nov 2027', status: 'CONFIRMED' },
  { ref: 'ANK-2026-0006', guest: 'Meridian', checkIn: '21 Nov 2027', status: 'HOLD' },
  { ref: 'ANK-2026-0007', guest: 'Virtuoso', checkIn: '28 Nov 2027', status: 'PENDING' },
]
</script>

<template>
  <section class="sg-section">
    <AnkLabel class="sg-section__title">
      UTable
    </AnkLabel>
    <UTable :data="rows" :columns="columns" />
    <SgCompare
      src="/reference/02-bookings.png"
      caption="02-bookings.png · list table"
      position="50% 38%"
    >
      <UTable :data="rows" :columns="columns" />
    </SgCompare>
    <SgCompare
      src="/reference/03-payments.png"
      caption="03-payments.png · payments list"
      position="50% 48%"
    >
      <UTable :data="rows" :columns="columns" />
    </SgCompare>
  </section>
</template>
