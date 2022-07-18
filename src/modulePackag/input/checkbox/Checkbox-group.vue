<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import { CheckValue, ModelValue } from './index'
import { init, choose, Option } from '@/modulePackag/hookes/init'

const props = withDefaults(
  defineProps<{
    value: ModelValue | CheckValue
    multiple: boolean
  }>(),
  {
    multiple: false
  }
)

const emit = defineEmits(['update:value'])

const value = computed({
  get() {
    return init(props.value, props.multiple)
  },
  set(val: ModelValue) {
    const res = choose(val![0], value.value, props.multiple)
    emit('update:value', res)
  }
})

provide('value', value)
</script>
