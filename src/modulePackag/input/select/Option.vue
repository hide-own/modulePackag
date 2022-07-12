<template>
  <li @click.stop="choose">
    <div
        ref="itemRef"
        :class="['z-50 cursor-pointer',selected ? 'bg-amber-100 text-amber-900' : 'text-gray-900','relative cursor-default select-none py-2 pl-10 pr-4']">
      <slot name="title" :selected="selected">
        <span :class="[selected ? 'font-medium' : 'font-normal','block truncate']">{{ label }}</span>
      </slot>

      <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
        <slot name="icon" :selected="selected">
          <CheckIcon class="h-5 w-5" aria-hidden="true"/>
        </slot>
      </span>
    </div>
  </li>
</template>

<script lang="ts" setup>
import {CheckIcon} from '@heroicons/vue/solid'
import {Value} from "./types";
import {computed, inject, ref, Ref, watch, watchEffect} from "vue";

const props = defineProps<{
  value: Value
  label?: Value
}>()

const selectCtx = inject<Ref<Value[]>>('selected')
const label = inject<Ref<Value>>('label')
const itemRef = ref<HTMLElement | null>(null);


//选中的value
const selected = computed<boolean | undefined>(() => {
  return selectCtx?.value.includes(props.value)
})

//选中的label
function labelChange(judge:boolean|undefined){
  if(judge){
    (label as unknown as Ref).value = (props.label ? props.label : itemRef.value?.textContent) as Value;
  }
}
labelChange(selected.value)

watch(() => selectCtx?.value as unknown as Value[], (oldValue:Value[], newValue:Value[]) => {
  labelChange(oldValue.includes(props.value))
  labelChange(newValue.includes(props.value))
})


function choose() {
  (label as unknown as Ref).value = (props.label ? props.label : itemRef.value?.textContent) as Value;
  (selectCtx as Ref).value = props.value
}
</script>
