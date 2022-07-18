<template>
  <div class="px-2 py-4 sm:px-0">
    <div class="inline-block space-x-1 rounded-xl bg-white-900/20 p-1 shadow">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { Value } from './index'

const emit = defineEmits(['update:value'])
const props = defineProps<{
  value: Value
}>()

const value = computed<Value>({
  get() {
    return props.value
  },
  set(val) {
    emit('update:value', val)
  }
})

provide('select', value)
</script>
