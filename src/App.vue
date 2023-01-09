<template>
<div class="app">
  <router-view v-slot="{ Component }">
  <keep-alive include="home">
    <component :is="Component" />
  </keep-alive>
</router-view>
  <!-- <tab-bar v-if="!router.meta.hideTabBar"/> -->
  <tab-bar />
  <loading v-if="mainStore.isLoading" />
</div>
</template>


<script setup>

import TabBar from './components/tabbar/TabBar.vue'
import loading from './components/loading/loading.vue';
import useMainStore from './stores/modules/main'

const mainStore = useMainStore()


</script>


<style scoped>

</style>
