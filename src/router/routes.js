/*** 已使用路由懒加载引入
// 引入路由组件
// import AppHome from "@/pages/home/AppHome";
import AppSearch from "@/pages/search/AppSearch";
import AppLogin from "@/pages/login/AppLogin";
import AppRegister from "@/pages/register/AppRegister";
import AppDetail from "@/pages/detail/AppDetail";
import AddCartSuccess from "@/pages/AddCartSuccess/AddCartSuccess";
import ShopCart from "@/pages/ShopCart/ShopCart";
import AppTrade from "@/pages/trade/AppTrade";
import AppPay from "@/pages/pay/AppPay";
import PaySuccess from "@/pages/PaySuccess/PaySuccess";
import AppCenter from "@/pages/center/AppCenter";
// 引入二级路由组件
import MyOrder from "@/pages/center/myOrder/MyOrder";
import GroupOrder from "@/pages/center/groupOrder/GroupOrder";
*/

// 路由的懒加载函数
// const AppHome = () => {
//     return import("@/pages/home/AppHome");
// };

export default [
    {
        path: "/home",
        component: () => import("@/pages/home/AppHome"), // 路由的懒加载
        meta: { show: true },
    },
    {
        path: "/search/:keyword?",
        name: "search",
        component: () => import("@/pages/search/AppSearch"),
        meta: { show: true },
        props: true,
    },
    {
        path: "/login",
        component: () => import("@/pages/login/AppLogin"),
        meta: { show: false },
    },
    {
        path: "/register",
        component: () => import("@/pages/register/AppRegister"),
        meta: { show: false },
    },
    {
        path: "/detail/:skuid",
        component: () => import("@/pages/detail/AppDetail"),
        meta: { show: true },
    },
    {
        // 重定向到首页
        path: "/",
        redirect: "/home",
    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: () => import("@/pages/AddCartSuccess/AddCartSuccess"),
        meta: { show: true },
    },
    {
        path: "/shopcart",
        component: () => import("@/pages/ShopCart/ShopCart"),
        meta: { show: true },
    },
    {
        path: "/trade",
        component: () => import("@/pages/trade/AppTrade"),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        path: "/pay",
        component: () => import("@/pages/pay/AppPay"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        path: "/paysuccess",
        component: () => import("@/pages/PaySuccess/PaySuccess"),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == "/pay") {
                next();
            } else {
                next(false);
            }
        },
    },
    {
        path: "/center",
        component: () => import("@/pages/center/AppCenter"),
        meta: { show: true },
        children: [
            {
                path: "myorder",
                component: () => import("@/pages/center/myOrder/MyOrder"),
            },
            {
                path: "grouporder",
                component: () => import("@/pages/center/groupOrder/GroupOrder"),
            },
            {
                path: "/center",
                redirect: "/center/myorder",
            },
        ],
    },
];
