<!--<template>-->
<!--  &lt;!&ndash;   操作按钮   &ndash;&gt;-->
<!--  <div class="flex flex-wrap">-->
<!--    <Button :type="chooseValue.length>0?'info':''"-->
<!--            :disabled="chooseValue.length!==0"-->
<!--            @click="use">使用选择图片-->
<!--    </Button>-->
<!--    <Button class="mx-3" type="info" @click="upload">上传图片</Button>-->
<!--    <Button class="mx-3"-->
<!--            :type="chooseValue.length>0?'warning':''"-->
<!--            @click="del"-->
<!--            :disabled="chooseValue.length!==0">删除图片-->
<!--    </Button>-->
<!--    <Select class="text-gray-300" v-model:value="selectValue">-->
<!--      <Option value="全部图片"/>-->
<!--      <Option v-for="val in category" :key="val.name" :value="val.name"/>-->
<!--    </Select>-->
<!--  </div>-->
<!--  &lt;!&ndash;   图片渲染   &ndash;&gt;-->
<!--  <div class="bloat flex flex-wrap mt-3">-->
<!--    <div class="w-28 mr-3 mb-3 inline-block relative" v-for="val in img" :key='val.att_id'>-->
<!--      <img class="w-[100px] h-[100px]"-->
<!--           :src="val.att_dir"-->
<!--           @click="choose(val.att_dir,val.att_id)"-->
<!--           :alt="val.real_name"-->
<!--           :title="val.real_name">-->
<!--      <div-->
<!--        class="absolute top-3 right-5 w-5 h-5 bg-red-500 text-white border border-white rounded-full text-center leading-5"-->
<!--        v-if="sub(val.att_dir)!==-1">-->
<!--        {{ sub(val.att_dir) + 1 }}-->
<!--      </div>-->
<!--      <div class="text-xs text-center leading-loose">{{ val.real_name }}</div>-->
<!--    </div>-->
<!--  </div>-->

<!--  &lt;!&ndash;  分页 &ndash;&gt;-->
<!--  <Pagination :total="600" v-model:current="params.page" :page-size="params.limit"/>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {computed, reactive, ref} from "vue";-->
<!--import {Button, Select, Option, Pagination} from "@/modulePackag";-->

<!--//分类数据-->
<!--const category = reactive<{-->
<!--  id: number;-->
<!--  pid: number;-->
<!--  name: string;-->
<!--  enname: string;-->
<!--  title: string;-->
<!--  children: any[];-->
<!--  loading?: boolean;-->
<!--}[]>(-->
<!--  [-->
<!--  {-->
<!--    "id": 1, "pid": 0, "name": "装修图片", "enname": "", "title": "装修图片",-->
<!--    "children": [{"id": 1, "pid": 0, "name": "西瓜", "enname": "", "title": "装修图片", "children": []},-->
<!--      {"id": 1, "pid": 0, "name": "苹果", "enname": "", "title": "装修图片", "children": []}],-->
<!--    "loading": false-->
<!--  },-->
<!--  {"id": 3, "pid": 0, "name": "口罩", "enname": "", "title": "口罩", "children": [], "loading": false},-->
<!--  {"id": 10, "pid": 0, "name": "防护服", "enname": "", "title": "防护服", "children": []},-->
<!--  {"id": 11, "pid": 0, "name": "保健食品", "enname": "", "title": "保健食品", "children": [], "loading": false},-->
<!--  {"id": 21, "pid": 0, "name": "汤臣倍健", "enname": "", "title": "汤臣倍健", "children": [], "loading": false},-->
<!--  {"id": 24, "pid": 0, "name": "日用品", "enname": "", "title": "日用品", "children": [], "loading": false},-->
<!--  {"id": 27, "pid": 0, "name": "体温计", "enname": "", "title": "体温计", "children": [], "loading": false},-->
<!--  {"id": 34, "pid": 0, "name": "医疗器械", "enname": "", "title": "医疗器械", "children": [], "loading": false},-->
<!--  {"id": 39, "pid": 0, "name": "化妆品类", "enname": "", "title": "化妆品类", "children": [], "loading": false},-->
<!--  {"id": 45, "pid": 0, "name": "计生用品", "enname": "", "title": "计生用品", "children": [], "loading": false},-->
<!--  {"id": 49, "pid": 0, "name": "其他QS类", "enname": "", "title": "其他QS类", "children": [], "loading": false},-->
<!--  {"id": 52, "pid": 0, "name": "个人护理", "enname": "", "title": "个人护理", "children": [], "loading": false},-->
<!--  {"id": 67, "pid": 0, "name": "消毒", "enname": "", "title": "消毒", "children": []},-->
<!--  {"id": 68, "pid": 0, "name": "驱蚊虫产品", "enname": "", "title": "驱蚊虫产品", "children": []},-->
<!--  {"id": 69, "pid": 0, "name": "冬季热销", "enname": "", "title": "冬季热销", "children": []},-->
<!--  {"id": 70, "pid": 0, "name": "花茶", "enname": "", "title": "花茶", "children": []}-->
<!--])-->

