// 引入插件 安装插件
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store/vuex";

Vue.use(VueRouter);
// 重写push方法
// location告诉原来的push方法往哪里跳转 resolve成功回调 reject失败回调
// call和apply的区别
// 相同点 都可以调用函数一次 都可以篡改函数的上下文一次
// 不同点 call和apply传递参数时，call传递参数使用逗号隔开 apply方法执行时传递数组参数
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};

// 暴露VueRouter类的实例
const router = new VueRouter({
    // 配置路由
    routes: routes,
    // 设置滚动行为（滚动条的位置）
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };
    },
});
export default router;

/****** 全局前置守卫 ******/
router.beforeEach(async (to, from, next) => {
    let hasToken = store.state.user.token;
    let hasNickName = store.state.user.nickName;
    // 判断用户是否登录
    if (hasToken) {
        if (to.path == "/login" || to.path == "/register") {
            // 用户登陆了 不能再跳转到login路由
            next("/home");
        } else {
            // 用户登录了 判断是否有用户信息（如果token过期了服务器不能返回getUserInfo）
            if (hasNickName) {
                // 除/login外的路由都可以跳转
                next();
            } else {
                try {
                    // 发请求获取用户信息后再放行
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token过期 退出登录清空信息再跳转至登录页面
                    await store.dispatch("userLogout");
                    next("/login");
                }
            }
        }
    } else {
        // 用户未登录 不能获取到token
        // 客户端以游客身份访问服务端
        // 不能访问的路由 /trade /pay /paysuccess /center /center/teamorder /center/myorder
        let toPath = to.path;
        if (
            toPath.indexOf("trade") != -1 ||
            toPath.indexOf("pay") != -1 ||
            toPath.indexOf("center") != -1
        ) {
            // 利用router的地址栏进行重定向操作 先登录再进行目标页面跳转
            next("/login?redirect=" + toPath);
        } else {
            next();
        }
    }
});
