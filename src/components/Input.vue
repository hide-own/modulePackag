<template>
  <KInput placeholder="默认值" name="12" v-model:modelValue="InputValue"/>
  <pre>
    KInput                 标签

    - placeholder            占位符
    - name                   输入框名
    - v-model:modelValue     响应数据 string | null | undefined,

    @change                发生改变
  </pre>

  <InputNumber placeholder="默认值" v-model:modelValue="InputNumberValue"/>
  <pre>
    InputNumber            标签

    - placeholder          占位符
    - v-model:modelValue   响应数据 number | null
  </pre>


  <KTextarea placeholder="文本区" v-model:value="TextareaValue"/>
  <pre>
    KTextarea               标签

    - placeholder             占位符
    - v-model:value           响应数据 string | number | undefined
  </pre>
</template>

<script lang="ts" setup>
import {InputNumber, KInput, KTextarea} from "@/modulePackag";
import {ref} from "vue";

const InputValue = ref<string>('212121')
const InputNumberValue = ref<number>(123456)
const TextareaValue = ref<string>('复选框')
</script>
