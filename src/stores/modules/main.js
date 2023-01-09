import { defineStore } from 'pinia'

const useMainStore = defineStore('main',{
    state:()=>({
        startDate:'09.19',
        endDate:'09.12',
        isLoading:false
    })
})

export default useMainStore