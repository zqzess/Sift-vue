/**
 * ========================
 * Created with WebStorm.
 * @Author zqzess
 * @Date 2023/03/02 22:34
 * @File wlsys/dialogshow.ts
 * @Version :
 * @Desc :
 * @GitHUb Https://github.com/zqzess
 * ========================
 **/
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDialogStateStore = defineStore('dialogShow', () => {
    const isShow1 = ref(false)
    const isShow2 = ref(false)
    const isShow3 = ref(false)
    const isShow4 = ref(false)
    function setShowSate(index) {
        isShow1.value = index === 1
        isShow2.value = index === 2
        isShow3.value = index === 3
        isShow4.value = index === 4
    }

    function setHiddenState(){
        isShow1.value = false
        isShow2.value = false
        isShow3.value = false
        isShow4.value = false
    }
    const getShowState1 = computed(() => isShow1)
    const getShowState2 = computed(() => isShow2)
    const getShowState3 = computed(() => isShow3)
    const getShowState4 = computed(() => isShow4)
    return { isShow1, isShow2, isShow3, isShow4, setShowSate, setHiddenState, getShowState1, getShowState2, getShowState3, getShowState4 }
})
