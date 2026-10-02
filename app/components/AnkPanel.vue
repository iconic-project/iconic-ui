<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()

const slots = useSlots()

const hasHeader = computed(() => Boolean(props.title || slots.actions))
</script>

<template>
  <section class="ank-panel">
    <header v-if="hasHeader" class="ank-panel__header">
      <h3 v-if="title" class="ank-panel__title">
        {{ title }}
      </h3>
      <div v-if="slots.actions" class="ank-panel__actions">
        <slot name="actions" />
      </div>
    </header>
    <div class="ank-panel__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.ank-panel {
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xs);
  margin-bottom: 24px;
  overflow: hidden;
}

.ank-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.ank-panel__title {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  font-size: 18px;
  color: var(--fg-default);
  margin: 0;
}

.ank-panel__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ank-panel__body {
  min-width: 0;
}
</style>
