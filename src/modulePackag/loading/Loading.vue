<template>
  <div v-if="isShow" class="loading w-full h-full">
    <div class="animate-spin">
      <svg
        x="1657244826391"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2274"
        width="20"
        height="20"
      >
        <path
          d="M827.211075 221.676536m-54.351151 0a54.351151 54.351151 0 1 0 108.702302 0 54.351151 54.351151 0 1 0-108.702302 0Z"
          p-id="2275"
          fill="#1296db"
        ></path>
        <path
          d="M940.905298 515.399947m-67.086951 0a67.086952 67.086952 0 1 0 134.173903 0 67.086952 67.086952 0 1 0-134.173903 0Z"
          p-id="2276"
          fill="#1296db"
        ></path>
        <path
          d="M829.755035 810.595334m-78.974766 0a78.974766 78.974766 0 1 0 157.949532 0 78.974766 78.974766 0 1 0-157.949532 0Z"
          p-id="2277"
          fill="#1296db"
        ></path>
        <path
          d="M534.831643 928.64149m-91.48657 0a91.486571 91.486571 0 1 0 182.973141 0 91.486571 91.486571 0 1 0-182.973141 0Z"
          p-id="2278"
          fill="#1296db"
        ></path>
        <path
          d="M243.780191 805.955407m-101.902408 0a101.902408 101.902408 0 1 0 203.804816 0 101.902408 101.902408 0 1 0-203.804816 0Z"
          p-id="2279"
          fill="#1296db"
        ></path>
        <path
          d="M536.623615 107.870315m-107.854315 0a107.854315 107.854315 0 1 0 215.70863 0 107.854315 107.854315 0 1 0-215.70863 0Z"
          p-id="2280"
          fill="#1296db"
        ></path>
        <path
          d="M243.780191 224.220497m-107.854315 0a107.854315 107.854315 0 1 0 215.70863 0 107.854315 107.854315 0 1 0-215.70863 0Z"
          p-id="2281"
          fill="#1296db"
        ></path>
        <path
          d="M129.429978 512.008m-102.766395 0a102.766394 102.766394 0 1 0 205.532789 0 102.766394 102.766394 0 1 0-205.532789 0Z"
          p-id="2282"
          fill="#1296db"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: false
  }
)

const isShow = ref<boolean>(props.show)

watch(
  props,
  (newValue) => {
    isShow.value = newValue.show
  },
  { deep: true }
)

const show = () => {
  isShow.value = true
}
const hide = () => {
  isShow.value = false
}

defineExpose({
  isShow,
  show,
  hide
})
</script>

<style scoped lang="less">
.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