<!--//图片-->
<!--const img = reactive<{-->
<!--  att_id: number;-->
<!--  name: string;-->
<!--  att_dir: string;-->
<!--  satt_dir: string;-->
<!--  att_size: string;-->
<!--  att_type: string;-->
<!--  pid: number;-->
<!--  time: number;-->
<!--  image_type: number;-->
<!--  module_type: number;-->
<!--  real_name: string;-->
<!--}[]>(-->
<!--  [-->
<!--    {-->
<!--      "att_id": 1800,-->
<!--      "name": "0eea3e003e4341445de48034a2f4fb33.jpg",-->
<!--      "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/0eea3e003e4341445de48034a2f4fb33.jpg",-->
<!--      "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/0eea3e003e4341445de48034a2f4fb33.jpg",-->
<!--      "att_size": "0",-->
<!--      "att_type": "image\/jpeg",-->
<!--      "pid": 72,-->
<!--      "time": 1656917711,-->
<!--      "image_type": 1,-->
<!--      "module_type": 1,-->
<!--      "real_name": "活络油_02.jpg"-->
<!--    }, {-->
<!--    "att_id": 1799,-->
<!--    "name": "c5da16fb73b1767bae55b528b8a56c71.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/c5da16fb73b1767bae55b528b8a56c71.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/c5da16fb73b1767bae55b528b8a56c71.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656917583,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_04.jpg"-->
<!--  }, {-->
<!--    "att_id": 1798,-->
<!--    "name": "c230e97b57627bbe338d2091a146597c.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/c230e97b57627bbe338d2091a146597c.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/c230e97b57627bbe338d2091a146597c.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656917582,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_06.jpg"-->
<!--  }, {-->
<!--    "att_id": 1797,-->
<!--    "name": "8173445b2215e582e402367b405aa04d.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/8173445b2215e582e402367b405aa04d.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/8173445b2215e582e402367b405aa04d.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656917582,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_05.jpg"-->
<!--  }, {-->
<!--    "att_id": 1796,-->
<!--    "name": "ac9cf489e6d43c7389701fcc74302f8a.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/ac9cf489e6d43c7389701fcc74302f8a.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/ac9cf489e6d43c7389701fcc74302f8a.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656917582,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_03.jpg"-->
<!--  }, {-->
<!--    "att_id": 1795,-->
<!--    "name": "2df1c4339fc823ecccf3c4f1b362a382.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/2df1c4339fc823ecccf3c4f1b362a382.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/2df1c4339fc823ecccf3c4f1b362a382.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656917582,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_02.jpg"-->
<!--  }, {-->
<!--    "att_id": 1794,-->
<!--    "name": "1dfa84a00571b839b1013abb18d1c00b.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/1dfa84a00571b839b1013abb18d1c00b.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/1dfa84a00571b839b1013abb18d1c00b.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656916884,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_06.jpg"-->
<!--  }, {-->
<!--    "att_id": 1793,-->
<!--    "name": "2f461daddd5813d1c3a8426731619615.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/2f461daddd5813d1c3a8426731619615.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/2f461daddd5813d1c3a8426731619615.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656916884,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_02.jpg"-->
<!--  }, {-->
<!--    "att_id": 1792,-->
<!--    "name": "8e9a97acba1ad827cb6445d3baee5a6b.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/8e9a97acba1ad827cb6445d3baee5a6b.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/8e9a97acba1ad827cb6445d3baee5a6b.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656916884,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_04.jpg"-->
<!--  }, {-->
<!--    "att_id": 1791,-->
<!--    "name": "8d672c3ebda705d2a46a213fca8d9fc4.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/8d672c3ebda705d2a46a213fca8d9fc4.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/8d672c3ebda705d2a46a213fca8d9fc4.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656916884,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_01.jpg"-->
<!--  }, {-->
<!--    "att_id": 1790,-->
<!--    "name": "3bd9b195f620229914f0eaabd2fab20a.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/3bd9b195f620229914f0eaabd2fab20a.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/3bd9b195f620229914f0eaabd2fab20a.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656916884,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_03.jpg"-->
<!--  }, {-->
<!--    "att_id": 1789,-->
<!--    "name": "8ada1f1ea8dfa7388d15903eb676210c.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/8ada1f1ea8dfa7388d15903eb676210c.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/8ada1f1ea8dfa7388d15903eb676210c.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656916884,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "活络油_05.jpg"-->
<!--  }, {-->
<!--    "att_id": 1788,-->
<!--    "name": "6dcdfa51a01cc27fa36caa05f4690823.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/6dcdfa51a01cc27fa36caa05f4690823.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/6dcdfa51a01cc27fa36caa05f4690823.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656914443,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "保丽净假牙清洁_07.jpg"-->
<!--  }, {-->
<!--    "att_id": 1787,-->
<!--    "name": "f4ed5e140589e1bb2310c292ae127314.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/f4ed5e140589e1bb2310c292ae127314.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/f4ed5e140589e1bb2310c292ae127314.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656914443,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "保丽净假牙清洁_01.jpg"-->
<!--  }, {-->
<!--    "att_id": 1786,-->
<!--    "name": "41bfe11dc2c3896de79fece187f59749.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/41bfe11dc2c3896de79fece187f59749.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/41bfe11dc2c3896de79fece187f59749.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656914443,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "保丽净假牙清洁_05.jpg"-->
<!--  }, {-->
<!--    "att_id": 1785,-->
<!--    "name": "79c520ab52e76e83715ed6864822a040.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/79c520ab52e76e83715ed6864822a040.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/79c520ab52e76e83715ed6864822a040.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656914443,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "保丽净假牙清洁_02.jpg"-->
<!--  }, {-->
<!--    "att_id": 1784,-->
<!--    "name": "f561b1e70428e4f6bdb0c8327329340d.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/f561b1e70428e4f6bdb0c8327329340d.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/f561b1e70428e4f6bdb0c8327329340d.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656914443,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "保丽净假牙清洁_03.jpg"-->
<!--  }, {-->
<!--    "att_id": 1783,-->
<!--    "name": "f0af4082c66d05d7adacea6beb35d231.jpg",-->
<!--    "att_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/f0af4082c66d05d7adacea6beb35d231.jpg",-->
<!--    "satt_dir": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/07\/20220704\/f0af4082c66d05d7adacea6beb35d231.jpg",-->
<!--    "att_size": "0",-->
<!--    "att_type": "image\/jpeg",-->
<!--    "pid": 72,-->
<!--    "time": 1656914443,-->
<!--    "image_type": 1,-->
<!--    "module_type": 1,-->
<!--    "real_name": "保丽净假牙清洁_06.jpg"-->
<!--  }])-->

