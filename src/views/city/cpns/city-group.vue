<template>
    <div class="city-group">
        <van-index-bar :sticky="false" highlight-color="#ff9854" :index-list="indexList">
            <van-index-anchor index="热门" />
        <div class="list">
            <template v-for="city,index in groupData.hotCities" :key="index">
                <div class="city" @click="cityClick(city)">
                    {{ city.cityName }}
                </div>
            </template>
        </div>
       <template v-for="item,index in groupData.cities" :key="index">
            <van-index-anchor :index="item.group" />
                       
            <template v-for="city in item.cities">
                <van-cell :title="city.cityName" @click="cityClick(city)" />
            </template>
                       
        </template>
</van-index-bar>
        
    </div>
</template>


<script setup>

import useCity from '@/stores/modules/city';
import {computed} from 'vue'
import { useRouter } from 'vue-router';

 const props = defineProps({
    groupData:{
        type:Object,
        default:()=>({})
    }
 })
 const indexList = computed(()=>{
    const list = props.groupData.cities.map(item=>item.group)
    list.unshift('#')
    return list
 })

 const router = useRouter()
 const cityStore = useCity()
const cityClick = (city) => {

    cityStore.currentCity = city

    router.back()

}

</script>


<style scoped>
    .list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 10px;
        padding-right:25px ;
    }
    .city{
        width: 70px;
        height: 28px;
        border-radius: 12px;
        background: #fff4ec;
        font-size: 12px;
        margin: 5px 0;
        text-align: center;
        line-height: 28px;
    }
</style>