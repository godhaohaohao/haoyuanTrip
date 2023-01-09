import { defineStore } from 'pinia'
import { getCityAll } from '@/serveices/modules/city'
const useCity = defineStore("city",{
    state:() => ({
        allCities:{},
        currentCity:{
          cityName:'长春'
        }
    }),
    actions: {
         fetchAllCitiesData() {
          getCityAll().then(res=>{
            this.allCities = res.data.data
          })
        }
      }
})
export default useCity