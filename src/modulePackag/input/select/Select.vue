<template>
  <div ref="select"
       class="relative w-72 inline-block">
    <div
      @click="optionShow = !optionShow"
      class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span class="block">
          <template v-if="selected.length">
              <template v-if="multiple">
                  <KTag v-for="val in label" :value="val" @del="del">{{ val.label }}</KTag>
              </template>
            <span v-else class="text-sm mx-3">{{ selected[0].label }}</span>
          </template>
          <span class="text-gray-400" v-else>{{ placeholder }}</span>
        </span>
      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </span>
    </div>

    <transition
      v-show="optionShow"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <ul
        class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <slot/>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {SelectorIcon} from '@heroicons/vue/solid'
import {computed, onBeforeUnmount, onMounted, provide, reactive, ref} from "vue";
import {Selected, Value, SelectedLabel} from "./types";
import {KTag} from '@/modulePackag'


const props = withDefaults(defineProps<{
  value: Selected
  multiple?: boolean
  placeholder?: string
}>(), {
  multiple: false
})


const emit = defineEmits<{
  (event: 'change', value: Selected): void
  (event: 'update:value', value: Selected): void
}>()

const select = ref<HTMLElement | null>(null)
const optionShow = ref<boolean>(false)


//选中对象组
const label = reactive<SelectedLabel[]>([])
const selected = computed<SelectedLabel[]>({
  get() {
    label.splice(0,label.length)
    return resetSelected(props.value, label)
  },
  set(val: SelectedLabel[]) {
    const res = choose(val[0], label)
    emit('change', val[0].value)
    emit('update:value', res)
  }
})

provide<Selected>('selected', selected)

//初始化
function resetSelected(selected: Selected, label: SelectedLabel[]): SelectedLabel[] {
  if (selected === undefined) {

  } else if (props.multiple) {
    if (Array.isArray(selected)) {
      selected.map((item: Value) => {
        label.push({value: item, label: ''})
      })
    } else {
      label.push({value: selected, label: ''})
    }
  } else if (Array.isArray(selected)) {
    console.warn('单选模式请勿使用数组')
    if (selected.length) {
      label.splice(0, label.length, {value: selected[0], label: ''})
    }
  } else {
    label.splice(0, label.length, {value: selected, label: ''})
  }
  return label
}

//选择
function choose(option: SelectedLabel, optionGroup: SelectedLabel[]): Value {
  if (!props.multiple) {
    optionGroup.splice(0, optionGroup.length, option)
    return option.value
  } else {
    const index = optionGroup.findIndex(value => option.value === value.value)
    if (index === -1) {
      optionGroup.push(option)
    } else {
      optionGroup.splice(index, 1)
    }

    return optionGroup.map(item => item.value)
  }
}

//删除
function del(item: Value) {
  console.log(item)
}


//关闭
function onClickBody(e: any) {
  if (select.value?.contains(e.target)) {
    return false
  }
  optionShow.value = false;
}

onMounted(() => {
  window.addEventListener('click', onClickBody);
})

onBeforeUnmount(() => {
  window.removeEventListener('click', onClickBody);
})

</script>
