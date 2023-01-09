<template>
    <div class="loading">
        <div class="bg">
            <img src="@/assets/img/home/full-screen-loading.gif" alt="">
        </div>
    </div>
</template>


<script setup>


</script>


<style scoped>
.loading{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.loading > .bg{
    width: 104px;
    height: 104px;
    background: url(@/assets/img/home/loading-bg.png);
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loading > .bg > img{
    width: 70px;
    height: 70px;
    margin-bottom:8px ;
}
</style>