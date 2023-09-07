/**
 * ========================
 * Created with WebStorm.
 * @Author zqzess
 * @Date 2023/09/04 13:09
 * @File sift_client/monacoEditorType.ts
 * @Version :
 * @Desc :
 * @GitHUb Https://github.com/zqzess
 * ========================
 **/
import { PropType } from 'vue'
import {isDark} from "@/composables";
export type Theme = 'vs' | 'hc-black' | 'vs-dark'
export type FoldingStrategy = 'auto' | 'indentation'
export type RenderLineHighlight = 'all' | 'line' | 'none' | 'gutter'
export interface Options {
    automaticLayout: boolean // 自适应布局
    foldingStrategy: FoldingStrategy // 折叠方式  auto | indentation
    renderLineHighlight: RenderLineHighlight // 行亮
    selectOnLineNumbers: boolean // 显示行号
    placeholder:string
    minimap: {
        // 关闭小地图
        enabled: boolean
    }
    folding: boolean, // 是否启用代码折叠
    // readOnly: Boolean // 只读
    fontSize: number // 字体大小
    theme: string // vs, hc-black, or vs-dark
    scrollBeyondLastLine: boolean // 取消代码后面一大段空白
    overviewRulerBorder: boolean // 不要滚动条的边框
}

export const editorProps = {
    modelValue: {
        type: String as PropType<string>,
        default: null,
    },
    hightChange: {
        type: Boolean,
        default: false,
    },
    width: {
        type: [String, Number] as PropType<string | number>,
        default: '100%',
    },
    height: {
        type: [String, Number] as PropType<string | number>,
        default: '100%',
    },
    language: {
        type: String as PropType<string>,
        default: 'javascript',
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    theme: {
        type: String as PropType<Theme>,
        validator(value: string): boolean {
            return ['vs', 'hc-black', 'vs-dark', 'hc-light'].includes(value)
        },
        default: 'vs',
    },
    options: {
        type: Object as PropType<Options>,
        default() {
            return {
                automaticLayout: true,
                // foldingStrategy: 'indentation',
                foldingStrategy: 'indentation', // 折叠方式  auto | indentation
                // renderLineHighlight: 'all',
                renderLineHighlight: 'all' || 'line' || 'none' || 'gutter', // 行亮
                selectOnLineNumbers: true, // 显示行号
                minimap: {
                    // 关闭小地图
                    enabled: false,
                },
                placeholder: 'ss',
                folding: true, // 是否启用代码折叠
                // readOnly: false, // 只读
                fontSize: 16, // 字体大小
                scrollBeyondLastLine: false, // 取消代码后面一大段空白
                overviewRulerBorder: false, // 不要滚动条的边框
                theme: localStorage.getItem('vueuse-color-scheme') === 'dark' ? 'vs-dark' : 'vs'// vs, hc-black, or vs-dark
            }
        },
    },
}
