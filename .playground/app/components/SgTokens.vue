<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  theme?: string
}>(), {
  title: 'Colour tokens',
})

const BASE_TOKENS: Array<string> = [
  '--bg-canvas',
  '--bg-surface',
  '--bg-surface-alt',
  '--bg-surface-sunk',
  '--fg-default',
  '--fg-muted',
  '--fg-subtle',
  '--fg-brand',
  '--hilo-blue-500',
  '--border',
  '--border-subtle',
  '--border-default',
  '--success-500',
  '--warning-700',
  '--danger-500',
]

const STAFF_TOKENS: Array<string> = [
  '--primary',
  '--warm',
  '--bg',
  '--surface',
  '--nav-bg',
  '--success',
  '--warning',
  '--danger',
  '--note-bg',
]

const colorTokens = computed(() => {
  if (props.theme === 'staff') {
    return [...STAFF_TOKENS, ...BASE_TOKENS]
  }

  return BASE_TOKENS
})

const EASE_TOKENS: Array<string> = [
  '--ease',
  '--eo',
  '--eio',
]

const colorMode = useColorMode()
const root = ref<HTMLElement | null>(null)
const values = ref<Record<string, string>>({})

function readTokens(): void {
  if (!root.value) {
    return
  }

  const styles = getComputedStyle(root.value)
  const next: Record<string, string> = {}

  for (const name of [...colorTokens.value, ...EASE_TOKENS]) {
    next[name] = styles.getPropertyValue(name).trim()
  }

  values.value = next
}

onMounted(async () => {
  await nextTick()
  readTokens()
})

watch(() => colorMode.value, async () => {
  await nextTick()
  readTokens()
})
</script>

<template>
  <section
    ref="root"
    class="sg-section"
    :data-theme="theme"
  >
    <AnkLabel class="sg-section__title">
      {{ title }}
    </AnkLabel>
    <div class="sg-grid">
      <div
        v-for="token in colorTokens"
        :key="token"
        class="sg-swatch"
      >
        <div
          class="sg-swatch__fill"
          :style="{ background: `var(${token})` }"
        />
        <p class="sg-swatch__name">
          {{ token }}
        </p>
        <p class="sg-swatch__value">
          {{ values[token] || '—' }}
        </p>
      </div>
    </div>

    <AnkLabel class="sg-section__title" style="display: block; margin-top: 24px">
      Easing
    </AnkLabel>
    <div class="sg-ease-list">
      <p
        v-for="token in EASE_TOKENS"
        :key="token"
        class="sg-ease"
      >
        {{ token }} · {{ values[token] || '—' }}
      </p>
    </div>
  </section>
</template>
