<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import TypeNav from "@/components/typenav/TypeNav.vue";
import ListContainer from "@/pages/home/listcontainer/ListContainer.vue";
import Recommend from "@/pages/home/recommend/Recommend.vue";
import Rank from "@/pages/home/rank/Rank.vue";
import Like from "@/pages/home/like/Like.vue";
import Floor from "@/pages/home/floor/Floor.vue";
import Brand from "@/pages/home/brand/Brand.vue";
import { mapState } from "vuex";

export default {
    name: "AppHome",
    components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
    mounted() {
        this.$store.dispatch("getFloorList");
        this.$store.dispatch("getUserInfo");
    },
    computed: {
        ...mapState({
            floorList: (state) => {
                return state.home.floorList;
            },
        }),
    },
};
</script>

<style></style>
