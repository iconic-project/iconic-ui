<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})
</script>

<template>
  <span class="ank-wordmark" :data-size="size">Iconic</span>
</template>

<style scoped>
.ank-wordmark {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
  line-height: 1;
  color: var(--fg-default);
}

.ank-wordmark[data-size='sm'] {
  font-size: 16px;
}

.ank-wordmark[data-size='md'] {
  font-size: 22px;
}

.ank-wordmark[data-size='lg'] {
  font-size: 28px;
}
</style>
