import { reqShopCart, reqDeleteCart, reqUpdateChecked } from "@/api/apiManager";
const state = {
    cartList: [],
};
const mutations = {
    GETSHOPCART(state, data) {
        state.cartList = data;
    },
};
const actions = {
    // 获取购物车的数据
    async getShopCart({ commit }) {
        let result = await reqShopCart();
        if (result.code == 200) {
            commit("GETSHOPCART", result.data);
        }
    },
    // 删除购物车中的某一个商品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code == 200) {
            return "OK";
        } else {
            return Promise.reject();
        }
    },
    // 修改购物车中的某一个商品的勾选状态
    async changeChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject();
        }
    },
    // 修改购物车中的全部商品勾选状态
    changeAllChecked({ commit, state, dispatch }, isChecked) {
        let arr = [];
        // 获取购物车商品的数据 逐个遍历
        state.cartList[0].cartInfoList.forEach((item) => {
            // 调用修改某一个商品的action
            let ps = dispatch("changeChecked", {
                skuId: item.skuId,
                isChecked: isChecked,
            });
            arr.push(ps);
        });
        // 检查arr中所有元素返回的Promise对象是否都为成功
        return Promise.all(arr);
    },
    // 删除购物车中选中的商品
    deleteAllChecked({ commit, state, dispatch }) {
        let arr = [];
        // 获取仓库里面购物车的数据
        state.cartList[0].cartInfoList.forEach((item) => {
            if (item.isChecked == 1) {
                // 商品的勾选状态是勾选的 发请求一个一个删除
                let ps = dispatch("deleteCartById", item.skuId);
                arr.push(ps);
            }
        });
        return Promise.all(arr);
    },
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
};
