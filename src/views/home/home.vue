<template>
    <div class="home" ref="homeRef">
        <HomeNavBar/>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <HomeSearchBox></HomeSearchBox>
        <house-list></house-list>
        
    </div>
</template>

<script>
export default{
    name:'home'
}
</script>

<script setup>
 import HomeNavBar from './cps/HomeNavBar.vue'
 import HomeSearchBox from './cps/HomeSearchBox.vue';
 import HouseList from './cps/HouseList.vue'
import useHomeStore from '@/stores/modules/home';
import { ref,watch,onActivated } from 'vue';
import useScroll from '@/hooks/useScroll'


const homeStore = useHomeStore()
homeStore.fetchHotSuggest()
homeStore.fetchCategories()
homeStore.fetchHouseList()


    const homeRef = ref()


    const { isBottom,scrollTop } = useScroll(homeRef)
        watch(isBottom, (newValue) => {
        if (newValue) {
            homeStore.fetchHouseList()
            isBottom.value = false          
        }
        })
        onActivated(()=>{
            homeRef.value.scrollTo({
                top:scrollTop.value
            })
        })


</script>


<style scoped>
.home{
    padding-bottom: 60px;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
}
    .banner > img{
        width: 100%;
    }
    
</style>