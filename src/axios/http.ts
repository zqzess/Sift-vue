/**
 * @author  keiferju
 * @time    2019-08-29 12:57
 * @title   http请求封装
 * @desc
 *
 */
import {Interceptors} from '@/axios/interceptors'
import { ElNotification } from 'element-plus'
import process from "../../env.d"

export class HttpService {
    public axios: any;
    public modal: any;

    constructor() {
        // 获取axios实例
        this.axios = new Interceptors().getInterceptors();
    }


    /**
     * get请求
     * @param params  参数
     * @param jwt   是否token校验
     * @param modulename    模块
     * @param operation     接口
     * @param flag          标记
     * @param verson       版本,默认v1
     * @param service      服务,默认
     */
    public getData(params: object, jwt: boolean, flag: string, verson = 'v1', service = '') {
        const url = process.HOST + '/' + verson  + service;
        if(params)
            params['tag'] = flag
        else
            params = {tag: flag}

        return new Promise((resolve, reject) => {
            this.axios.get(url, {
                params: params,
                headers: {isJwt: jwt},
            }).then((res) => {
                this.resultHandle(res, resolve);
            }).catch((err) => {
                reject(err);
            });
        });

    }

    public get(params: object, verson? ,service = '') {
        const url = process.HOST + (service === '' ? '' : '/') + verson + service;
        return new Promise((resolve, reject) => {
            this.axios.get(url, {
                params: params,
                headers: {isJwt: true},
            }).then((res) => {
                this.resultHandle(res, resolve);
            }).catch((err) => {
                reject(err);
            });
        });

    }


    /**
     * post请求
     * @param params  参数
     * @param jwt   是否token校验
     * @param modulename    模块
     * @param operation     接口
     * @param flag          标记
     * @param verson       版本,默认v1
     * @param service      服务,默认services
     */
    public postData(params: object, jwt: boolean, flag: string, verson = 'v1', service = '') {
        const url = process.HOST + '/' + verson  + service;
        params['tag'] = flag
        // const body = {
        //     data: params,
        //     tag: flag,
        // };
        const body = {
            params
        };
        return new Promise((resolve, reject) => {
            this.axios.post(url, params, {
                headers: {isJwt: jwt},
            }).then((res) => {
                this.resultHandle(res, resolve);
            }).catch((err) => {
                reject(err);
                return false
            });
        });

    }

    public post(params: object, verson?:string ,service = '') {
        const url = process.HOST + (service === '' ? '' : '/') + verson + service;
        const body = {
            params
        };
        return new Promise((resolve, reject) => {
            this.axios.post(url, params, {
                headers: {isJwt: true},
            }).then((res) => {
                this.resultHandle(res, resolve);
            }).catch((err) => {
                reject(err);
                return false
            });
        });

    }

    public login(params: object) {
        const url = process.HOST + '/login';
        const body = {
            params
        };
        return new Promise((resolve, reject) => {
            this.axios.post(url, params, {
                headers: {"Content-Type": "multipart/form-data;"}
            }).then((res) => {
                this.resultHandle(res, resolve);
            }).catch((err) => {
                reject(err);
                return false
            });
        });

    }


    /**
     *
     * @param res
     * @param resolve
     */
    public resultHandle(res: any, resolve) {
        if (res.status >= 1) {
            resolve(res);
        } else {
            this.errorHandle(res);
        }
    }


    /**
     * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
     * @param res
     */
    public errorHandle(res: any) {
        ElNotification.warning({
            title: '警告',
            message: res.msg,  // 统一弹服务端提示,我们提示统一由服务端提供
        })
        // 状态码判断
        switch (res.status) {
            case -102:
                break;
            case -152:
                break;
            default:
            // console.log(other);
        }
    }

}
