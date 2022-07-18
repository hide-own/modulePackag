<template>
  <div class="w-full rounded-xl bg-white mb-3">
    <div
      class="flex w-full justify-between rounded bg-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      @click="check = !check"
    >
      <span>{{ header }}</span>
      <div :class="check ? 'rotate-180 transform' : null" class="h-5 w-5 text-gray-500" />
    </div>

    <transition
      v-show="check"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="px-4 pt-4 pb-2 text-sm text-gray-500">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  header: string
}>()
const check = ref<boolean>(false)
</script>
