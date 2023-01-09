import axios from "axios";
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

axios.interceptors.request.use((config)=>{
    mainStore.isLoading = true
    return config
},err=>{
    return err
})
axios.interceptors.response.use((res)=>{
    mainStore.isLoading = false
    return res
},(err)=>{
    mainStore.isLoading = false
    return err
})

export function getHotSuggest(){
    return axios.get('http://codercba.com:1888/api/home/hotSuggests')
}

export function getCategories(){
    return axios.get('http://codercba.com:1888/api/home/categories')
}

export function getHouseList(currentPage){
    return axios.get('http://codercba.com:1888/api/home/houselist',{
        params:{
            page:currentPage
        }
    })
}
export function getSwipeDate(houseId){
    return axios.get('http://codercba.com:1888/api/detail/infos',{
        params:{
            houseId
        }
    })
}