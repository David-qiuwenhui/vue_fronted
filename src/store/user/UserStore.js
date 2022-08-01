import {
    reqGetCode,
    reqRegister,
    reqUserLogin,
    reqUserInfo,
    reqUserLogout,
} from "@/api/apiManager";
import { setToken, getToken } from "@/utils/token";

const state = {
    valCode: "",
    token: getToken(),
    nickName: "",
};
const mutations = {
    GETCODE(state, data) {
        state.valCode = data;
    },
    USERLOGIN(state, data) {
        state.token = data;
    },
    GETUSERINFO(state, data) {
        state.nickName = data;
    },
    CLEAR(state) {
        // 清除仓库相关用户信息
        state.token = "";
        state.nickName = "";
        // 清除浏览器本地存储token数据
        localStorage.removeItem("TOKEN");
    },
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phoneNumber) {
        let result = await reqGetCode(phoneNumber);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return "ok";
        } else {
            return Promise.reject();
        }
    },
    // 注册新用户
    async registerUser({ commit }, obj) {
        // 注册新用户没有返回data
        let result = await reqRegister(obj);
        if (result.code == 200) {
            // 注册成功
            return "ok";
        } else {
            // 注册失败
            return Promise.reject(new Error(result.message));
        }
    },
    // 用户登录的地方（重要）
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // 登录成功
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            // 本地持久化存储token
            setToken(result.data.token);
            return "ok";
        } else {
            // 登录失败
            return Promise.reject(new Error(result.message));
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data.nickName);
            return "ok";
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 退出登录的业务
    async userLogout({ commit }) {
        // 发送消息通知服务器销毁当前token
        let result = await reqUserLogout();
        if (result.code == 200) {
            commit("CLEAR");
            return "ok";
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
};
