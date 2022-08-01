import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "@/router/index";
// 引入三级联动组件（全局组件）
import TypeNav from "@/components/typenav/TypeNav";
// 引入轮播图组件（全局组件）
import Carousel from "@/components/carousel/Carousel";
import AppPagination from "@/components/pagination/AppPagination";
// 引入消息弹框message box
import { MessageBox } from "element-ui";
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
// 引入vuex仓库
import store from "@/store/vuex";
// 引入MockServer.js mock数据
import "@/mock/mockServer";
// 第一个参数：全局组件的名字 第二个参数：组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(AppPagination.name, AppPagination);
Vue.config.productionTip = false;
// 将项目全部请求函数引入进来
import * as http from "@/api/apiManager";
// // 引入图片懒加载插件
// import VueLazyload from "vue-lazyload";
// import lazyPic from "@/assets/logo.png";
// Vue.use(VueLazyload, {
//     loading: lazyPic,
// });

new Vue({
    render: (h) => h(App),
    beforeCreate() {
        // 注册全局事件总线
        Vue.prototype.$bus = this;
        // 通过Vue.prototype原型对象 将全部请求函数挂载到原型函数对象上 vue_component就可以使用请求函数
        Vue.prototype.$http = http;
    },
    // 注册路由
    router,
    // 注册仓库 组件实例的身上会添加一个$store属性
    store,
}).$mount("#app");
