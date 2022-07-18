<template>
  <div class="flex justify-between">
    <div
      class="cursor-pointer bg-gray-200 w-10 text-center hover:bg-gray-300"
      @click="modelValue--"
    >
      <MinusIcon class="w-6 h-6 inline-block text-gray-400 pt-2.5" />
    </div>
    <input
      v-model="modelValue"
      type="text"
      class="focus:ring-indigo-500 focus:border-sky-900 p-2 w-full shadow-sm sm:text-sm border-gray-300"
      :placeholder="placeholder"
    />
    <div
      class="cursor-pointer bg-gray-200 w-10 text-center hover:bg-gray-300"
      @click="modelValue++"
    >
      <PlusIcon class="w-6 h-6 inline-block text-gray-400 pt-2.5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/outline'

const props = defineProps<{
  modelValue: number | null
  placeholder: string
}>()
const emit = defineEmits(['update:modelValue'])

const modelValue = computed<null | number>({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>
