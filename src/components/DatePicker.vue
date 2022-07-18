<template>
  <DatePicker v-model:value="day" />

  <pre>
    DatePicker         标签

    - v-model:value    日期数据 string | null
  </pre>
</template>

<script lang="ts" setup>
import { DatePicker } from '@/modulePackag'
import { ref } from 'vue'

const day = ref<string>('2022-6-28')
</script>
