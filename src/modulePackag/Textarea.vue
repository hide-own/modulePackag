<template>
  <textarea rows="3"
            @input="oninput"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            :placeholder="placeholder">{{value}}</textarea>
</template>

<script lang="ts" setup>
const props = defineProps<{
  placeholder?: string  | undefined
  value?: string  | undefined
}>()
const emit = defineEmits(['update:value'])

function oninput(e: Event) {
  const target = e.target as HTMLElement
  emit('update:value', target?.textContent)
}
</script>
