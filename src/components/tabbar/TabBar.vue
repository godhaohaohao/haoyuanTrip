<template>
    <div class="tab-bar">
    <van-tabbar v-model="currentIndex" route>
        <template v-for="(item,index) in tabbarData">
  <van-tabbar-item :to="item.path">
    <span class="text">{{item.text}}</span>
    <template #icon>
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
    </template>
  </van-tabbar-item>
</template>
</van-tabbar>
</div>
</template>


<script setup>
import { ref, watch } from 'vue';
import tabbarData from '@/assets/data/tabbar';
import { useRoute } from 'vue-router';


const currentIndex = ref(0)
const route = useRoute()

watch(route,(newRoute)=>{
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if(index === -1) return
  currentIndex.value = index
})

const getAssetURL = (image)=>{
  return new URL(`../../assets/img/${image}`,import.meta.url).href
}
</script>


<style scoped>
.tab-bar{
    --van-tabbar-item-font-size:15px;
}
img{
    height: 25px;
   }
   :deep(.van-tabbar-item--active){
    color: var(--hao-color);
   }
</style>