<template>
  <div>
    <input
      ref="input"
      type="text"
      class="inline-block p-3 focus:ring-sky-700 focus:border-sky-700 block w-full shadow-sm sm:text-sm border-sky-0 rounded-md"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      @input="oninput"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string | null | undefined
  name?: string
  placeholder: string
}>()
const emit = defineEmits(['update:modelValue', 'change'])
function oninput(e: Event) {
  const target: HTMLInputElement = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
