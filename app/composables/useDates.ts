export type DateStyle = 'iso' | 'short' | 'shortPadded' | 'long' | 'dateTime' | 'time'

export type DateFormatOptions = {
  timeZone?: string
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/
const ISO_DATETIME = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?)(Z|[+-]\d{2}:\d{2})$/

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const
const LONG_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
const SHORT_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

const ZONE_LABELS: Record<string, string> = {
  'Pacific/Galapagos': 'Galápagos time · UTC−6',
  UTC: 'UTC',
  'Etc/UTC': 'UTC',
}

type CalendarParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

function pad2(value: number): string {
  return String(value).padStart(2, '0')
}

function configuredTimeZone(): string {
  try {
    return useAppConfig().iconic?.displayTimeZone ?? 'UTC'
  }
  catch {
    return 'UTC'
  }
}

function instantParts(date: Date, timeZone: string): CalendarParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const values: Record<string, string> = {}

  for (const part of formatter.formatToParts(date)) {
    if (part.type !== 'literal') {
      values[part.type] = part.value
    }
  }

  return {
    year: Number(values.year),
    month: Number(values.month) - 1,
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
  }
}

function utcParts(date: Date): CalendarParts {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
  }
}

function weekdayFromParts(parts: CalendarParts): number {
  return new Date(Date.UTC(parts.year, parts.month, parts.day)).getUTCDay()
}

function formatParts(parts: CalendarParts, style: DateStyle): string {
  const { year, month, day } = parts

  if (style === 'iso') {
    return `${year}-${pad2(month + 1)}-${pad2(day)}`
  }

  if (style === 'short') {
    return `${day} ${SHORT_MONTHS[month]} ${year}`
  }

  if (style === 'shortPadded') {
    return `${pad2(day)} ${SHORT_MONTHS[month]} ${year}`
  }

  if (style === 'long') {
    return `${WEEKDAYS[weekdayFromParts(parts)]}, ${LONG_MONTHS[month]} ${day}, ${year}`
  }

  if (style === 'time') {
    return `${pad2(parts.hour)}:${pad2(parts.minute)}`
  }

  return `${day} ${SHORT_MONTHS[month]} ${year}, ${pad2(parts.hour)}:${pad2(parts.minute)}`
}

export function useDates() {
  function parseIso(iso: string): Date {
    const match = ISO_DATE.exec(iso)

    if (!match) {
      throw new Error(`Invalid ISO date: ${iso}`)
    }

    const year = Number(match[1])
    const month = Number(match[2])
    const day = Number(match[3])
    const date = new Date(Date.UTC(year, month - 1, day))

    if (
      date.getUTCFullYear() !== year
      || date.getUTCMonth() !== month - 1
      || date.getUTCDate() !== day
    ) {
      throw new Error(`Invalid ISO date: ${iso}`)
    }

    return date
  }

  function parseInstant(iso: string): Date {
    if (!ISO_DATETIME.test(iso)) {
      throw new Error(`Invalid ISO datetime: ${iso}`)
    }

    const date = new Date(iso)

    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid ISO datetime: ${iso}`)
    }

    return date
  }

  function toIso(date: Date): string {
    return date.toISOString().slice(0, 10)
  }

  function format(
    value: string | Date | null | undefined,
    style: DateStyle = 'short',
    options: DateFormatOptions = {},
  ): string {
    if (value === null || value === undefined) {
      return '—'
    }

    const timeZone = options.timeZone ?? configuredTimeZone()

    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) {
        throw new Error('Invalid date')
      }

      return formatParts(instantParts(value, timeZone), style)
    }

    if (ISO_DATE.test(value)) {
      if (style === 'dateTime' || style === 'time') {
        throw new Error('A calendar date has no time')
      }

      return formatParts(utcParts(parseIso(value)), style)
    }

    if (value.includes('T') && !ISO_DATETIME.test(value)) {
      throw new Error(`Invalid ISO datetime: ${value}`)
    }

    return formatParts(instantParts(parseInstant(value), timeZone), style)
  }

  function zoneLabel(timeZone?: string): string {
    const zone = timeZone ?? configuredTimeZone()

    return ZONE_LABELS[zone] ?? zone
  }

  function addNights(date: string, nights: number): string {
    const parsed = parseIso(date)
    parsed.setUTCDate(parsed.getUTCDate() + nights)

    return toIso(parsed)
  }

  function nightsBetween(checkIn: string, checkOut: string): number {
    const milliseconds = parseIso(checkOut).getTime() - parseIso(checkIn).getTime()

    return Math.round(milliseconds / 86_400_000)
  }

  function eachNight(checkIn: string, checkOut: string): string[] {
    const count = nightsBetween(checkIn, checkOut)
    const nights: string[] = []

    for (let index = 0; index < count; index++) {
      nights.push(addNights(checkIn, index))
    }

    return nights
  }

  function formatStayPart(iso: string, withYear: boolean): string {
    const date = parseIso(iso)
    const label = `${SHORT_WEEKDAYS[date.getUTCDay()]} ${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]}`

    return withYear ? `${label} ${date.getUTCFullYear()}` : label
  }

  function formatStay(checkIn: string, checkOut: string): string {
    const sameYear = parseIso(checkIn).getUTCFullYear() === parseIso(checkOut).getUTCFullYear()
    const nights = nightsBetween(checkIn, checkOut)
    const nightLabel = nights === 1 ? '1 night' : `${nights} nights`

    return `${formatStayPart(checkIn, !sameYear)} – ${formatStayPart(checkOut, true)} · ${nightLabel}`
  }

  return {
    toIso,
    parseIso,
    format,
    zoneLabel,
    nightsBetween,
    eachNight,
    addNights,
    formatStay,
  }
}
