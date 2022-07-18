<template>
  <div class="mr-3 inline-block">
    <input
      v-model="checked"
      type="checkbox"
      :value="value"
      class="cursor-pointer rounded mr-2 align-middle border-gray-300 text-sky-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
    <slot name="checkbox" :selected="checked">
      <slot />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, Ref } from 'vue'
import { CheckValue, ModelValue } from './index'

const props = defineProps<{
  value: CheckValue
}>()

const value = inject<Ref<ModelValue>>('value')

const checked = computed<boolean>({
  get() {
    console.log(value?.value)
    return value!.value!.includes(props.value)
  },
  set() {
    value!.value = [props.value]
  }
})
</script>
