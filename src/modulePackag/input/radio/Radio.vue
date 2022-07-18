<template>
  <div class="mr-3">
    <input
      v-model="checked"
      type="radio"
      :checked="checked"
      class="inline-block focus:ring-sky-700 h-4 w-4 text-sky-700 border-sky-700"
    />
    <slot name="checkbox" :selected="checked">
      <slot />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, Ref } from 'vue'
import { Value } from './index'

const props = defineProps<{
  value: Value
}>()

const selected = inject<Ref<Value>>('selected')

const checked = computed<boolean>({
  get() {
    return selected?.value === props.value
  },
  set() {
    selected!.value = props.value
  }
})
</script>
