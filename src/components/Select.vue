<template>
  多选：
  <KSelect v-model:value="valueSelect" placeholder="占位符" multiple>
    <KOption v-for="val in type_header" :key="val.type" :value="val.value" :label="val.name">
<!--      <template #title="{selected}">-->
<!--        {{ val.name }}++{{ selected }}-->
<!--      </template>-->
      <!--<template #icon="{selected}">
              121212{{selected}}
            </template>-->
    </KOption>
  </KSelect>

  <hr class="my-3">

  单选：
  <KSelect v-model:value="valueSelect" placeholder="占位符">
    <KOption v-for="val in type_header" :key="val.type" :value="val.value" :label="val.name">
<!--      <template #title="{selected}">-->
<!--        {{ val.name }}++{{ selected }}-->
<!--      </template>-->
      <!--<template #icon="{selected}">
              121212{{selected}}
            </template>-->
    </KOption>
  </KSelect>


  <pre class="my-10">
    KSelect          标签

    - v-model:value   响应数据
    - placeholder     占位符

    KOption          标签
    - value            响应数据
    - label            占位符(没有添加此字段,将从插槽中获取)
    #title           占位符插槽 (#title='{selected}':当前是否选中)
    #icon            图标插槽  (#icon='{selected}':当前是否选中)
  </pre>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {KOption, KSelect} from '@/modulePackag'


const valueSelect = ref(1)
const type_header = reactive<any[]>([
  {"value": 1, "name": "出售中的商品", "count": 236},
  {"value": 2, "name": "仓库中的商品", "count": 37},
  {"value": 4, "name": "已经售馨商品", "count": 35},
  {"value": 5, "name": "警戒库存商品", "count": 0},
  {"value": 6, "name": "回收站的商品", "count": 1}
])
</script>
