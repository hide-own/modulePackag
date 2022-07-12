<template>
    <KButton type="info" @click="modalShow = true">对话框</KButton>
    <Modal v-model:visible="modalShow"
           :title="'我是标题啦啦啦'"
           :width="440"
           @ok="modalFooter"
           @cancel="modalFooter">
      <div>111212</div>
    </Modal>

  <pre>
    Modal                     标签
    - v-model:visible         显示数据
    - title                   标题
    - width                   宽度

    @ok                       确定回调
    @cancel                   取消回调

    插槽                       数据内容
  </pre>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {KButton,Modal} from '@/modulePackag'

let modalShow = ref<boolean>(false)

function modalFooter() {
  console.log(12)
}

</script>
