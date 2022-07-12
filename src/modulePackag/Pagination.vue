<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
    <div class="flex-1 flex justify-between sm:hidden">
      <div
          @click="changePage(current-1)"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        上一页
      </div>
      <div
          class="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        {{ current }}/{{ article }}
      </div>
      <div
          @click="changePage(current+1)"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        下一页
      </div>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          共<span class="font-medium">{{ total }}</span>条 - {{ pageSize }}页/条
        </p>
      </div>
      <div>
        <nav class="cursor-pointer relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <div
              @click="changePage(current-1)"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">上一页</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true"/>
          </div>

          <!--    前      -->
          <div
              @click="foreAft(1)"
              :class="['relative inline-flex px-4 py-2 border  text-sm font-medium items-cente',
                 current === 1?'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 r':'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']">
            <span>1</span>
          </div>
          <div
              v-if="article > 6 && before"
              @click="unfold(true)"
              class="relative inline-flex px-4 py-2 border  text-sm font-medium items-cente bg-white border-gray-300 text-gray-500 hover:bg-gray-50">
            ...
          </div>

          <!--    中      -->
          <div
              v-for="val in fold"
              :key="val"
              @click="changePage(val)"
              :class="['relative inline-flex px-4 py-2 border  text-sm font-medium items-cente',
                 current === val?'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 r':'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']">
            {{ val }}
          </div>

          <!--    后      -->
          <div
              v-if="after"
              @click="unfold(false)"
              class="relative inline-flex px-4 py-2 border  text-sm font-medium items-cente bg-white border-gray-300 text-gray-500 hover:bg-gray-50">
            ...
          </div>
          <div
              v-if="article !== 1"
              @click="foreAft(article)"
              :class="['relative inline-flex px-4 py-2 border  text-sm font-medium items-cente',
                 current === article?'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 r':'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']">
            {{ article }}
          </div>


          <div
              @click="changePage(current+1)"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">下一页</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true"/>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/solid'
import {ref, watch} from "vue";

const emit = defineEmits(['update:current','change'])


/**
 * @props total:总页数
 * @props current:当前选中页数
 * @props pageSize:一页限制多少条数据
 */
const props = withDefaults(defineProps<{
  total: number,
  current?: number,
  pageSize?: number
  loading?:boolean,
}>(), {
  pageSize: 10,
  current: 1,
  loading:false
})

let total = ref<number>(props.total)
let current = ref<number>(props.current)
let pageSize = ref<number>(props.pageSize)

watch(() => props.current, v => current.value = v)

//目录数
let article = ref<number>(Math.ceil(total.value / pageSize.value))

//分页折叠
let fold = ref<number[]>([])


//折叠
let before = ref<boolean>(true),
    after = ref<boolean>(true)

if (article.value <= 5) {
  fold.value = Array.from(new Array(article.value).keys()).slice(2)
} else {
  fold.value = Array.from(new Array(6).keys()).slice(2)
}

//初始化折叠
function info() {
  before.value = current.value > 4
  after.value = current.value < article.value && fold.value[fold.value.length - 1] + 1 < article.value
}

info()

//点击分页
function changePage(val: number) {
  if (val < 1 || val > article.value) return

  //+
  if (val >= fold.value[2] && fold.value[fold.value.length - 1] + 1 < article.value && val + 1 > 5) {
    fold.value.forEach((value, index) => {
      fold.value[index] += 1
    })
  } else if (val <= fold.value[1] && fold.value[1] - 1 !== 2) {
    //-
    fold.value.forEach((value, index) => {
      fold.value[index] -= 1
    })
  }

  emit('update:current', val)
  emit('change', val)
  // current.value = val as number
  info()
}

//点击扩展
function unfold(before: boolean) {
  let num = ref<number>(0)
  if (before) {
    if (fold.value[0] - 5 < 2) {
      num.value = fold.value[0] - 2
    } else {
      num.value = 5
    }
    fold.value.forEach((value, index) => {
      fold.value[index] -= num.value
    })

  } else {
    if (fold.value[fold.value.length - 1] + 5 < article.value) {
      num.value = 5
    } else {
      num.value = article.value - fold.value[fold.value.length - 1] - 1
    }
    fold.value.forEach((value, index) => {
      fold.value[index] += num.value
    })
  }


  emit('update:current', fold.value[2])
  emit('change', fold.value[2])
  current.value = fold.value[2] as number
  info()
}

//点击首尾
function foreAft(val: number) {
  let num = 0,
      getRidOf = 2
  if (article.value > 6) {
    num = val === 1 ? 6 : val
    getRidOf = val === 1 ? 2 : val - 4
  }

  fold.value = Array.from(new Array(num).keys()).slice(getRidOf)
  emit('update:current', val)
  emit('change', val)
  current.value = val as number
  info()
}
</script>
