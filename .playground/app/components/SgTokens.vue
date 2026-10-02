<script setup lang="ts">
const COLOR_TOKENS: Array<string> = [
  '--bg-canvas',
  '--bg-surface',
  '--bg-surface-alt',
  '--bg-surface-sunk',
  '--fg-default',
  '--fg-muted',
  '--fg-subtle',
  '--fg-brand',
  '--hilo-blue-500',
  '--border-subtle',
  '--border-default',
  '--success-500',
  '--warning-700',
  '--danger-500',
]

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

  for (const name of [...COLOR_TOKENS, ...EASE_TOKENS]) {
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
  <section ref="root" class="sg-section">
    <AnkLabel class="sg-section__title">
      Colour tokens
    </AnkLabel>
    <div class="sg-grid">
      <div
        v-for="token in COLOR_TOKENS"
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
