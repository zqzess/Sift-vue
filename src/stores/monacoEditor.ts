/**
 * ========================
 * Created with WebStorm.
 * @Author zqzess
 * @Date 2023/09/06 16:30
 * @File sift_client/monacoEditor.ts
 * @Version :
 * @Desc :
 * @GitHUb Https://github.com/zqzess
 * ========================
 **/
import { defineStore } from 'pinia';
import {ref, computed} from "vue";

export const monacoEditorStore = defineStore('monacoEditor', () => {
    const editor = ref({model: "", newModel: ""})

    const getModel = computed(() => editor.value.model)

    function setModel(val:any) {
        editor.value.model = val
    }

    function setNewModel(val:any) {
        editor.value.newModel = val
    }

    return { editor, getModel, setModel , setNewModel}
}, {
    // persist: {
    //     enabled: true,
    //     // strategies: [{storage: localStorage, paths: ['loadNum']}]
    // }
})

