import { reqDetailInfo, reqAddOrUpdateCart } from "@/api/apiManager";
import { getUUID } from "@/utils/uuid_token";
const state = {
    goodInfo: {},
    userId: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const actions = {
    // 请求商品的详情数据
    async getGoodInfo({ commit }, skuid) {
        let result = await reqDetailInfo(skuid);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    // 请求添加商品至购物车或更新购物车
    async addOrUpdateCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateCart(skuId, skuNum);
        if (result.code == 200) {
            // 加入购物车成功
            return "OK";
        } else {
            // 加入购物车失败
            return Promise.reject();
        }
    },
};
const getters = {
    // 简化路径导航的信息
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 简化产品售卖的属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
};
