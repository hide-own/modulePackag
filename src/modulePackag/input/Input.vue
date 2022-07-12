<template>
  <input
    type="text"
    class="inline-block  p-3 focus:ring-sky-700 focus:border-sky-700 block w-full shadow-sm sm:text-sm border-sky-0 rounded-md"
    :value="modelValue"
    :name="name"
    :placeholder="placeholder"
    @change="$emit('change',$event.target.value)"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input">
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | null | undefined,
  name: string,
  placeholder: string,
}>();
defineEmits(['update:modelValue', 'change']);
</script>
