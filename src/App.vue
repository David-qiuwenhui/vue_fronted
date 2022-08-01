<template>
    <div>
        <AppHeader></AppHeader>
        <router-view></router-view>
        <AppFooter v-show="$route.meta.show"></AppFooter>
    </div>
</template>

<script>
import AppHeader from "./components/header/AppHeader";
import AppFooter from "./components/footer/AppFooter";

export default {
    name: "App",
    components: {
        AppHeader,
        AppFooter,
    },
    mounted() {
        // 派发一个action 通知vuex发送请求 获取商品分类的三级列表数据 存储于仓库当中
        this.$store.dispatch("categoryList");
    },
};
</script>

<style></style>
