<template>
  <div class=" bg-gray-100 text-xs px-2 py-1 align-middle">
    <slot name="icon"/>
    <div><slot/></div>
    <XIcon class="w-3 h-3 pl-2"/>
  </div>
</template>

<script lang="ts" setup>
import {XIcon} from "@heroicons/vue/solid";
</script>

<style scoped>

</style>
