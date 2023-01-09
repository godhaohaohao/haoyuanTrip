<template>
    <div class="search">
        <button @click="back">返回</button>
        <h2>开始时间：{{ $route.query.startDay }}</h2>
        <h2>开始时间：{{ $route.query.endDay }}</h2>
        <h2>城市：{{ $route.query.currentCity }}</h2>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()
const back = ()=>{
router.back()
}
</script>


<style scoped>

</style>