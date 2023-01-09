<template>
    <div class="hot-suggest">
            <template v-for="item,index in hotSuggests">
                <div class="item">
                {{item.tagText.text}}
                </div>
            </template>
        </div>
</template>


<script setup>

import useHomeStore from '@/stores/modules/home'
import {storeToRefs} from 'pinia'

const homeStore = useHomeStore()
const {hotSuggests} = storeToRefs(homeStore)

</script>


<style scoped>

.hot-suggest{
    display: flex;
    flex-wrap: wrap; 
    margin: 5px;  
    margin-top: 20px; 
}
.item{
    padding: 4px 8px;
    border-radius: 4px;
    background: #f3f0f0;
    margin: 5px;
    font-size: 12px;
}

</style>