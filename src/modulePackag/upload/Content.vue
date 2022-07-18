<template>
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/4 px-3 border-r-2 border-gray-200">
      <KInput placeholder="请输入分类名" class="mb-3" @change="search" />
      <div class="overflow-auto h-[50vh] scrollbar">
        <!--    全部图片    -->
        <Tree :data="menuFirst" menu>
          <template #title>
            <span class="text-blue-400">全部图片</span>
          </template>
          <template #menu>
            <div class="py-2 hover:bg-gray-200">添加分类</div>
          </template>
        </Tree>
        <!--    明细分类    -->
        <Tree
          v-for="(val, index) in searchValue ?? category"
          :key="index + '-' + val.id"
          menu
          :data="val"
          @change="treeChange"
        >
          <template #title>
            <span>{{ val.name }}</span>
          </template>
          <template #menu="data">
            <div v-if="data.data.pid === 0" class="py-2 hover:bg-gray-200" @click="addSort(val.id)">
              添加分类
            </div>
            <div class="py-2 hover:bg-gray-200" @click="modifySort(val.id)">编辑分类</div>
            <div class="py-2 hover:bg-gray-200" @click="delSort(val.id)">删除分类</div>
          </template>
        </Tree>
      </div>
    </div>

    <div class="w-full md:w-3/4 px-3">
      <ImageGroup :sort-id="sortId" @use-img="$emit('useImg', $event)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { KInput, Tree } from '@/modulePackag'
import { reactive, ref } from 'vue'
import ImageGroup from './ImageGroup.vue'

const emit = defineEmits(['useImg'])

//左侧导航数据
interface CategoryType {
  id: number
  pid: number
  name: string
  enname: string
  title: string
  children: CategoryType[]
  loading?: boolean
}

const category = reactive<CategoryType[]>([
  {
    id: 1,
    pid: 0,
    name: '装修图片',
    enname: '',
    title: '装修图片',
    children: [
      { id: 1, pid: 0, name: '西瓜', enname: '', title: '装修图片', children: [] },
      { id: 1, pid: 0, name: '苹果', enname: '', title: '装修图片', children: [] }
    ],
    loading: false
  },
  { id: 3, pid: 0, name: '口罩', enname: '', title: '口罩', children: [], loading: false },
  { id: 10, pid: 0, name: '防护服', enname: '', title: '防护服', children: [] },
  { id: 11, pid: 0, name: '保健食品', enname: '', title: '保健食品', children: [], loading: false },
  { id: 21, pid: 0, name: '汤臣倍健', enname: '', title: '汤臣倍健', children: [], loading: false },
  { id: 24, pid: 0, name: '日用品', enname: '', title: '日用品', children: [], loading: false },
  { id: 27, pid: 0, name: '体温计', enname: '', title: '体温计', children: [], loading: false },
  { id: 34, pid: 0, name: '医疗器械', enname: '', title: '医疗器械', children: [], loading: false },
  { id: 39, pid: 0, name: '化妆品类', enname: '', title: '化妆品类', children: [], loading: false },
  { id: 45, pid: 0, name: '计生用品', enname: '', title: '计生用品', children: [], loading: false },
  { id: 49, pid: 0, name: '其他QS类', enname: '', title: '其他QS类', children: [], loading: false },
  { id: 52, pid: 0, name: '个人护理', enname: '', title: '个人护理', children: [], loading: false },
  { id: 67, pid: 0, name: '消毒', enname: '', title: '消毒', children: [] },
  { id: 68, pid: 0, name: '驱蚊虫产品', enname: '', title: '驱蚊虫产品', children: [] },
  { id: 69, pid: 0, name: '冬季热销', enname: '', title: '冬季热销', children: [] },
  { id: 70, pid: 0, name: '花茶', enname: '', title: '花茶', children: [] }
])

const menuFirst = ref<CategoryType>({
  id: 0,
  pid: 0,
  name: '全部图片',
  enname: '',
  title: '全部图片',
  children: []
})

//搜索的得出的结果
const searchValue = ref<CategoryType[]>()

//提取公共的搜索方法
function toFindThe(match: CategoryType[], value: string | number): CategoryType | undefined {
  for (const item of match) {
    if (item.name === value) return item
    if (item.children.length > 0) {
      const find = toFindThe(item.children, value)
      if (find) {
        return find
      }
    }
  }
}

//input的change事件
function search(value: string | number) {
  if (value === '') {
    return (searchValue.value = undefined)
  }
  const find = toFindThe(category, value)
  if (find) {
    searchValue.value = [find]
  }
}

const sortId = ref<number | string | null>(null)

//分类选择的id
function treeChange(id: number) {
  sortId.value = id
}

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
