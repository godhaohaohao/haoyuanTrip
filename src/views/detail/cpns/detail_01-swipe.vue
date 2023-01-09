<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item,index) in swipeData">
                <van-swipe-item class="swipe-item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>

            <template #indicator="{ active, total }">
                 <!-- <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div> -->
                 <div class="custom-indicator">
                    <template v-for="(value,key,index) in swipeGroup">
                       <span class="text" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                        {{ getName(value[0].title) }}
                        <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                         {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
                        </span>
                       </span>
                       
                    </template>
                 </div>
            </template>
        </van-swipe>
    </div>
</template>


<script setup>

const props = defineProps({
    swipeData:{
        type:Array
    }
})

const swipeGroup = {} 

for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
      valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}

const getName = (name) => {
   return name.replace('：','').replace('【','').replace('】','')
}
</script>


<style scoped>

.swipe-item > img{
    width: 100%;
}
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color:white;
    background: rgba(0, 0, 0, 0.8);
  }
  .active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
    
   .text{
    margin:0 3px
   }
</style>