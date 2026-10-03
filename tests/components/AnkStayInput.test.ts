import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AnkStayInput, { type NightMark, type StayRange } from '../../app/components/AnkStayInput.vue'

async function mountStay(options: {
  minNights?: number
  maxNights?: number
  nightInfo?: (date: string) => NightMark
} = {}) {
  let model: StayRange | null = null
  const apply = {
    run(value: StayRange | null) {
      model = value
    },
  }
  const wrapper = await mountSuspended(AnkStayInput, {
    props: {
      minNights: options.minNights ?? 1,
      maxNights: options.maxNights ?? 14,
      minDate: '2028-03-01',
      maxDate: '2028-04-30',
      nightInfo: options.nightInfo,
      modelValue: null,
      'onUpdate:modelValue': (value: StayRange | null) => apply.run(value),
    },
  })

  apply.run = (value: StayRange | null) => {
    model = value

    return wrapper.setProps({ modelValue: value })
  }

  return {
    wrapper,
    model: () => model,
  }
}

function day(wrapper: Awaited<ReturnType<typeof mountStay>>['wrapper'], iso: string) {
  return wrapper.get(`[data-value="${iso}"]:not([data-outside-view])`)
}

async function choose(wrapper: Awaited<ReturnType<typeof mountStay>>['wrapper'], iso: string) {
  const cell = day(wrapper, iso)
  await cell.trigger('mouseenter')
  await cell.trigger('click')
}

describe('AnkStayInput', () => {
  it('selects a stay on the second click and can clear it', async () => {
    const { wrapper, model } = await mountStay()

    const arrival = day(wrapper, '2028-03-07')
    await arrival.trigger('focusin')
    await arrival.trigger('keydown', { key: 'Enter', code: 'Enter' })
    expect(model()).toBeNull()
    expect(wrapper.text()).toContain('Choose a check-out date')

    await choose(wrapper, '2028-03-10')
    expect(model()).toEqual({ check_in: '2028-03-07', check_out: '2028-03-10' })
    expect(wrapper.text()).toContain('3 nights')
    expect(wrapper.text()).toContain('Tue 7 Mar – Fri 10 Mar 2028 · 3 nights')

    await wrapper.findAll('button').find(button => button.text() === 'Clear stay')?.trigger('click')
    expect(model()).toBeNull()
    expect(wrapper.text()).toContain('Choose a check-in date')
  })

  it('refuses a closed-to-arrival day', async () => {
    const { wrapper, model } = await mountStay({
      nightInfo: date => date === '2028-03-07' ? { closedToArrival: true } : {},
    })

    await choose(wrapper, '2028-03-07')

    expect(model()).toBeNull()
    expect(wrapper.get('[data-testid="stay-message"]').text()).toBe('That date is closed to arrival.')

    await choose(wrapper, '2028-03-10')
    expect(model()).toBeNull()
    expect(wrapper.text()).toContain('Choose a check-out date')
  })

  it('refuses a stay shorter than the minimum and explains why', async () => {
    const { wrapper, model } = await mountStay({ minNights: 3 })

    await choose(wrapper, '2028-03-07')
    await choose(wrapper, '2028-03-08')

    expect(model()).toBeNull()
    expect(wrapper.get('[data-testid="stay-message"]').text()).toBe('A stay must be at least 3 nights.')
  })
})
