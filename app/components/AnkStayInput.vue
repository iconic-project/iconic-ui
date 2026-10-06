<script setup lang="ts">
import { parseDate, type DateValue } from '@internationalized/date'
import { isoToCalendarDate } from '../utils/calendarDate'

export type StayRange = {
  check_in: string
  check_out: string
}

export type NightMark = {
  disabled?: boolean
  closedToArrival?: boolean
  closedToDeparture?: boolean
  price?: number
  minStay?: number
}

const model = defineModel<StayRange | null>({ default: null })

const props = defineProps<{
  minNights: number
  maxNights: number
  minDate?: string | null
  maxDate?: string | null
  nightInfo?: (date: string) => NightMark
}>()

const { t } = useI18n()
const { format: formatMoney } = useMoney()
const { format, nightsBetween, eachNight, formatStay } = useDates()

const message = ref<string | null>(null)
const pending = ref<string | null>(null)
const suppress = ref<string | null>(null)
const calendarModel = shallowRef<{ start: DateValue | undefined, end: DateValue | undefined } | undefined>(undefined)

const minValue = computed(() => isoToCalendarDate(props.minDate))
const maxValue = computed(() => isoToCalendarDate(props.maxDate))
const placeholder = computed(() =>
  isoToCalendarDate(model.value?.check_in)
  ?? isoToCalendarDate(pending.value)
  ?? isoToCalendarDate(props.minDate),
)

const nights = computed(() => {
  if (!model.value) {
    return null
  }

  return nightsBetween(model.value.check_in, model.value.check_out)
})

const summary = computed(() => {
  if (model.value) {
    return formatStay(model.value.check_in, model.value.check_out)
  }

  if (pending.value) {
    return `${format(pending.value, 'short')} · ${t('stay.chooseDeparture')}`
  }

  return t('stay.chooseArrival')
})

function mark(iso: string): NightMark {
  return props.nightInfo?.(iso) ?? {}
}

function rangeKey(start: string | null, end: string | null): string {
  return `${start ?? ''}|${end ?? ''}`
}

function showRange(start: string | null, end: string | null): void {
  suppress.value = rangeKey(start, end)
  calendarModel.value = {
    start: start ? parseDate(start) : undefined,
    end: end ? parseDate(end) : undefined,
  }
}

function refuseArrival(iso: string): string | null {
  const info = mark(iso)

  if (info.disabled) {
    return t('stay.unavailable')
  }

  if (info.closedToArrival) {
    return t('stay.closedToArrival')
  }

  return null
}

function refuseDeparture(checkIn: string, checkOut: string): string | null {
  const count = nightsBetween(checkIn, checkOut)

  if (count <= 0) {
    return t('stay.checkOutAfter')
  }

  const departure = mark(checkOut)

  if (departure.disabled) {
    return t('stay.unavailable')
  }

  if (departure.closedToDeparture) {
    return t('stay.closedToDeparture')
  }

  const minimum = Math.max(props.minNights, mark(checkIn).minStay ?? 0)

  if (count < minimum) {
    return t('stay.tooShort', { min: minimum })
  }

  if (count > props.maxNights) {
    return t('stay.tooLong', { max: props.maxNights })
  }

  for (const night of eachNight(checkIn, checkOut)) {
    if (mark(night).disabled) {
      return t('stay.unavailableNight')
    }
  }

  return null
}

function isoOf(value: DateValue | undefined): string | null {
  if (!value) {
    return null
  }

  const iso = value.toString()

  return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : null
}

function onUpdate(value: { start: DateValue | undefined, end: DateValue | undefined } | null | undefined): void {
  const start = isoOf(value?.start)
  const end = isoOf(value?.end)
  const key = rangeKey(start, end)

  if (suppress.value === key) {
    suppress.value = null

    return
  }

  if (!start) {
    pending.value = null
    message.value = null
    model.value = null
    showRange(null, null)

    return
  }

  if (!end) {
    const reason = refuseArrival(start)

    if (reason) {
      message.value = reason
      pending.value = null
      model.value = null
      showRange(null, null)

      return
    }

    message.value = null
    pending.value = start
    model.value = null
    showRange(start, null)

    return
  }

  if (pending.value && start !== pending.value) {
    const reason = refuseArrival(start)

    if (reason) {
      message.value = reason
      showRange(pending.value, null)

      return
    }

    pending.value = start
    message.value = null
    model.value = null
    showRange(start, null)

    return
  }

  const arrivalReason = refuseArrival(start)

  if (arrivalReason) {
    message.value = arrivalReason
    pending.value = null
    model.value = null
    showRange(null, null)

    return
  }

  const reason = refuseDeparture(start, end)

  if (reason) {
    message.value = reason
    pending.value = start
    model.value = null
    showRange(start, null)

    return
  }

  message.value = null
  pending.value = null
  model.value = { check_in: start, check_out: end }
  showRange(start, end)
}

function clearStay(): void {
  message.value = null
  pending.value = null
  model.value = null
  showRange(null, null)
}

function dayMark(day: { toString(): string }): NightMark {
  const iso = day.toString()

  return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? mark(iso) : {}
}

function dayPrice(day: { toString(): string }): string | null {
  const price = dayMark(day).price

  if (price === undefined) {
    return null
  }

  return formatMoney(price)
}

watch(() => model.value, (value) => {
  if (!value) {
    return
  }

  pending.value = null
  showRange(value.check_in, value.check_out)
}, { immediate: true })
</script>

<template>
  <div class="ank-stay">
    <div class="ank-stay__bar">
      <p class="ank-stay__summary">
        {{ summary }}
      </p>
      <AnkNights v-if="nights !== null" :nights="nights" />
      <UButton
        type="button"
        color="neutral"
        variant="ghost"
        size="sm"
        :disabled="model === null && pending === null"
        @click="clearStay"
      >
        {{ t('stay.clear') }}
      </UButton>
    </div>
    <p
      v-if="message"
      class="ank-stay__message"
      role="status"
      data-testid="stay-message"
    >
      {{ message }}
    </p>
    <UCalendar
      range
      :number-of-months="2"
      :model-value="calendarModel"
      :min-value="minValue"
      :max-value="maxValue"
      :placeholder="placeholder"
      :aria-label="t('stay.pickerAria')"
      class="ank-stay__calendar"
      @update:model-value="onUpdate"
    >
      <template #day="{ day }">
        <span
          class="ank-stay__day"
          :data-closed-arrival="dayMark(day).closedToArrival ? '' : undefined"
          :data-closed-departure="dayMark(day).closedToDeparture ? '' : undefined"
        >{{ day.day }}<small v-if="dayPrice(day)" class="ank-stay__price">{{ dayPrice(day) }}</small></span>
      </template>
    </UCalendar>
  </div>
</template>

<style scoped>
.ank-stay {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ank-stay__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.ank-stay__summary {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--fg-primary);
}

.ank-stay__message {
  margin: 0;
  font-size: 13px;
  color: var(--warn);
}

.ank-stay__calendar {
  width: fit-content;
  max-width: 100%;
  padding: 8px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--ui-radius);
  background: var(--bg-surface);
  box-shadow: var(--shadow-xs);
}

.ank-stay__day {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
}

.ank-stay__price {
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0;
  color: var(--fg-muted);
}

.ank-stay__day[data-closed-arrival],
.ank-stay__day[data-closed-departure] {
  text-decoration: line-through;
  text-decoration-color: var(--warn);
}
</style>
