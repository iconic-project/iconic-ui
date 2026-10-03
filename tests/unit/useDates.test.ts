import { describe, expect, it } from 'vitest'
import { useDates } from '../../app/composables/useDates'

const GALAPAGOS = { timeZone: 'Pacific/Galapagos' }

describe('useDates', () => {
  const { format, parseIso, toIso, zoneLabel } = useDates()

  it('parses and formats ISO dates in UTC', () => {
    const date = parseIso('2027-11-07')

    expect(date.toISOString()).toBe('2027-11-07T00:00:00.000Z')
    expect(toIso(date)).toBe('2027-11-07')
    expect(format('2027-11-07', 'iso')).toBe('2027-11-07')
    expect(format('2027-11-07', 'short')).toBe('7 Nov 2027')
    expect(format('2027-11-07', 'shortPadded')).toBe('07 Nov 2027')
    expect(format('2027-11-07', 'long')).toBe('Sunday, November 7, 2027')
  })

  it('formats dateTime in UTC', () => {
    const date = new Date(Date.UTC(2026, 8, 18, 18, 22))

    expect(format(date, 'dateTime')).toBe('18 Sep 2026, 18:22')
  })

  it('converts instants into Galápagos time', () => {
    expect(format('2026-12-31T23:30:00Z', 'dateTime', GALAPAGOS)).toBe('31 Dec 2026, 17:30')
    expect(format('2027-01-01T03:00:00Z', 'dateTime', GALAPAGOS)).toBe('31 Dec 2026, 21:00')
  })

  it('formats a Date iso as the Galápagos calendar day, not UTC', () => {
    // 23:30 GALT = 05:30 UTC the next day
    const now = new Date('2026-09-21T05:30:00.000Z')

    expect(format(now, 'iso', GALAPAGOS)).toBe('2026-09-20')
    expect(format(now, 'iso', { timeZone: 'UTC' })).toBe('2026-09-21')
  })

  it('formats midnight with hourCycle h23', () => {
    expect(format('2027-01-01T06:00:00Z', 'dateTime', GALAPAGOS)).toBe('1 Jan 2027, 00:00')
    expect(format('2027-01-01T06:00:00Z', 'time', GALAPAGOS)).toBe('00:00')
  })

  it('never shifts a calendar date', () => {
    expect(format('2027-01-07', 'short', { timeZone: 'UTC' })).toBe('7 Jan 2027')
    expect(format('2027-01-07', 'short', GALAPAGOS)).toBe('7 Jan 2027')
    expect(format('2027-01-07', 'short', { timeZone: 'Pacific/Kiritimati' })).toBe('7 Jan 2027')
  })

  it('throws dateTime on a date-only string', () => {
    expect(() => format('2027-01-07', 'dateTime')).toThrow(/calendar date has no time/)
  })

  it('throws on a datetime without Z or an offset', () => {
    expect(() => format('2026-12-31T23:30:00')).toThrow(/Invalid ISO datetime/)
    expect(() => format('2026-12-31T23:30:00', 'dateTime', GALAPAGOS)).toThrow(/Invalid ISO datetime/)
  })

  it('renders an em dash for null and undefined', () => {
    expect(format(null)).toBe('—')
    expect(format(undefined)).toBe('—')
  })

  it('throws on malformed ISO', () => {
    expect(() => parseIso('07 Nov 2027')).toThrow(/Invalid ISO date/)
    expect(() => format('2027-13-40')).toThrow(/Invalid ISO date/)
    expect(() => format('not-a-date')).toThrow(/Invalid ISO date/)
  })

  it('returns zone labels from the small map', () => {
    expect(zoneLabel('Pacific/Galapagos')).toBe('Galápagos time · UTC−6')
    expect(zoneLabel('UTC')).toBe('UTC')
    expect(zoneLabel('Etc/UTC')).toBe('UTC')
    expect(zoneLabel('Europe/London')).toBe('Europe/London')
  })
})

describe('stay dates', () => {
  const { nightsBetween, eachNight, addNights, formatStay } = useDates()

  it('counts nights across a month boundary', () => {
    expect(nightsBetween('2028-01-31', '2028-02-02')).toBe(2)
    expect(eachNight('2028-01-31', '2028-02-02')).toEqual(['2028-01-31', '2028-02-01'])
    expect(addNights('2028-01-31', 1)).toBe('2028-02-01')
  })

  it('counts nights across a year boundary', () => {
    expect(nightsBetween('2027-12-30', '2028-01-02')).toBe(3)
    expect(eachNight('2027-12-30', '2028-01-02')).toEqual(['2027-12-30', '2027-12-31', '2028-01-01'])
    expect(formatStay('2027-12-31', '2028-01-01')).toBe('Fri 31 Dec 2027 – Sat 1 Jan 2028 · 1 night')
  })

  it('counts the leap day in 2028 and skips it in 2027', () => {
    expect(addNights('2028-02-28', 1)).toBe('2028-02-29')
    expect(nightsBetween('2028-02-28', '2028-03-01')).toBe(2)
    expect(eachNight('2028-02-28', '2028-03-01')).toEqual(['2028-02-28', '2028-02-29'])
    expect(addNights('2027-02-28', 1)).toBe('2027-03-01')
    expect(nightsBetween('2027-02-28', '2027-03-01')).toBe(1)
  })

  it('formats a same-year stay with the year on the check-out', () => {
    expect(formatStay('2028-03-07', '2028-03-10')).toBe('Tue 7 Mar – Fri 10 Mar 2028 · 3 nights')
    expect(eachNight('2028-03-07', '2028-03-10')).toEqual(['2028-03-07', '2028-03-08', '2028-03-09'])
  })
})
