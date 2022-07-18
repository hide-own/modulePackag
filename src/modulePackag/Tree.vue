<template>
  <div class="w-full">
    <div class="w-full rounded text-gray-300 text-gray-600">
      <div
        :class="['py-2 hover:bg-gray-100 flex w-full text-left text-sm font-medium', size]"
        @click="change(data[valueKey])"
        @mouseleave="showMenu = false"
      >
        <div :class="[iconWidth]">
          <slot name="icon" :open="open">
            <ChevronRightIcon
              v-if="data.children?.length > 0"
              :class="open ? 'rotate-90 transform' : ''"
              class="h-full text-gray-500"
            />
          </slot>
        </div>
        <div class="flex-1 pr-5">
          <slot name="title" />
          <div v-if="menu" class="float-right relative">
            <DotsHorizontalIcon class="w-4 h-4 float-right" @click.stop="showMenu = true" />
            <div
              v-if="showMenu"
              class="shadow-md w-20 text-center bg-white rounded-md z-10 absolute top-[-7px] right-0"
            >
              <slot :data="data" name="menu" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="data.children?.length > 0 && open">
        <Tree
          v-for="val in data.children"
          :key="val.id"
          :menu="menu"
          :value-key="valueKey"
          :data="val"
          @change="$emit('change', $event)"
        >
          <template #title>
            <slot name="children" :children="val">
              <span class="pl-4">{{ val?.name }}</span>
            </slot>
          </template>
          <template #menu>
            <slot :data="val" name="menu" />
          </template>
        </Tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/vue/solid'
import { Tree } from '@/modulePackag'
import { computed, ref } from 'vue'

const emit = defineEmits(['change'])
const props = withDefaults(
  defineProps<{
    data: unknown
    size?: 'xl' | 'md' | 'xs'
    valueKey?: string
    menu?: boolean
  }>(),
  {
    size: 'md'
  }
)

const open = ref<boolean>(false)
const showMenu = ref<boolean>(false)

const size = computed<string>(() => {
  switch (props.size) {
    case 'xs':
      return 'text-xs'
    case 'md':
      return 'text-md'
    case 'xl':
      return 'text-xl'
  }
  return ''
})

const iconWidth = computed<string>(() => {
  switch (props.size) {
    case 'xs':
      return 'w-4'
    case 'md':
      return 'w-5 h-5'
    case 'xl':
      return 'w-6 h-6'
  }
  return ''
})

function change(value: unknown) {
  open.value = !open.value
  emit('change', { value, open: open.value })
}
</script>
