<template>
    <div class="detail topPage" 
         ref="detailRef">
        <tab-control
        ref="tabControlRef"
        @tabClick="tabClick" 
        v-if="showTabControl"
        :titles="names"
        class="tabs"
        />
        <van-nav-bar
            class="nav-bar"
            title="房屋详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div v-if="mainPart" v-memo="[mainPart]">
            <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
            <detail-infos :top-infos="mainPart.topModule" />
            <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
            <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
            <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"></detail-comment>
            <detail-notice name="须知" :ref="getSectionRef" :orderRules="mainPart.dynamicModule.rulesModule.orderRules"></detail-notice>
            <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail-map>
            <detail-intro :price-intro="mainPart.introductionModule"/>
        </div>
        <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>

    </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import {getSwipeDate} from '@/serveices/modules/home'
import { ref,computed,watch } from 'vue';

import TabControl from '@/components/tab-control/TabControl.vue';
import detailFacility from './cpns/detail_03-facility.vue'
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import useScroll from '@/hooks/useScroll';
import DetailIntro from "./cpns/detail_08-intro.vue"


const route = useRoute()
const router = useRouter()

const detailInfos = ref({})

const onClickLeft = ()=>{
    router.back()
}

getSwipeDate(route.params.id).then(res => {
    detailInfos.value = res.data.data
})

const mainPart = computed(()=>detailInfos?.value?.mainPart)
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)

const showTabControl = computed(()=>{
    return scrollTop.value >= 300
})
// const sectionEls = []

// const getSectionRef = (value)=>{
//     if(!value) return
//     sectionEls.push(value.$el)
// }


// // const landlordRef = ref()

// const tabClick=(index)=>{
//         detailRef.value.scrollTo({
//         top:sectionEls[index].offsetTop - 44,
//         behavior: "smooth"
//     })
// }


const sectionEls = ref({})

const names = computed(()=>{
   return Object.keys(sectionEls.value)
})
const getSectionRef = (value)=>{
    if(!value) return
    const name = value.$el?.getAttribute('name')
    sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index)=>{
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let distance = el.offsetTop - 44


    isClick = true
    currentDistance = distance

    detailRef.value.scrollTo({
        top:distance,
        behavior: "smooth"
    })
}

//监听元素的滚动 匹配tab-control

const tabControlRef = ref()

watch(scrollTop,(newValue)=>{
    if(newValue === currentDistance){
        isClick = false
    }
    if(isClick) return
    const els = Object.values(sectionEls.value)
    const values = els.map(els => els.offsetTop)
    
    let index = values.length - 1
    for(let i = 0;i < values.length; i++){
        if(values[i] > newValue + 44){
            index = i - 1
            break
        }
    }
    tabControlRef.value?.setCurrentIndex(index)
})

</script>


<style scoped>
.tabs{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
}
:deep(.van-nav-bar__title){
    color:var(--hao-color);
    font-size:15px;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
}
 .footer > img {
    width: 123px;
  }

  .footer > .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
</style>