<template>
  <Statistic v-model:value="num"/>
</template>

<script lang="ts" setup>
import {Statistic} from "@/modulePackag"
import {ref} from "vue";

let num = ref(100)


setTimeout(() => {
  num.value = 0
}, 1000)
</script>
