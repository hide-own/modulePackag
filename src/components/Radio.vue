<template>
  <RadioGroup v-model:value="RadioGroupValue">
    <Radio v-for="val in plans" :key="val.name" :value="val.name">
      <template #checkbox="{ selected }"> {{ val.name }}--{{ selected }} </template>
    </Radio>
  </RadioGroup>

  <pre>
    RadioGroup          单选框组
    - v-model:value     数据响应 string | number | null | undefined | object

    @change             发生改变的事件(选中的value值)

    Radio               单选值
    - value             响应数据值
    默认插槽              显示数据
    #checkbox            选中插槽(#checkbox="{selected:boolean})
  </pre>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RadioGroup, Radio } from '@/modulePackag'

const RadioGroupValue = ref<string>('Business')
const plans = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk'
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk'
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk'
  }
]
</script>
