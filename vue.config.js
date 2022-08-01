const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
});

module.exports = {
    // 关闭eslint
    lintOnSave: false,
    // 代理跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn",
            },
        },
    },
};
