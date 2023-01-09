import axios from 'axios'
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
export function getCityAll(){
    return axios.get('http://codercba.com:1888/api/city/all')
}