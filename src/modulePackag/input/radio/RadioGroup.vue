<template>
  <div class="w-full py-4">
    <div class="w-full">
      <div class="flex-wrap flex">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { Value } from './index'

const props = defineProps<{
  value: Value
}>()
const emit = defineEmits(['update:value', 'change'])

const selected = computed<Value>({
  get() {
    return props.value
  },
  set(val) {
    emit('update:value', val)
    emit('change', val)
  }
})

provide('selected', selected)
</script>
