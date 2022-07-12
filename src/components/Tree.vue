<template>
  <Tree menu @change="treeChange(val,$event)" v-for="val in category" :key="val.id" :data="val" valueKey="id">
    <template #title>
      <span>{{ val.name }}</span>
    </template>
    <template #children="{children}">
      <span class="pl-4">子元素-{{ children.name }}</span>
    </template>
    <template #menu="{data}">
      {{ data }}
      <div class="py-2 hover:bg-gray-200" @click="addSort(data.id)" v-if="data.pid===0">添加分类</div>
      <div class="py-2 hover:bg-gray-200" @click="modifySort(data.id)">编辑分类</div>
      <div class="py-2 hover:bg-gray-200" @click="delSort(data.id)">删除分类</div>
    </template>
  </Tree>


  <pre>
    Tree                          标签
    - menu                        开启菜单
    - data                        当前数据
    - valueKey                    响应数据
    - size                        大小 xl | md | sm

    #title                        标题行内容
    #children                     子元素标题行内容 默认name | (#children="{children}")
    #menu                         自定义菜单内容 (#menu="{data}") data 当前数据
    #icon                         图标插槽 (#icon='{open}') open:boolean 是否展开行

    @change                       {value:根据valueKey来,open:打开状态}
  </pre>
</template>

<script lang="ts" setup>
import {Tree} from '@/modulePackag'
import {reactive} from "vue";


//分类选择的id
function treeChange(val: any, id: number) {
  setTimeout(() => {
    val.children = [{"id": 11, "pid": 0, "name": "西瓜", "enname": "", "title": "装修图片", "children": []}]
  }, 1000)
  console.log(id)
}

const category = reactive<any[]>([
  {
    "id": 1, "pid": 0, "name": "装修图片", "enname": "", "title": "装修图片",
    "children": [{"id": 11, "pid": 0, "name": "西瓜", "enname": "", "title": "装修图片", "children": []},
      {"id": 12, "pid": 0, "name": "苹果", "enname": "", "title": "装修图片", "children": []}],
    "loading": false
  },
  {"id": 3, "pid": 0, "name": "口罩", "enname": "", "title": "口罩", "children": [], "loading": false},
  {"id": 10, "pid": 0, "name": "防护服", "enname": "", "title": "防护服", "children": []},
  {"id": 11, "pid": 0, "name": "保健食品", "enname": "", "title": "保健食品", "children": [], "loading": false},
  {"id": 21, "pid": 0, "name": "汤臣倍健", "enname": "", "title": "汤臣倍健", "children": [], "loading": false},
  {"id": 24, "pid": 0, "name": "日用品", "enname": "", "title": "日用品", "children": [], "loading": false},
  {"id": 27, "pid": 0, "name": "体温计", "enname": "", "title": "体温计", "children": [], "loading": false},
  {"id": 34, "pid": 0, "name": "医疗器械", "enname": "", "title": "医疗器械", "children": [], "loading": false},
  {"id": 39, "pid": 0, "name": "化妆品类", "enname": "", "title": "化妆品类", "children": [], "loading": false},
  {"id": 45, "pid": 0, "name": "计生用品", "enname": "", "title": "计生用品", "children": [], "loading": false},
  {"id": 49, "pid": 0, "name": "其他QS类", "enname": "", "title": "其他QS类", "children": [], "loading": false},
  {"id": 52, "pid": 0, "name": "个人护理", "enname": "", "title": "个人护理", "children": [], "loading": false},
  {"id": 67, "pid": 0, "name": "消毒", "enname": "", "title": "消毒", "children": []},
  {"id": 68, "pid": 0, "name": "驱蚊虫产品", "enname": "", "title": "驱蚊虫产品", "children": []},
  {"id": 69, "pid": 0, "name": "冬季热销", "enname": "", "title": "冬季热销", "children": []},
  {"id": 70, "pid": 0, "name": "花茶", "enname": "", "title": "花茶", "children": []}
])

//添加分类
function addSort(id: number) {
  console.log(id)
}

//修改分类
function modifySort(id: number) {
  console.log(id)
}

//删除分类
function delSort(id: number) {
  console.log(id)
}
</script>
