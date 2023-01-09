<template>
    <div class="tab-bar">       
        <template v-for="(item,index) in tabbarData">
            <div class="tab-bar-item" 
                 :class="{active:currentIndex===index}"
                 @click="itemClick(item.path,index)">
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
            <span class="text">{{item.text}}</span>
        </div>
        </template>
        
    </div>
</template>


<script setup>
import tabbarData from '@/assets/data/tabbar.js';
import { ref } from 'vue';
import {useRouter} from 'vue-router'
const router = useRouter()

const currentIndex = ref(0)

function itemClick(payload,index){
    router.push(payload)
    currentIndex.value = index
}

const getURl = (image) => {
    return new URL(`../assets/img/${image}`,import.meta.url).href
}
const getAssetURL = (image) => {
  // 参数一: 相对路径
  // 参数二: 当前路径的URL
  return new URL(`../../assets/img/${image}`, import.meta.url).href
}
</script>


<style scoped>
    .tab-bar{
        position: fixed;
        bottom: 0;
        left: 0;
       right: 0;
        display: flex;
        height: 50px;
        border-top:1px solid #f3f3f3;
    }
    .tab-bar > .tab-bar-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
    .tab-bar-item > img{
        height: 34px;
    }
    .tab-bar > .active{
        color:orange
    }
    .text{
        font-size: 14px;
        margin-top: 2px;
    }
</style>