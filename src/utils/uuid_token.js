import { v4 as uuidv4 } from "uuid";
// 生成一个随机字符串 并做游客身份本地存储
export const getUUID = () => {
    // 先从本地获取uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    // 第一次生成uuid并存储
    if (!uuid_token) {
        // 生成游客临时身份
        uuid_token = uuidv4();
        // 本地存储
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    return uuid_token;
};
