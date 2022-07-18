<template>
  <li @click.stop="choose">
    <div
      ref="itemRef"
      :class="[
        'z-50 cursor-pointer',
        selected ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
        'relative cursor-default select-none py-2 pl-10 pr-4'
      ]"
    >
      <slot name="title" :selected="selected">
        <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
          label
        }}</span>
      </slot>

      <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
        <slot name="icon" :selected="selected">
          <CheckIcon class="h-5 w-5" aria-hidden="true" />
        </slot>
      </span>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { CheckIcon } from '@heroicons/vue/solid'
import { Value, SelectedLabel } from './types'
import { computed, inject, ref, Ref } from 'vue'

const props = defineProps<{
  value: Value
  label?: Value
}>()

const selectCtx = inject<Ref<SelectedLabel[]>>('selected')
// const selectCtxFind = selectCtx?.value.find((d) => d.value === props.value)
const itemRef = ref<HTMLElement | null>(null)

const label = computed(() => {
  return props.label ? props.label : itemRef.value?.textContent
})

//选中的value
const selected = computed<boolean | undefined>(() => {
  const find = selectCtx!.value.find((d) => {
    const existence: boolean = d.value === props.value
    if (existence) {
      d.label = label.value
    }
    return existence
  })
  return !!find
})

function choose() {
  selectCtx!.value = [{ value: props.value, label: props.label, id: 0 }]
}
</script>
