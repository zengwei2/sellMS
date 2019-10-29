/*
* 通用的请求axios
*/
// 引入axios和qs
import axios from 'axios';
import qs from 'qs';

//按需引用element ui组件
import {Message} from 'element-ui';

import local from '@/utils/local';  //引入缓存

//引入默认的接口地址(后台默认接口)
axios.defaults.baseURL = 'http://127.0.0.1:3000';

//请求拦截器
axios.interceptors.request.use( config => {
    // 在请求发送出去之前 带上一些东西 config是请求的配置对象， 如果直接返回 就等于什么都不带,如加入token
    // let token = window.localStorage.getItem('token');  //获取token
    let token = local.get('token')  //获取token

    if(token){
        // 所有的axios请求，在请求发送出去之前 带上token
        config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(response => {
   //响应回来的数据 中间可操作response，如直接返回response,就等于什么都不处理
   //弹出提示框
    let {code,msg} = response.data;
    if(msg){
        if(code === 0){
            Message({
                type:'success',
                message:msg
            })
        }else if(code === 1 || code === 2){
            Message.error(msg)
        }
    }

    return response;
  }, error => {
    // 对响应错误做点什么
    Message.error('网络请求发生错误，请稍后重试');  //服务器关闭/或没网

    return Promise.reject(error);
  })


//封装axios
export default {

    //get请求
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params }).then(res => {
                resolve(res.data) //成功
            }).catch(err => {
                reject(err) // 失败
            })
        })
    },

    //post请求
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params)).then(res => {
                resolve(res.data) //成功
            }).catch(err => {
                reject(err) //失败
            })
        })
    }

}

/*
    get(url,params).then().catch()
    post(url,params).then().catch()

*/
