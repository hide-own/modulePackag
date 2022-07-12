<template>
    <CheckboxGroup v-model:value="checked" :multiple="false">
      <Checkbox :value="val" v-for="val in 3">
          <template #checkbox="{selected}">
            {{val}}{{selected}}
          </template>
      </Checkbox>
    </CheckboxGroup>

  <CheckboxGroup v-model:value="checked2" multiple>
    <Checkbox :value="val" v-for="val in 3">{{ val }}</Checkbox>
  </CheckboxGroup>


  <pre>
    CheckboxGroup          复选框标签
    - v-model:value        响应数据值
    - multiple             开启复选 boolean

    Checkbox               复选框属性值
    - value                响应数据
    - 插槽                  显示值
    - #checkbox             自定义插槽(#checkbox="{selected}") 显示是否选中
  </pre>
</template>

<script lang="ts" setup>
import {CheckboxGroup,Checkbox} from '@/modulePackag'
import {ref} from "vue";

const checked = ref<number>(1)
const checked2 = ref<number[]>([2])

</script>
