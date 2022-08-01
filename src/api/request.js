// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
import store from "@/store/vuex";

// 利用axios对象的方法create 创建一个axios实例
// request是经过配置的axios
const requests = axios.create({
    /****** 配置对象 ******/
    // 基础路径 发送请求的时候 路径当中会出现api
    baseURL: "/api",
    // 代表请求超时的时间5s
    timeout: 5000,
});

/****** 请求拦截器 ******/
// 在发送请求之前 请求拦截器可以检测到 可以在请求发送出去之前做处理
requests.interceptors.request.use((config) => {
    // config配置对象 对象里的header属性很重要
    // 请求头添加一个字段 提前和后端沟通好
    if (store.state.detail.userId) {
        config.headers.userTempId = store.state.detail.userId;
    }
    // 发送请求时携带token
    // 客户端登录后接收到服务端派发的token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    // 进度条启动
    nprogress.start();
    return config;
});

/****** 响应拦截器 ******/
requests.interceptors.response.use(
    (res) => {
        // 响应成功的回调函数 服务器响应数据回来之后 响应拦截器可以检测到 可以做处理
        // 进度条结束
        nprogress.done();
        return res.data;
    },
    (error) => {
        console.log(error.message);
        // 响应失败的回调函数
        return Promise.reject(new Error("faile"));
    }
);

// 对外暴露
export default requests;
