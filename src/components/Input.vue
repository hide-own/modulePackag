<template>
  <KInput v-model:modelValue="InputValue" placeholder="默认值" name="12" />
  <pre>
    KInput                 标签

    - placeholder            占位符
    - name                   输入框名
    - v-model:modelValue     响应数据 string | null | undefined,

    @change                发生改变
  </pre>

  <InputNumber v-model:modelValue="InputNumberValue" placeholder="默认值" />
  <pre>
    InputNumber            标签

    - placeholder          占位符
    - v-model:modelValue   响应数据 number | null
  </pre>

  <KTextarea v-model:value="TextareaValue" placeholder="文本区" />
  <pre>
    KTextarea               标签

    - placeholder             占位符
    - v-model:value           响应数据 string | number | undefined
  </pre>
</template>

<script lang="ts" setup>
import { InputNumber, KInput, KTextarea } from '@/modulePackag'
import { ref } from 'vue'

const InputValue = ref<string>('212121')
const InputNumberValue = ref<number>(123456)
const TextareaValue = ref<string>('复选框')
</script>
