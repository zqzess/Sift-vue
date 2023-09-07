/**
 * ========================
 * Created with WebStorm.
 * @Author zqzess
 * @Date 2023/02/25 19:57
 * @File wlsys/interceptors.ts
 * @Version :
 * @Desc :
 * @GitHUb Https://github.com/zqzess
 * ========================
 **/
import axios from 'axios';
import { ElNotification } from 'element-plus'
import router from "@/router";
axios.defaults.withCredentials=true
export class Interceptors {
    public instance: any;

    constructor() {
        // 创建axios实例
        this.instance = axios.create({timeout: 1000 * 12});
        // 初始化拦截器
        this.initInterceptors();
    }

    // 为了让http.ts中获取初始化好的axios实例
    public getInterceptors() {
        return this.instance;
    }


    // 初始化拦截器
    public initInterceptors() {
        // 设置post请求头
        this.instance.defaults.headers.post['Content-Type'] = 'application/json';
        /**
         * 请求拦截器
         * 每次请求前，如果存在token则在请求头中携带token
         */
        this.instance.interceptors.request.use(
            (config) => {
                // 登录流程控制中，根据本地是否存在token判断用户的登录情况
                // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
                // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
                if (config.headers.isJwt) {
                    const token = localStorage.getItem('id_token');
                    if (token) {
                        // config.headers.Authorization = 'Bearer ' + token;
                        config.headers.Authorization = token;
                    }
                }
                return config;
            },
            (error) => {
                console.log(error);
            },
        );


        // 响应拦截器
        this.instance.interceptors.response.use(
            // 请求成功
            (res) => {
                if (res.headers.authorization) {
                    localStorage.setItem('id_token', res.headers.authorization);
                } else {
                    // console.log(res)
                    if (res.data.data && res.data.data.token) {
                        localStorage.setItem('id_token', res.data.data.token);
                    }
                }
                // if (res.status === 200) {
                //     return Promise.resolve(res.data);
                // } else {
                //     this.errorHandle(res);
                //     return Promise.reject(res.data);
                // }

                if (res.data.status === 1 || res.data.status === '1') {
                    return Promise.resolve(res.data);
                } else if(!res.data.status && res.status === 200) {
                    return Promise.resolve(res);
                }
                else if (res.data.status){
                    this.errorHandle(res);
                    return Promise.reject(res.data);
                }
                else {
                    return Promise.reject(res);
                }
            },
            // 请求失败
            (error) => {
                const {response} = error;
                if (response) {
                    // 请求已发出，但是不在2xx的范围
                    // this.errorHandle(response);
                    return Promise.reject(response);
                } else {
                    // 处理断网的情况
                    // eg:请求超时或断网时，更新state的network状态
                    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
                    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
                    ElNotification.warning({
                        title: '警告',
                        message: '网络连接异常,请稍后再试!',
                    })
                    return Promise.reject(response);
                }
            });
    }


    /**
     * http握手错误
     * @param res  响应回调,根据不同响应进行不同操作
     */
    private errorHandle(res: any) {
        console.log(res)
        const message = res.data.msg
        // 状态码判断
        switch (res.data.code) {
            case '400':
                this.notifyUser('error',message)
                break
            case '401':
                message?this.notifyUser('error',message):this.notifyUser('error', '登陆失效，请重新登陆')
                localStorage.clear();
                router.push({name: 'Login'})
                break;
            case '403':
                message?this.notifyUser('error',message):this.notifyUser('error', '访问禁止')
                break;
            case '404':
                message?this.notifyUser('error',message):this.notifyUser('error', '请求的资源不存在!')
                break;
            default:
                this.notifyUser('warn',message)
        }
    }

    private notifyUser(type:string, msg:string) {
        if (type === 'warn') {
            ElNotification.warning({
                message: msg,
            })
        } else if (type === 'success') {
            ElNotification.success({
                message: msg,
            })
        } else {
            ElNotification.error({
                message: msg,
            })
        }

    }

}
