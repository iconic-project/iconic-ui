<script setup lang="ts">
const props = defineProps<{
  nights: number
}>()

const { t } = useI18n()
</script>

<template>
  <span class="ank-nights">{{ t('stay.nights', props.nights) }}</span>
</template>

<style scoped>
.ank-nights {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.3;
  padding: 2px 10px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  color: var(--fg-primary);
}
</style>
