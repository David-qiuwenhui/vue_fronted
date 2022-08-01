import { reqAddressInfo, reqShopInfo, reqSubmitOrder } from "@/api/apiManager";
const state = {
    addressList: [],
    shopInfo: {},
    payId: "",
};
const mutations = {
    GETADDRESS(state, data) {
        state.addressList = data;
    },
    GETSHOPINFO(state, data) {
        state.shopInfo = data;
    },
    SUBMITINFO(state, data) {
        state.payId = data;
    },
};
const actions = {
    // 请求获取收货信息
    async getAddress({ commit }) {
        let result = await reqAddressInfo();
        // console.log(result);
        if (result.code == 200) {
            commit("GETADDRESS", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 请求获取订单商品信息
    async getShopInfo({ commit }) {
        let result = await reqShopInfo();
        // console.log(result);
        if (result.code == 200) {
            commit("GETSHOPINFO", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 请求提交订单信息
    // tradeNo交易编码 data付款人信息
    async submitInfo({ commit }, { tradeNo, data }) {
        // 提交订单的时候 返回一个重要的数据 订单ID
        // 表示当前订单的标识符
        let result = await reqSubmitOrder(tradeNo, data);
        if (result.code == 200) {
            commit("SUBMITINFO", result.data);
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
