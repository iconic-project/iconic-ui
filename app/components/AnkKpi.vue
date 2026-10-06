<script setup lang="ts">
defineProps<{
  label: string
  sub?: string
}>()
</script>

<template>
  <div class="ank-kpi">
    <div class="ank-kpi__label">
      {{ label }}
    </div>
    <div class="ank-kpi__value">
      <slot />
    </div>
    <div v-if="sub || $slots.sub" class="ank-kpi__sub">
      <slot name="sub">
        {{ sub }}
      </slot>
    </div>
  </div>
</template>

<style scoped>
.ank-kpi {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--ui-radius);
  box-shadow: var(--shadow-xs);
  padding: 20px 24px;
}

.ank-kpi__label {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fg-brand);
  margin-bottom: 8px;
}

.ank-kpi__value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 32px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.ank-kpi__sub {
  font-size: 13px;
  font-weight: 400;
  color: var(--fg-muted);
  margin-top: 6px;
}
</style>
