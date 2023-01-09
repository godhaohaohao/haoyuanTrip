<template>
    <div class="search-box">
        <!--位置信息-->
        <div class="location">
            <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <div class="date-range" @click="showCalendar = true">
            <div class="start">
                <span class="tip">入住</span>
                <span class="time">{{ startDay }}</span>
            </div>
            <div class="stay">共{{ stayDays }}晚</div>
            <div class="end">
                <span class="tip">离店</span>
                <span class="time">{{ endDate }}</span>
            </div>
        </div>
        <van-calendar v-model:show="showCalendar" 
        type="range" 
        @confirm="onConfirm"
        color="#ff9854"
        :round="false"
        />
        <HotSuggest></HotSuggest>
        <div class="search-btn">
            <div class="btn" @click="btnClick">开始搜索</div>
        </div>
        <HomeCategories></HomeCategories>
    </div>
</template>


<script setup>
import useCity from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import {formatMonthDay,getDiffDays} from '@/utils/format_date'
import { ref } from 'vue';
import HotSuggest from './HotSuggest.vue';
import HomeCategories from './HomeCategories.vue'
import useMainStore from '@/stores/modules/main';



// 当前城市
const cityStore = useCity()
const {currentCity} = storeToRefs(cityStore)

const positionClick = ()=>{
    navigator.geolocation.getCurrentPosition((res)=>{
        console.log('请求位置成功',res)
    },(err)=>{
        console.log('请求位置失败')
    },{
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    })
}
const router = useRouter()
const cityClick = ()=>{
    router.push('/city')
}

//日期范围的处理
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate()+1)
const startDay = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))
const stayDays = ref(getDiffDays(nowDate,newDate))


const showCalendar = ref(false)

const mainStore = useMainStore()
mainStore.startDate = startDay.value
mainStore.endDate = endDate.value

const onConfirm = (e)=>{
    const selectorStartDate = e[0]
    const selectorEndDate = e[1]

    startDay.value = formatMonthDay(selectorStartDate)
    endDate.value = formatMonthDay(selectorEndDate)

    mainStore.startDate = startDay.value
    mainStore.endDate = endDate.value

    showCalendar.value = false

    stayDays.value = getDiffDays(selectorStartDate,selectorEndDate)
}



//热门建议
// const hotSuggests = ref([])
// axios.get('http://codercba.com:1888/api/home/hotSuggests').then((res)=>{
//     hotSuggests.value = res.data.data
// })

//搜索按钮
const btnClick = ()=>{
    router.push({
        path:'/search',
        query:{
            startDay:startDay.value,
            endDay:endDate.value,
            currentCity:currentCity.value.cityName
        }
    })
}

</script>


<style scoped>
.search-box{
    --van-calendar-popup-height:100%;
}
.location{
        display: flex;
        padding: 0 20px;
        height: 44px;
        align-items: center;
    }
    .position{
        position: absolute;
        right:2px;
        width: 100px;
        display: flex;
        align-items: center
    }
    .city{
        color:#333
    }
    .position > .text{
        position:relative;
        font-size:12px;
        color:#666
    }
    .position > img {
        height: 18px;
        margin-left:3px;
    }

    .date-range{
        display: flex;
        flex-wrap: wrap;
        height: 44px;
        text-align: center;
        margin-top:10px ;
        color: rgb(89, 90, 92);
    }
    .start{
        display: flex;
        flex-direction: column;
        margin-left: 1px;
        position: relative;
        left: 12px;  
    }
    .stay{
        position: absolute;
        left: 45%;
        transform: translateX(-50%);
        margin-top: 10px;
    }
    .end{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 40px;
    }
    .tip{
        font-size:12px;
        margin-left:-34px ;
    }
    .time{
        margin-top: 5px;
    }
    .search-btn{
        display: flex;
        justify-content: center;
        margin-top: 25px;
    }
    .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: linear-gradient(90deg, #fa8c1d, #fcaf3f);
  }
</style>