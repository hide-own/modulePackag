<template>
  <Collapse v-for="val in 3" :key="val" header="我的标头">
    <div>11211</div>
    <div>11211</div>
  </Collapse>

  <pre>
    Collapse          标签
    - header          头部

    插槽               展开内容

  </pre>
</template>

<script lang="ts" setup>
import { Collapse } from '@/modulePackag'
</script>
