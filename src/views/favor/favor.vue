<template>
    <div class="favor" ref="favorRef">
        <template v-for="item in 100">
           <h2>  {{  item  }} </h2>
        </template>
    </div>
</template>


<script setup>
import useScroll from '@/hooks/useScroll';
import { ref } from 'vue';

const favorRef = ref()
    useScroll(favorRef)
</script>


<style scoped>
    .favor{
        height: 50vh;
        background: #ff9854;
        overflow-y:auto ;
    }
</style>