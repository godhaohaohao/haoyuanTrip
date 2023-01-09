import { defineStore } from "pinia";
import { getHotSuggest,getCategories,getHouseList } from '@/serveices/modules/home'

const useHomeStore = defineStore('home',{
    state:()=>({
        hotSuggests:[],
        categories:[],
        houseList:[],
        currentPage:1
    }),
    actions:{
        fetchHotSuggest(){
            getHotSuggest().then(res=>{
                this.hotSuggests = res.data.data
            })
        },
        fetchCategories(){
            getCategories().then(res=>{
                this.categories = res.data.data
            })
        },
        fetchHouseList(){
            getHouseList(this.currentPage).then(res=>{
                this.houseList.push(...res.data.data)
                this.currentPage++
            })
        }
    }
})
export default useHomeStore