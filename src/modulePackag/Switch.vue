<template>
  <div class="pb-4">
    <div
      :class="value ? 'bg-sky-900 bg-opacity-75' : 'bg-gray-400'"
      class="relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      @click="toggle"
    >
      <span :class="['absolute top-0.5 text-sm text-white', value ? 'left-3' : 'right-3']">{{
        value ? checked : unchecked
      }}</span>
      <span
        aria-hidden="true"
        :class="value ? 'translate-x-9' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: boolean
  checked?: string
  unchecked?: string
}>()

const emit = defineEmits(['update:value', 'change'])

function toggle() {
  emit('update:value', !props.value)
  emit('change', !props.value)
}
</script>
