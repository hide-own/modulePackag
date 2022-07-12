<template>

  <KTag>121</KTag>



    <TailTable :data="tableData" :loader="loadTableData" pagetag :columns="columns"
               :features="{hover: true,border: true,stripe: true,divide: true}"
               :expandable="{tree: true, handlePosition: 2}" selectable actionable @selected-keys="">
      <template #handle-image="{column}">
        <button>{{ column.field }}</button>
      </template>
      <template #title-image="{column}">{{ column.title }}</template>
      <template #image="{column, row}">
        <img :src="row.image" alt="">
      </template>

      <template #title-$actionable="{row, column}">
        啊啊
      </template>
      <template #$actionable="{row, column}">
        <a href="#">Edit</a>
      </template>

      <template #$expanded="{row}">
        <pre>{{ JSON.stringify(row, null, 2) }}</pre>
      </template>
    </TailTable>















</template>

<script lang="ts" setup>
import {KButton, KOption, KSelect, KTag, TailTable} from '@/modulePackag'
import {reactive, ref} from "vue";
import {UserTableColumn} from "@/modulePackag/table";
import {UserPaginationCancelToken} from "@/hooks/usePagination";



const columns = reactive<UserTableColumn[]>([
  {
    title: "商品ID",
    field: "id",
    width: 80,
  },
  {
    title: "商品图",
    field: "image",
    width: 80,
  },
  {
    title: "商品名称",
    field: "store_name",
  },
  {
    title: "商品类型",
    field: "product_type",
    width: 100,
  },
  {
    title: "商品售价",
    field: "price",
    width: 90,
  },
  {
    title: "销量",
    field: "sales",
    width: 90,
  },
  {
    title: "库存",
    field: "stock",
    width: 80,
  },
  {
    title: "排序",
    field: "sort",
    width: 70,
  },
  {
    title: "状态",
    field: "state",
    width: 100,
  },
  {
    title: '操作',
    align: 'center',
    field: 'action',
    fixed: 'right',
    width: 250
  },
])






const tableData = ref<any[]>([])

let cancelToken: UserPaginationCancelToken | undefined

function loadTableData(page: number, perPage: number, cancel: UserPaginationCancelToken) {
  // cancelToken?.cancel()
  cancelToken = cancel

  setTimeout(() => {
    if (cancelToken?.version === cancel.version) {
      tableData.value = new Array(10).fill(null).map((item, index) => {
        return {
          "id": index + 1 + (page - 1) * perPage,
          "mer_id": 0,
          "image": "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/05\/20220526\/b29bb7c63d2acf70d05a448984755a88.jpg",
          "recommend_image": "",
          "slider_image": [
            "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/05\/20220526\/b29bb7c63d2acf70d05a448984755a88.jpg",
            "http:\/\/pfls.yaojiankang.top\/uploads\/attach\/2022\/05\/20220526\/19171de8b32c8edcb24be2c1e00434c9.jpg"
          ],
          "store_name": "防晒隔离喷雾",
          "store_info": "",
          "keyword": "",
          "bar_code": "",
          "cate_id": "56,54",
          "price": "16.80",
          "vip_price": "0.00",
          "ot_price": "0.00",
          "postage": "0.00",
          "unit_name": "瓶",
          "sort": 0,
          "sales": 0,
          "stock": "60",
          "manufacturer": "江西未来药业有限公司",
          "is_show": 1,
          "is_hot": 0,
          "is_benefit": 0,
          "is_best": 0,
          "is_new": 0,
          "is_virtual": 0,
          "virtual_type": 0,
          "add_time": 1652932526,
          "is_postage": 0,
          "is_del": 0,
          "mer_use": 0,
          "give_integral": "0.00",
          "cost": "15.00",
          "is_seckill": 0,
          "is_bargain": 0,
          "is_good": 0,
          "is_sub": 0,
          "is_vip": 0,
          "ficti": 0,
          "browse": 0,
          "code_path": "",
          "soure_link": "",
          "video_link": "",
          "temp_id": 3,
          "spec_type": 0,
          "activity": "0,1,2,3",
          "spu": "1015757909982",
          "label_id": "",
          "command_word": "",
          "recommend_list": "",
          "vip_product": 0,
          "presale": 0,
          "presale_start_time": 0,
          "presale_end_time": 0,
          "presale_day": 1,
          "logistics": "1,2",
          "freight": 3,
          "custom_form": "[]",
          "collect": 0,
          "likes": 0,
          "visitor": 2,
          "cate_name": "商品组\/夏季商品,化妆用品\/防晒品",
          "stock_attr": true,
          "product_type": "普通商品"
        }
      })
      cancelToken = undefined
    }
  }, 1000)
}


loadTableData(1, 10, {cancel() {}, version: 0})

</script>
