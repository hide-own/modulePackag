<template>
  <textarea rows="3"
            @input="$emit('update:value',$event.target.value)"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            :placeholder="placeholder">
    {{value}}
  </textarea>
</template>

<script lang="ts" setup>
const props = defineProps<{
  placeholder?: string | number | undefined
  value?: string | number | undefined
}>()
const emit = defineEmits(['update:value'])
</script>
