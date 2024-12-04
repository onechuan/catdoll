<template>
  <div id="demo">
    <button @click="handleCount">点击按钮：{{count}}</button>
  </div>
  <div class="box">
    <div class="text-demo">审核失败</div>
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
.box{
  width: 200px;
  height: 100px;
  background-color: #ccc;
}
.text-demo{
  color: #F93834;
  font-family: "PingFang SC";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 150% */
  -webkit-text-stroke:0.3px #FFF;
}
</style>
