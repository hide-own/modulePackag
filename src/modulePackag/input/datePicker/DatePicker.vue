<template>
  <div ref="calendar" class="relative">
    <input
      type="text"
      placeholder="前选择日期"
      :value="current"
      class="mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      @focus="visible = true"
    />
    <div v-if="visible" class="w-80 h-96 bg-white absolute z-10 top-12 shadow-md px-6 py-4">
      <div class="flex justify-between items-center">
        <div
          class="text-2xl w-8 rounded text-center bg-white hover:bg-gray-200 cursor-pointer"
          @click="changeYear(true)"
        >
          ‹‹
        </div>
        <div
          class="text-2xl w-8 rounded text-center bg-white hover:bg-gray-200 cursor-pointer"
          @click="changeMonth(true)"
        >
          ‹
        </div>
        <span>{{ year }}-{{ month }}</span>
        <div
          class="text-2xl w-8 rounded text-center bg-white hover:bg-gray-200 cursor-pointer"
          @click="changeMonth(false)"
        >
          ›
        </div>
        <div
          class="text-2xl w-8 rounded text-center bg-white hover:bg-gray-200 cursor-pointer"
          @click="changeYear(false)"
        >
          ››
        </div>
      </div>
      <div class="flex justify-between text-gray-500 my-3">
        <span v-for="week in weeks" :key="week" class="w-10 text-center">{{ week }}</span>
      </div>
      <div>
        <div v-for="(row, i) in getDays" :key="`${row}-${i}`" class="flex justify-between">
          <div
            v-for="(cell, j) in row"
            :key="`${cell}-${j}`"
            :class="[
              'cursor-pointer w-10 h-10 text-center hover:bg-gray-200 leading-10 rounded-full',
              dayClasses(cell)
            ]"
            @click="onClickDay(cell)"
          >
            {{ cell.date[2] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentMonthLastDay, getPrevMonthLastDay, getYearMonthDay, toMatrix } from './methods'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { Value, GetPrevMonthDaysType, GetDays } from './index'

const props = defineProps<{
  value: Value
}>()

const weeks = ref<string[]>(['一', '二', '三', '四', '五', '六', '日'])
const visible = ref<boolean>(false)
const emit = defineEmits(['update:value'])

const calendar = ref<HTMLElement | null>(null)

function onClickBody(e: Event) {
  const target = e.target as HTMLElement
  // 过滤掉弹出层和日期选择器内的元素
  if (calendar.value?.contains(target)) {
    return false
  }
  visible.value = false
}

onMounted(() => {
  document.body.addEventListener('click', onClickBody)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('click', onClickBody)
})

//定义年月
const year = ref<number>(0),
  month = ref<number>(0),
  day = ref<number>(0)

if (props.value) {
  year.value = Number(props.value.split('-')[0])
  month.value = Number(props.value.split('-')[1])
  day.value = Number(props.value.split('-')[2])
} else {
  const [y2, m2, d2] = getYearMonthDay(new Date())
  year.value = y2
  month.value = m2 + 1
  day.value = d2
  emit('update:value', `${y2}-${m2 + 1}-${d2}`)
}

//当前选中
const current = computed<Value>(() => {
  return props.value
})

//获取渲染
const getDays = computed<GetDays[][]>(() => {
  // 0 ~ 6, 需要将0转换为7
  let startWeek = new Date(year.value, month.value - 1, 1).getDay()
  if (startWeek === 0) {
    startWeek = 7
  }

  //获取上月最后一天
  const prevLastDay = getPrevMonthLastDay(year.value, month.value - 1)

  //获取当月最后一天
  const curLastDay = getCurrentMonthLastDay(year.value, month.value)

  const days: GetPrevMonthDaysType[] = [
    ...getPrevMonthDays(prevLastDay, startWeek),
    ...getCurrentMonthDays(curLastDay),
    ...getNextMonthDays(curLastDay, startWeek)
  ]
  return toMatrix(days, 7)
})

//改变月
function changeMonth(value: boolean) {
  if (value) {
    month.value -= 1
  } else {
    month.value += 1
  }
}

//改变年
function changeYear(value: boolean) {
  if (value) {
    year.value -= 1
  } else {
    year.value += 1
  }
}

//加入calss类
function dayClasses(cell: GetDays) {
  return {
    prev: cell.status === 'prev',
    next: cell.status === 'next',
    active: isSameDay(cell.date, new Date()),
    today: isToday(cell.date)
  }
}

//改变日期
function onClickDay(cell: GetDays) {
  month.value = cell.date[1]
  emit('update:value', cell.date.join('-'))
}

//今天日期
function isSameDay(date1: number[], date2: Date) {
  const [y2, m2, d2] = getYearMonthDay(date2)
  return date1[0] === y2 && date1[1] === m2 + 1 && date1[2] === d2
}

//选择日期
function isToday(date: number[]) {
  const currentToday = JSON.parse(JSON.stringify(current.value))
  const [y, m, dy] = currentToday.split('-')

  return date[0] == y && date[1] == m && date[2] == dy
}

//获取上个月天数
function getPrevMonthDays(prevLastDay: number, startWeek: number) {
  const prevMonthDays: GetPrevMonthDaysType[] = []
  for (let i = prevLastDay - startWeek + 2; i <= prevLastDay; i++) {
    prevMonthDays.push({
      date: [year.value, month.value - 1, i],
      status: 'prev'
    })
  }
  return prevMonthDays
}

//这个月天数
function getCurrentMonthDays(curLastDay: number) {
  const curMonthDays: GetPrevMonthDaysType[] = []
  for (let i = 1; i <= curLastDay; i++) {
    curMonthDays.push({
      date: [year.value, month.value, i],
      status: 'current'
    })
  }
  return curMonthDays
}

//下个月天数
function getNextMonthDays(curLastDay: number, startWeek: number) {
  const nextMonthDays: GetPrevMonthDaysType[] = []
  for (let i = 1; i <= 43 - startWeek - curLastDay; i++) {
    nextMonthDays.push({
      date: [year.value, month.value + 1, i],
      status: 'next'
    })
  }
  return nextMonthDays
}
</script>

<style lang="less" scoped>
.prev,
.next {
  color: #adb5bd;
}

.today {
  background: #11cdef;
  color: white !important;
}

.active {
  color: #11cdef;
}
</style>