<!--let params = reactive<{-->
<!--  page: number,-->
<!--  limit: number,-->
<!--}>({-->
<!--  page: 2,-->
<!--  limit: 10,-->
<!--})-->

<!--const emit = defineEmits(['useImg'])-->
<!--//-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--const props = defineProps<{-->
<!--  sortId: number | string | null-->
<!--}>()-->

<!--const sortId = computed(() => props.sortId)-->
<!--let selectValue = ref<string>('图片移动至')-->


<!--//选取的结果 img-->
<!--let chooseValue = ref<{ dir: string, id: number }[]>([])-->

<!--//上传图片-->
<!--function upload() {-->
<!--  const input = document.createElement('input')-->
<!--  input.type = 'file'-->
<!--  input.onchange = function (event: any) {-->
<!--    let file = event.target.files[0]-->
<!--    let formData = new FormData()-->
<!--    formData.append('file', file);-->
<!--    console.log(formData.get('file'))-->
<!--  }-->
<!--  input.click()-->
<!--}-->

<!--//获取下标值-->
<!--function sub(dir: string | null): number {-->
<!--  for (let i = 0; i < chooseValue.value.length; i++) {-->
<!--    if (chooseValue.value[i].dir == dir) {-->
<!--      return i-->
<!--    }-->
<!--  }-->
<!--  return -1-->
<!--}-->

<!--//选择图片-->
<!--function choose(dir: string, id: number): number {-->
<!--  const index = sub(dir)-->
<!--  if (index === -1) {-->
<!--    chooseValue.value.push({dir, id})-->
<!--  } else {-->
<!--    chooseValue.value.splice(index, 1)-->
<!--  }-->
<!--  return index-->
<!--}-->


<!--//删除选中文件-->
<!--function del() {-->
<!--  console.log(chooseValue.value)-->
<!--}-->

<!--//使用图片-->
<!--function use() {-->
<!--  let img = ref<string[]>([])-->
<!--  chooseValue.value.map(item => {-->
<!--    img.value.push(item.dir)-->
<!--  })-->
<!--  emit('useImg', img.value)-->
<!--}-->


<!--</script>-->
