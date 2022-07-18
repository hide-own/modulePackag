<template>
  <div v-if="visible" class="fixed inset-0">
    <div class="relative h-[100vh] inset-0 z-10">
      <transition
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" @click="closeModal" />
      </transition>

      <div
        class="flex min-h-full items-center justify-center p-4 text-center inset-0 overflow-y-auto"
      >
        <transition
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div
            class="w-full transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all"
            :style="{ width: width + 'px' }"
          >
            <h3
              class="text-lg font-medium leading-6 text-gray-900 py-3 bg-gray-50 border-bottom border-gray-100 text-center"
            >
              {{ title }}
            </h3>
            <div class="p-6 w-full">
              <slot class="max-w-full max-h-full" />
            </div>

            <div v-if="!footer" class="flex justify-around py-3 text-center">
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="upward(true)"
              >
                确定
              </button>
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="upward(false)"
              >
                取消
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = withDefaults(
  defineProps<{
    visible: boolean
    title: string
    footer?: boolean
    width?: number | string
  }>(),
  {
    footer: false,
    width: 400
  }
)
const emit = defineEmits(['update:visible', 'ok', 'cancel'])

function closeModal() {
  emit('update:visible', false)
}

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'auto'
    }
  }
)

function upward(footer: boolean) {
  if (footer) {
    emit('ok')
  } else {
    emit('cancel')
  }
}
</script>
