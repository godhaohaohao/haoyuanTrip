import {onMounted,onUnmounted, ref} from 'vue'
import { throttle } from 'underscore'


// export default function useScroll(reachBottomCB){

//     const scrollListenerHandler =()=>{
//         const scrollTop = document.documentElement.scrollTop
//         const scrollHeight = document.documentElement.scrollHeight
//         const clientHeight = document.documentElement.clientHeight
//         if(scrollTop+clientHeight === scrollHeight){
//            console.log('滚动到底部')
//             if(reachBottomCB) reachBottomCB()
            
//         }
//     }
//     onMounted(()=>{
//         document.addEventListener('scroll',scrollListenerHandler)
//     })
//     onUnmounted(()=>{
//         document.removeEventListener('scroll',scrollListenerHandler)
//     })
// }


export default function useScroll(elRef){
   const isBottom = ref(false)
   const scrollTop = ref(0)
   const scrollHeight = ref(0)
   const clientHeight = ref(0)
   let el = window

    const scrollListenerHandler = throttle(()=>{
        if(el === window){
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
            clientHeight.value = document.documentElement.clientHeigh
        }else{
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
            clientHeight.value = el.clientHeight
        }
        if(scrollTop.value + clientHeight.value === scrollHeight.value){
           console.log('滚动到底部')
        isBottom.value = true
            
        }
    },100)
    onMounted(()=>{
        if(elRef) el = elRef.value

        el.addEventListener('scroll',scrollListenerHandler)
    })
    onUnmounted(()=>{
        el.removeEventListener('scroll',scrollListenerHandler)
    })
    return {isBottom,scrollTop}
}