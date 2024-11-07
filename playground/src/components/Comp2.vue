<template>
    <div>
        Comp2---{{comp2}}
    </div>
    <button @click="demoFn">demoFn</button>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import eventBus from '../utils/eventBus';

const comp2 = ref(0)


function demoFn() {
    console.log('demoFn', comp2.value);
    comp2.value++
    eventBus.emit('demoFn', comp2.value)
}
</script>

<style scoped lang='scss'>

</style>
