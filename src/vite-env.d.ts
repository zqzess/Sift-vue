/// <reference types="vite/client" />
import {HttpService} from '@/axios/http'
 const $http = new HttpService()
app.config.globalProperties.$http=$http;
