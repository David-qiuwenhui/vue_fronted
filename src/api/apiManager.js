// API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";
// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
// 发送请求 axios发送请求返回的结果是Promise对象
export const reqCategoryList = () => {
    return requests({ url: "/product/getBaseCategoryList", method: "get" });
};
// 获取banner数据
export const reqGetBannerList = () => {
    return mockRequests.get("/banner");
};
// 获取floor数据
export const reqGetFloorList = () => {
    return mockRequests.get("/floor");
};

// 获取search数据
export const reqSearchList = (params) => {
    return requests({
        url: "/list",
        method: "post",
        data: params,
    });
};

// 获取详情模块商品的数据
export const reqDetailInfo = (skuid) => {
    return requests({
        url: `/item/${skuid}`,
        method: "get",
    });
};

// 加入购物车或修改商品个数
export const reqAddOrUpdateCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: "post",
    });
};

// 获取用户购物车列表数据
export const reqShopCart = () => {
    return requests({
        url: "/cart/cartList",
        method: "get",
    });
};

// 删除购物车中某一个商品的数据
export const reqDeleteCart = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: "delete",
    });
};

// 修改购物车中某个商品的勾选状态
export const reqUpdateChecked = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: "get",
    });
};

// 获取注册页面验证码接口
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: "get",
    });
};

// 注册新用户的接口
export const reqRegister = (data) => {
    return requests({
        url: "/user/passport/register",
        method: "post",
        data: data,
    });
};

// 用户登录的接口 请求体携带参数phone&&passward
export const reqUserLogin = (data) => {
    return requests({
        url: "/user/passport/login",
        method: "post",
        data: data,
    });
};

// 获取用户登录成功以后用户信息的接口
export const reqUserInfo = () => {
    return requests({
        url: "/user/passport/auth/getUserInfo",
        method: "get",
    });
};

// 退出登录业务
export const reqUserLogout = () => {
    return requests({
        url: "/user/passport/logout",
        method: "get",
    });
};

// 获取用户的地址数据
export const reqAddressInfo = () => {
    return requests({
        url: "/user/userAddress/auth/findUserAddressList",
        method: "get",
    });
};

// 获取订单交易页数据
export const reqShopInfo = () => {
    return requests({
        url: "/order/auth/trade",
        method: "get",
    });
};

// 提交订单接口
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: "post",
        data: data,
    });
};

// 获取订单支付页面数据
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: "get",
    });
};

// 获取订单的支付状态
export const reqPayResult = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: "get",
    });
};

// 获取我的订单列表
export const reqMyOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: "get",
    });
};
