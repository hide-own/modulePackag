<template>
  <KButton disabled>按钮</KButton>
  <KButton type="success">按钮</KButton>
  <KButton type="warning">按钮</KButton>
  <KButton type="info">按钮</KButton>
  <pre class="mt-10">

    Kbutton     标签
    - type          "normal":默认灰色 | "success":绿色 | "warning":红色 | "info":蓝色
    - disabled       禁用
    - 插槽            按钮文字
  </pre>
</template>

<script lang="ts" setup>
import { KButton } from '@/modulePackag'
</script>
