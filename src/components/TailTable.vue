<template>
  <div></div>
  <!--  <TailTable :data="tableData" :loader="loadTableData" pagetag :columns="columns"-->
  <!--             :features="{hover: true,border: true,stripe: true,divide: true}"-->
  <!--             :expandable="{tree: true, handlePosition: 2}" selectable actionable @selected-keys="">-->
  <!--    <template #handle-image="{column}">-->
  <!--      <button>{{ column.field }}</button>-->
  <!--    </template>-->
  <!--    <template #title-image="{column}">{{ column.title }}</template>-->
  <!--    <template #image="{column, row}">-->
  <!--      <img :src="row.image" alt="">-->
  <!--    </template>-->

  <!--    <template #title-$actionable="{row, column}">-->
  <!--      啊啊-->
  <!--    </template>-->
  <!--    <template #$actionable="{row, column}">-->
  <!--      <a href="#">Edit</a>-->
  <!--    </template>-->

  <!--    <template #$expanded="{row}">-->
  <!--      <pre>{{ JSON.stringify(row, null, 2) }}</pre>-->
  <!--    </template>-->
  <!--  </TailTable>-->
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref<[]>([])
</script>
