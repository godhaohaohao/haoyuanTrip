<template>
    <div class="house-list">
        <h2>热门精选</h2>
        <search-bar v-if="isShowSearch" class="search-bar"></search-bar>
        <div class="list">
            <template v-for="item,index in houseList">
                <house-item-v3
                    v-if="item.discoveryContentType === 3" 
                    :item-data="item.data"
                    @click="itemClick(item.data)"
                />
                <house-item-v9 
                    v-else-if="item.discoveryContentType === 9"
                    :item-data="item.data"
                    @click="itemClick(item.data)"
                />
            </template>
        </div>
    </div>
</template>


<script setup>
import useScroll from '@/hooks/useScroll'

import SearchBar from '@/components/search-bar/search-bar.vue'
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue'
import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue'
import { computed,} from 'vue';
import { useRouter } from 'vue-router';

const homeStore = useHomeStore()
const {houseList} = storeToRefs(homeStore)

// const moreClick = ()=>{
//     homeStore.fetchHouseList()
// }


// const scrollListenerHandler =()=>{
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     const clientHeight = document.documentElement.clientHeight
//     if(scrollTop+clientHeight === scrollHeight){
//         homeStore.fetchHouseList()
//     }
// }
// onMounted(()=>{
//     document.addEventListener('scroll',scrollListenerHandler)
// })
// onUnmounted(()=>{
//     document.removeEventListener('scroll',scrollListenerHandler)
// })
const { isBottom,scrollTop } = useScroll()
//     watch(isBottom, (newValue) => {
    //     if (newValue) {
        //         homeStore.fetchHouseList()
        //         isBottom.value = false          
    //     }
    //     })

    // const isShowSearch = ref(false)
    //     watch(scrollTop,(newValue)=>{
    //         if(newValue >= 100){
    //             isShowSearch.value = true
    //         }else{
    //             isShowSearch.value = false
    //         }
    //     })

        const isShowSearch = computed(()=>{
            return scrollTop.value >= 400
        })

        const router = useRouter()
    const itemClick = (item)=>{
    router.push(`/detail/${item.houseId}`)
    }

</script>


<style scoped>
h2{
    font-size: 22px;
    padding: 10px;
    font-weight: 500;
}
.list{
    display: flex;
    flex-wrap: wrap;
}
.btn{
    height: 20vh;
}
.search-bar{
    height: 45px;
    position: fixed;
    top: 0;
    right:0;
    left:0;
    background: white;
    z-index: 5;
}
</style>