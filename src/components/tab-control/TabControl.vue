<template>
    <div class="tab-bar">
        <div v-for="(item,index) in titles" :key="item" @click="itemClick(index)" :class="{active:index === currentIndex}">
            <span>{{item}}</span></div>
    </div>
</template>


<script>
export default{
    emits:['tabClick'],
    props:{
        titles:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
       return {
        currentIndex:0
    }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index
            this.$emit('tabClick',index)
        },
        setCurrentIndex(index){
            this.currentIndex = index
        }
    }
}
</script>


<style scoped>
    .tab-bar{
        display: flex;
        justify-content: space-around;
        line-height: 44px;
        background-color: #fff;
    }
    .tab-bar .active span{
        color:var(--hao-color);
        border-bottom: 3px solid var(--hao-color);
        padding: 8px;
        font-weight: 700;
    }
</style>