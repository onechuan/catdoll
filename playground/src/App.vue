<template>
  <div id="demo">
    <button @click="handleCount">点击按钮：{{count}}</button>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
// import { debounce, throttle } from "lodash-es"
import { debounce } from "@catdoll/tools"

const count = ref(0)

const handleCount = debounce(() => {
  count.value++
},1000);
</script>

<style scoped lang='scss'>

</style>
