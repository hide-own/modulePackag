<template>
  <div ref="calendar" class='relative'>
    <input type="text"
           placeholder="前选择日期"
           @focus="visible=true"
           :value="current"
           class="mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
    <div class="w-80 h-96 bg-white absolute z-10 top-12 shadow-md px-6 py-4" v-if="visible">
      <div class="flex justify-between items-center">
        <div @click="changeYear(true)" class="text-2xl w-8 rounded text-center bg-white hover:bg-gray-200 cursor-pointer">‹‹</div>
        <div @click="changeMonth(true)" class="text-2xl w-8 rounded text-center bg-white hover:bg-gray-200 cursor-pointer">‹</div>
        <span>{{ year }}-{{ month }}</span>
        <div @click="changeMonth(false)" class="text-2xl w-8 rounded text-center bg-white hover:bg-gray-200 cursor-pointer">›</div>
        <div @click="changeYear(false)" class="text-2xl w-8 rounded text-center bg-white hover:bg-gray-200 cursor-pointer">››</div>
      </div>
      <div class="flex justify-between text-gray-500 my-3">
        <span class="w-10 text-center" v-for="week in weeks" :key="week">{{ week }}</span>
      </div>
      <div>
        <div class="flex justify-between " v-for="(row,i) in getDays" :key="`${row}-${i}`">
          <div v-for="(cell,j) in row"
               @click="onClickDay(cell)"
               :class="['cursor-pointer w-10 h-10 text-center hover:bg-gray-200 leading-10 rounded-full',dayClasses(cell)]"
               :key="`${cell}-${j}`">
            {{ cell.date[2] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {cloneDate, getCurrentMonthLastDay, getPrevMonthLastDay, getYearMonthDay, toMatrix} from './methods';
import {computed, ref, onMounted, onBeforeUnmount} from "vue";

const props = defineProps<{
  value: string
}>()



const weeks = ref<string[]>(['一', '二', '三', '四', '五', '六', '日'])
const visible = ref<boolean>(false)
const emit = defineEmits(['update:value'])


const calendar = ref<HTMLElement | null>(null)

function onClickBody(e) {
  // 过滤掉弹出层和日期选择器内的元素
  if (calendar.value?.contains(e.target)) {
    return false
  }
  visible.value = false;
}

onMounted(() => {
  document.body.addEventListener('click', onClickBody);
})

onBeforeUnmount(() => {
  document.body.removeEventListener('click', onClickBody);
})


//定义年月
let year = ref<number>(0),
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
const current = computed<string>(() => {
  return props.value
})

//获取渲染
const getDays = computed(() => {
  // 0 ~ 6, 需要将0转换为7
  let startWeek = new Date(year.value, month.value - 1, 1).getDay();
  if (startWeek === 0) {
    startWeek = 7;
  }

  //获取上月最后一天
  const prevLastDay = getPrevMonthLastDay(year.value, month.value - 1);

  //获取当月最后一天
  const curLastDay = getCurrentMonthLastDay(year.value, month.value);
  const days:getPrevMonthDaysType[] = [...getPrevMonthDays(prevLastDay, startWeek), ...getCurrentMonthDays(curLastDay), ...getNextMonthDays(curLastDay, startWeek)];
  return toMatrix(days, 7);
})


//改变月
function changeMonth(value) {
  if (value) {
    month.value -= 1
  } else {
    month.value += 1
  }
}

//改变年
function changeYear(value) {
  if (value) {
    year.value -= 1
  } else {
    year.value += 1
  }
}

//加入calss类
function dayClasses(cell) {
  return {
    prev: cell.status === 'prev',
    next: cell.status === 'next',
    active: isSameDay(cell.date, new Date()),
    today: isToday(cell.date)
  };
}

//改变日期
function onClickDay(cell) {
  month.value = cell.date[1]
  emit('update:value', cell.date.join('-'))
}

//今天日期
function isSameDay(date1, date2) {
  const [y2, m2, d2] = getYearMonthDay(date2);
  return date1[0] === y2 && date1[1] === m2 + 1 && date1[2] === d2;
}

//选择日期
function isToday(date) {
  const currentToday = JSON.parse(JSON.stringify(current.value))
  const [y, m, dy] = currentToday.split('-')

  return date[0] == y && date[1] == m && date[2] == dy;
}


//获取上个月天数
function getPrevMonthDays(prevLastDay, startWeek) {
  const prevMonthDays:getPrevMonthDaysType[] = [];
  for (let i = prevLastDay - startWeek + 2; i <= prevLastDay; i++) {
    prevMonthDays.push({
      date: [year.value, month.value - 1, i],
      status: 'prev'
    });
  }
  return prevMonthDays;
}

//这个月天数
function getCurrentMonthDays(curLastDay) {
  const curMonthDays:getPrevMonthDaysType[] = [];
  for (let i = 1; i <= curLastDay; i++) {
    curMonthDays.push({
      date: [year.value, month.value, i],
      status: 'current'
    });
  }
  return curMonthDays;
}

//下个月天数
function getNextMonthDays(curLastDay, startWeek) {
  const nextMonthDays:getPrevMonthDaysType[] = [];
  for (let i = 1; i <= 43 - startWeek - curLastDay; i++) {
    nextMonthDays.push({
      date: [year.value, month.value + 1, i],
      status: 'next'
    });
  }
  return nextMonthDays;
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
