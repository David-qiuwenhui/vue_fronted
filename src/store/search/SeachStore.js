import { reqSearchList } from "@/api/apiManager";
// search模块的仓库
const state = {
    // 仓库的初始状态
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // reqSearchList函数在调用获取服务器数据的时候 至少传递一个空对象参数
        let result = await reqSearchList(params);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    },
};
// 计算属性
// 简化仓库中的数据 方便组件进行获取
const getters = {
    // 形参state是当前仓库中的state
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
};
