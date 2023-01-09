<template>
    <div class="categories">
        <template v-for="(item,index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div class="text">{{ item.title }}</div>
            </div>
        </template>
    </div>
</template>


<script setup>

import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';


const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)

</script>


<style scoped>
.categories{
    display: flex;
    height: 80px;
    overflow-x: auto;
    text-align: center;
}
.categories::-webkit-scrollbar{
    display: none;
}
.item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 70px;
}
.item > img{
    width:32px;
}
.item > .text{
    margin-top: 5px;
    font-size: 12px;
}

</style>