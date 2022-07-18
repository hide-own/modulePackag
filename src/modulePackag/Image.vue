<template>
  <img :src="src" :style="{ width: `${width}px` }" alt="" @click="open" />

  <div
    v-if="show"
    class="fixed z-50 bg-opacity-60 w-full h-full bg-gray-400 top-0 left-0"
    @click="shutDown"
  >
    <img
      ref="area"
      :style="{ width: imgWidth + 'px' }"
      :src="src"
      class="absolute top-0 bottom-0 left-0 right-0 m-auto cursor-pointer"
      alt=""
    />
    <div
      ref="feature"
      class="flex justify-around absolute bottom-4 left-0 right-0 mx-auto w-96 bg-white rounded cursor-pointer"
    >
      <ArrowsExpandIcon class="w-4 h-4 my-3" @click="fullScreen" />
      <ZoomInIcon class="w-4 h-4 my-3" @click="zoomInOn(true)" />
      <ZoomOutIcon class="w-4 h-4 my-3" @click="zoomInOn(false)" />
      <span class="text-sm my-3" @click="originalProportion">1:1</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ZoomInIcon, ZoomOutIcon, ArrowsExpandIcon, XCircleIcon } from '@heroicons/vue/solid'

const props = defineProps<{
  width: number | string
  src: string
}>()

const show = ref<boolean>(false)
const area = ref<HTMLElement | null>(null)
const feature = ref<HTMLElement | null>(null)
const src = computed<string>(() => props.src)
const imgWidth = ref<number>(NaN)
const imgWidthOld = ref<number>(NaN)

function open() {
  document.documentElement.style.overflowY = 'hidden'
  show.value = true
  setTimeout(() => {
    imgWidth.value = area.value?.offsetWidth as number
    imgWidthOld.value = area.value?.offsetWidth as number
  })
}

function shutDown(e: Event) {
  const target = e.target as HTMLElement
  if (feature.value?.contains(target) || area.value?.contains(target)) {
    return false
  }
  show.value = false
  document.documentElement.style.overflowY = 'auto'
}

//全屏
function fullScreen() {
  imgWidth.value = window.innerWidth
}

//原始比例
function originalProportion() {
  imgWidth.value = imgWidthOld.value
}

//放大缩小
function zoomInOn(opa: boolean) {
  if ((imgWidth.value > window.innerWidth && opa) || (imgWidth.value < 230 && !opa)) {
    return false
  }
  opa ? (imgWidth.value += 100) : (imgWidth.value -= 100)
}
</script>
