import {
    reqCategoryList,
    reqGetBannerList,
    reqGetFloorList,
} from "@/api/apiManager";
// home模块的小仓库
const state = {
    // state数据根据服务器接口返回数据进行初始化类型
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    floorList: [],
};
// mutations是唯一修改state的地方
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
};
// actions是用户处理派发action的地方 可以书写异步语句和业务逻辑
const actions = {
    // 通过API里面的接口函数调用 向服务器发送请求 获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("BANNERLIST", result.data);
        }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit("FLOORLIST", result.data);
        }
    },
};
// 计算属性
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
};
