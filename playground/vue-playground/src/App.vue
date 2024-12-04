<template>
  <h1>测试后</h1>
  <button @click="jsError">js 模拟错误</button>
</template>

<script lang='ts' setup>
function jsError(){
  let num = new Number(33.22);
  console.log(num.toFixed(-1));
}
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
