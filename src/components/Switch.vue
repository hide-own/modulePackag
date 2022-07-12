<template>
  <Switch v-model:value="switchValue" checked="开" unchecked="关"/>

  <pre>
    Switch                  标签
    - v-model:value         响应数据值
    - checked               选中显示值
    - unchecked             关闭显示值

    @change                 发生改变的事假
  </pre>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Switch} from '@/modulePackag'

const switchValue = ref<boolean>(false)
</script>
