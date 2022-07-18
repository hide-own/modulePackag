<template>
  <div class="flex">
    <div class="w-36 h-[100vh] overflow-auto bg-gray-900 inline-block">
      <Tree v-for="val in dem" :key="val.name" :data="val" value-key="com" @change="change">
        <template #title>
          <span>{{ val.name }}</span>
        </template>
      </Tree>
    </div>
    <div class="mx-10 my-14 bg-gray-100 rounded-md w-10/12 min-h-[100vh] inline-block p-10">
      <component :is="component"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Component, markRaw, reactive, Ref, ref } from 'vue'
import { Tree } from '@/modulePackag'
import Button from '@/components/Button.vue'
import Select from '@/components/Select.vue'
import Input from '@/components/Input.vue'
import DatePicker from '@/components/DatePicker.vue'
import checked from '@/components/Checked.vue'
import Radio from '@/components/Radio.vue'
import Switch from '@/components/Switch.vue'
import Collapse from '@/components/Collapse.vue'
import Modal from '@/components/Modal.vue'
import KImage from '@/components/KImage.vue'
import Trees from '@/components/Tree.vue'
import Pagination from '@/components/Pagination.vue'
import Tab from '@/components/Tab.vue'
import Statistic from '@/components/Statistic.vue'
import KUpload from '@/components/Upload.vue'
import tag from '@/components/tag.vue'
type Dem = {
  id: number
  name: string
  com?: Component
  children?: Dem[]
}

const dem = reactive<Dem[]>([
  {
    id: 1,
    name: '按钮',
    com: markRaw(Button)
  },
  {
    id: 22,
    name: '表单',
    children: [
      {
        id: 2,
        name: '选择器',
        com: markRaw(Select)
      },
      {
        id: 3,
        name: '输入框',
        com: markRaw(Input)
      },
      {
        id: 4,
        name: '日历',
        com: markRaw(DatePicker)
      },
      {
        id: 5,
        name: '多选框',
        com: markRaw(checked)
      },
      {
        id: 6,
        name: '单选框',
        com: markRaw(Radio)
      },
      {
        id: 7,
        name: '开关',
        com: markRaw(Switch)
      }
    ]
  },
  {
    id: 8,
    name: '下拉盒',
    com: markRaw(Collapse)
  },
  {
    id: 9,
    name: '弹窗',
    com: markRaw(Modal)
  },
  {
    id: 10,
    name: '图片',
    com: markRaw(KImage)
  },
  {
    id: 22,
    name: '图片上传',
    com: markRaw(KUpload)
  },
  {
    id: 11,
    name: '树',
    com: markRaw(Trees)
  },
  {
    id: 12,
    name: '分页',
    com: markRaw(Pagination)
  },
  {
    id: 13,
    name: '标签页',
    com: markRaw(Tab)
  },
  {
    id: 14,
    name: '数值显示',
    com: markRaw(Statistic)
  },
  {
    id: 15,
    name: '标签',
    com: markRaw(tag)
  }
])
const component = ref<Component>(dem[0].com!)

function change(com: Ref) {
  if (com.value) {
    component.value = com.value
  }
}
</script>
