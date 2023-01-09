<template>
    <div class="tab-bar">
        <div class="tab-bar-item" @click="itemClick('/home')">
            <img src="@/assets/img/tabbar/tab_home.png" alt="">
            <span class="text">首页</span>
        </div>
        <div class="tab-bar-item" @click="itemClick('/favor')">
            <img src="@/assets/img/tabbar/tab_favor.png" alt="">
            <span class="text">收藏</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_order.png" alt="">
            <span class="text">订单</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_message.png" alt="">
            <span class="text">消息</span>
        </div>
        
    </div>
</template>


<script setup>

import {useRouter} from 'vue-router'
const router = useRouter()

function itemClick(payload){
    router.push(payload)
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
    .text{
        font-size: 14px;
        margin-top: 2px;
    }
</style>