<template>
    <KUpload :radio="false" v-model:file-list="fileList"/>
</template>

<script lang="ts" setup>
import {KUpload} from '@/modulePackag'

import {ref} from "vue";

const fileList = ref<string[]>([
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp'
])

</script>
