import Vue from "vue";
import Vuex from "vuex";
// 使用插件
Vue.use(Vuex);
// 引入子仓库
import home from "./home/HomeStore.js";
import search from "./search/SeachStore.js";
import detail from "./detail/DetailStore.js";
import shopcart from "./shopcart/shopcart.js";
import user from "./user/UserStore.js";
import trade from "./trade/TradeStore.js";
import pay from "./pay/PayStore.js";
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // modules实现Vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
        pay,
    },
});
