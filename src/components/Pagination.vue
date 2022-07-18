<template>
  <KPagination v-model:current="params.page" :total="600" :page-size="params.limit" />

  <pre>
    KPagination             标签
    - total                 总页数
    - v-model:current       当前页数
    - page-size             一页数量
  </pre>
</template>

<script lang="ts" setup>
import { KPagination } from '@/modulePackag'

import { reactive } from 'vue'

const params = reactive<{
  page: number
  limit: number
  rule_name: string
}>({
  page: 2,
  limit: 10,
  rule_name: ''
})
</script>
