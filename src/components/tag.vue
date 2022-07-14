<template>
  <KTag :value="tag"/>

  <KTag v-for="val in arr" :value="val" @del="del"/>

  <pre>
    KTag         标签
    - value      响应数据值 和 显示数据值
    插槽          显示数据值

    @del         删除事件 (value)
  </pre>
</template>

<script lang="ts" setup>
import {KTag} from '@/modulePackag'
import {ref} from "vue";

const tag = ref<string>('西瓜')

const arr = ref<any[]>([1, 2, 3, 4, 5, 6, 7, 8, 9])

function del(val: number) {
  console.log(val)
  // arr.value.remover(val)
}

</script>
