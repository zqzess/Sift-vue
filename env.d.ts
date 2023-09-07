// declare const process = {
//     HOST: 'http://localhost:5173'
// }

const process = {
    HOST: 'http://localhost:8090'
}

export default process


//记得在env.d.ts配置包的
declare module 'monaco-editor';
declare module 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
declare module 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
declare module 'monaco-editor/esm/vs/basic-languages/yaml/yaml.js';
declare module 'monaco-editor/esm/vs/language/json/json.worker?worker'
declare module 'monaco-editor/esm/vs/language/css/css.worker?worker'
declare module 'monaco-editor/esm/vs/language/html/html.worker?worker'
declare module 'monaco-editor/esm/vs/editor/editor.worker?worker'
declare module 'monaco-editor/esm/vs/basic-languages/javascript/javascript.js'

