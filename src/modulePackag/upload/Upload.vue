<template>
  <div class="flex flex-wrap">
    <div v-for="val in fileList" :key="val" class="relative">
      <img :src="val" alt="" class="w-20 h-20 mr-3 mb-3" />
      <XCircleIcon
        class="w-6 h-6 absolute top-[-10px] right-0 hover:text-red-500"
        @click="del(val)"
      />
    </div>
    <div
      class="cursor-pointer w-20 h-20 border border-gray-400 border-dashed flex items-center bg-gray-100"
      @click="show = true"
    >
      <div class="text-center w-full">
        <PlusIcon class="w-4 h-4 mx-auto" />
      </div>
    </div>
  </div>
  <Modal v-model:visible="show" title="选择图片" footer width="1100">
    <Content @use-img="use" />
  </Modal>
</template>

<script lang="ts" setup>
import { PlusIcon, XCircleIcon } from '@heroicons/vue/solid'
import { computed, ref } from 'vue'
import { Modal } from '@/modulePackag'
import Content from './Content.vue'

/**
 * radio 单选还是多选
 * fileList 图片列表
 */
const props = defineProps<{
  radio: boolean
  fileList: string[]
}>()

const emit = defineEmits(['update:fileList'])
const fileList = computed({
  get() {
    return props.fileList
  },
  set(val) {
    emit('update:fileList', val)
  }
})
const show = ref<boolean>(false)

function use(e: string[]) {
  fileList.value.push(...e)
  show.value = false
}

//删除图片
function del(val: string) {
  const index = fileList.value.indexOf(val)
  fileList.value.splice(index, 1)
}
</script>
