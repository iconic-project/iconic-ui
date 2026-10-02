<script setup lang="ts">
export type AnkPillTone = 'neutral' | 'ok' | 'warn' | 'coral' | 'sand'

withDefaults(defineProps<{
  tone?: AnkPillTone
}>(), {
  tone: 'neutral',
})
</script>

<template>
  <span class="ank-pill" :data-tone="tone">
    <slot />
  </span>
</template>

<style scoped>
.ank-pill {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 10px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
}

.ank-pill[data-tone='ok'] {
  border-color: var(--ok);
  color: var(--ok);
}

.ank-pill[data-tone='warn'] {
  border-color: var(--warn);
  color: var(--warn);
}

.ank-pill[data-tone='coral'] {
  border-color: var(--coral);
  color: var(--coral);
}

.ank-pill[data-tone='sand'] {
  border-color: var(--sand);
  color: var(--sand);
}
</style>
