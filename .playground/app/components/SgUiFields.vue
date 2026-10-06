<script setup lang="ts">
const yachtOptions: Array<string> = [
  'ANAMARA',
  'ANATIVA',
]

const selectValue = ref('ANAMARA')
const selectMenuValue = ref('ANATIVA')
const inputValue = ref('')
const textareaValue = ref('')
const dateValue = ref<string | null>('2027-11-14')
</script>

<template>
  <section class="sg-section">
    <AnkLabel class="sg-section__title">
      Fields
    </AnkLabel>

    <p class="label" style="margin-bottom: 10px">
      md · .field
    </p>
    <div class="sg-states">
      <SgState label="Default">
        <div class="sg-field-col">
          <UFormField label="Guest / client name">
            <UInput v-model="inputValue" placeholder="As on passport" />
          </UFormField>
        </div>
      </SgState>
      <SgState label="Focus">
        <div class="sg-field-col sg-force-focus-field">
          <UFormField label="Guest / client name">
            <UInput placeholder="As on passport" />
          </UFormField>
        </div>
      </SgState>
      <SgState label="Disabled">
        <div class="sg-field-col">
          <UFormField label="Guest / client name">
            <UInput disabled placeholder="As on passport" />
          </UFormField>
        </div>
      </SgState>
      <SgState label="Error">
        <div class="sg-field-col">
          <UFormField label="Guest / client name" error="Required">
            <UInput placeholder="As on passport" />
          </UFormField>
        </div>
      </SgState>
    </div>

    <div class="sg-stack" style="margin-top: 20px; max-width: 360px">
      <UFormField label="Property">
        <USelect v-model="selectValue" :items="yachtOptions" />
      </UFormField>
      <UFormField label="Room type">
        <USelectMenu v-model="selectMenuValue" :items="yachtOptions" />
      </UFormField>
      <UFormField label="Internal notes">
        <UTextarea v-model="textareaValue" :rows="2" />
      </UFormField>
      <UFormField label="Check-in">
        <AnkDateInput v-model="dateValue" />
      </UFormField>
    </div>

    <p class="label" style="margin: 28px 0 10px">
      sm · toolbar
    </p>
    <div class="sg-states">
      <SgState label="Default">
        <UInput size="sm" placeholder="2027-11-14" />
      </SgState>
      <SgState label="Focus">
        <div class="sg-force-focus-field">
          <UInput size="sm" placeholder="2027-11-14" />
        </div>
      </SgState>
      <SgState label="Disabled">
        <UInput size="sm" disabled placeholder="2027-11-14" />
      </SgState>
      <SgState label="Hover">
        <USelect v-model="selectValue" size="sm" :items="yachtOptions" />
      </SgState>
    </div>

    <SgCompare
      src="/reference/07-rates.png"
      caption="07-rates.png · rate inputs"
      position="50% 48%"
    >
      <UFormField label="Suite — per person, double occ.">
        <UInput model-value="13300" />
      </UFormField>
    </SgCompare>
    <SgCompare
      src="/reference/02-bookings.png"
      caption="02-bookings.png · date filters"
      position="40% 8%"
    >
      <div class="sg-states">
        <AnkDateInput v-model="dateValue" size="sm" aria-label="From" />
        <USelect v-model="selectValue" size="sm" :items="yachtOptions" />
      </div>
    </SgCompare>
  </section>
</template>
