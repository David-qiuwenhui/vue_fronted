import { reqPayInfo, reqPayResult } from "@/api/apiManager";
const state = {
    // 支付页面信息
    payInfo: {},
};
const mutations = {
    GETPAYINFO(state, data) {
        state.payInfo = data;
    },
};
const actions = {
    // 请求获取订单支付页面数据
    async getPayInfo({ commit }, orderId) {
        let result = await reqPayInfo(orderId);
        // console.log(result);
        if (result.code == 200) {
            commit("GETPAYINFO", result.data);
            return "OK";
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
