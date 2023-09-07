/**
 * ========================
 * Created with WebStorm.
 * @Author zqzess
 * @Date 2023/09/06 22:11
 * @File sift_client/fileStore.ts
 * @Version :
 * @Desc :
 * @GitHUb Https://github.com/zqzess
 * ========================
 **/

import { defineStore } from 'pinia';
import {ref, computed, reactive} from "vue";
import {FileItem} from "@/utils/beans";

export const fileListStore = defineStore('fileInfo', () => {

    interface FilePageInfo {
        page: number
        pageSize: number
        total: number
    }

    const file = ref<FileItem>()

    const filePage:FilePageInfo = reactive({page: 1, pageSize: 5, total: 5})

    const getFile = computed(()=> file.value)

    const getFileSuffix = computed(() => {
        const list = file.value.fileName.split(".")
        const suffix = list[list.length-1].toLowerCase()
        if (suffix === 'js') {
            return 'javascript'
        }
        if (suffix === 'ts') {
            return 'typescript'
        }
        if (suffix === 'yml' || suffix === 'yaml') {
            return 'yaml'
        }
        if (suffix === 'sql') {
            return 'sql'
        }
        return 'conf'
    })

    const getFilePage = computed(() => filePage)

    function setFile(val:FileItem) {
        file.value = val
    }

    function setFilePage(val:FilePageInfo) {
        filePage.page = val.page
        filePage.pageSize = val.pageSize
        filePage.total = val.total
    }

    return { file, filePage, getFile, setFile, getFileSuffix, getFilePage, setFilePage}

}, {
    persist: {
        enabled: true,
        // strategies: [{storage: localStorage, paths: ['loadNum']}]
    }
})

