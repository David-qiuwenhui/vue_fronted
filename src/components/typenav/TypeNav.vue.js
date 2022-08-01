
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default (await import('vue')).defineComponent({
    name: "TypeNav",
    data() {
        return {
            // 存储用户移上一级分类的索引
            currentIndex: -1,
            show: true,
        };
    },
    // 组件挂载完毕 向服务器发送请求
    mounted() {
        if (this.$route.path != "/home") {
            this.show = false;
        }
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex属性（节流）
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        leaveIndex() {
            this.currentIndex = -1;
            if (this.$route.path != "/home") {
                this.show = false;
            }
        },
        goSearch(event) {
            // 编程式导航 + 事件委派
            let element = event.target;
            // 节点的dateset属性可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } =
                element.dataset;
            // 整理路由跳转传递的参数
            if (categoryname) {
                let location = { name: "search" };
                let query = { categoryName: categoryname };
                // 一级、二级、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                // 路由跳转
                // 判断路由跳转的时候 是否带有params参数 路由跳转时捎带过去
                if (this.$route.params) {
                    location.params = this.$route.params;
                    location.query = query;
                    this.$router.push(location);
                }
            }
        },
        enterShow() {
            if (this.$route.path != "/home") {
                this.show = true;
            }
        },
    },
    computed: {
        // 右侧需要一个函数 当使用这个计算属性时 右侧的函数会立即执行一次
        // 注入一个参数state（大仓库中的数据）
        ...mapState({
            categoryList: (state) => {
                return state.home.categoryList;
            },
        }),
    },
});
