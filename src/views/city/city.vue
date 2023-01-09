<template>
    <div class="city topPage">
        <div class="top">
            <van-search
                v-model="searchValue"
                shape="round"
                placeholder="城市/区域/位置"
                show-action
                @cancel="cancelClick"
                />


                <van-tabs v-model:active="tabActive" color="var(--hao-color)">
                        <template v-for="(value,key,index) in allCities" :key="key">                  
                                        <van-tab :title="value.title" :name="key"></van-tab>
                        </template>            
                    </van-tabs>
        </div>
                            <div class="content">
                                <template v-for="(value,key,index) in allCities">                                  
                                    <city-group v-show="tabActive===key" :group-data="value"/>                                     
                                </template>
                            </div>
    </div>
</template>


<script setup>
import { ref,computed } from 'vue';
import { useRouter } from 'vue-router';
import useCity from '@/stores/modules/city'
import { storeToRefs } from 'pinia';
import CityGroup from './cpns/city-group.vue'

const router = useRouter()
const searchValue = ref('')
const cancelClick = ()=>{
    router.back()
}
const tabActive = ref()

const cityStore = useCity()
cityStore.fetchAllCitiesData()
const {allCities} = storeToRefs(cityStore)

const currentGroup = computed(() => allCities.value[tabActive.value])




</script>


<style scoped>
.city{
    --van-search-left-icon-color:var(--hao-color)
}
.content{
    height:calc(100vh - 98px);
    overflow-y: auto;
}
</style>