<template>
  <TabGroup v-model:value="tabValue">
    <Tab v-for="val in 6" :key="val" :value="val">{{ val }}</Tab>
  </TabGroup>

  <pre>
    TabGroup                标签组
    - v-model:value         响应数据

    Tab                     标签
    - value                 数据响应值
    插槽                     显示值
  </pre>
</template>

<script lang="ts" setup>
import { TabGroup, Tab } from '@/modulePackag'
import { ref } from 'vue'

const tabValue = ref<number>(2)
</script>
