<template>
  <div
    v-if="show"
    ref="tag"
    class="bg-gray-300 rounded-sm mr-1 mb-1 inline-block text-xs px-2 py-1 align-middle"
  >
    <slot>{{ value }}</slot>
    <XIcon class="w-3 h-3 inline-block cursor-pointer" @click="del" />
  </div>
</template>

<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/solid'
import { computed, ref } from 'vue'

const props = defineProps<{
  value: string | number | undefined | null | object | boolean
}>()
const tag = ref<HTMLElement | null>(null)
const show = ref<boolean>(true)
const emit = defineEmits(['del'])

const value = computed(() => {
  return props.value ?? tag.value?.textContent
})

function del() {
  emit('del', value.value)
  show.value = false
}
</script>
