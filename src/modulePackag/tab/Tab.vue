<template>
  <button
    :class="[
      'px-3 md:px-8 lg:px-10 h-full rounded-md py-3 text-sm font-medium leading-5 text-gray-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
      selected ? 'bg-sky-900 bg-opacity-75 shadow text-gray-50' : 'text-black-300 hover:bg-gray-200'
    ]"
    @click="selected = !selected"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { Value } from './index'
import { computed, inject, Ref } from 'vue'

const props = defineProps<{
  value: Value
}>()

const select = inject<Ref<Value>>('select')
const selected = computed({
  get() {
    return select?.value === props.value
  },
  set() {
    select!.value = props.value
  }
})
</script>
