<template>
  <span>{{ old }}</span>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  value: number
}>()
const old = ref<number>(props.value)

const value = computed(() => {
  return props.value
})
let num: number,
  time: number,
  lang: NodeJS.Timeout | null = null

watch(value, () => {
  // +-
  if (value.value > old.value) {
    num = 1
    time = 1000 / (value.value - old.value)
  } else {
    num = -1
    time = 1000 / (old.value - value.value)
  }

  const oldInt = Math.trunc(old.value)
  const point = String(value.value).split('.')[1]

  if (point) {
    old.value = Number(oldInt + '.' + point)
  } else {
    old.value = Number(String(old.value).split('.')[0])
  }

  lang = setInterval(() => {
    if (old.value === value.value) {
      return clearInterval(lang!)
    }
    old.value = num + old.value
  }, time)
})
</script>
