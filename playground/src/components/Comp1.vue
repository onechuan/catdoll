<template>
    <div>
        Comp1---{{comp1}}
    </div>
    
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import eventBus from '../utils/eventBus';

const comp1 = ref(0)
eventBus.on('demoFn', (num: number) => {
    console.log('demoFn', num);
    comp1.value = num
})
</script>

<style scoped lang='scss'>

</style>
