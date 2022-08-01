<template>
    <!-- 右侧内容 -->
    <div class="order-right">
        <div class="order-content">
            <div class="title">
                <h3>我的订单</h3>
            </div>
            <div class="chosetype">
                <table>
                    <thead>
                        <tr>
                            <th width="29%">商品</th>
                            <th width="31%">订单详情</th>
                            <th width="13%">收货人</th>
                            <th>金额</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <!-- 展示订单的位置 -->
            <div class="orders">
                <table
                    class="order-item"
                    v-for="order in orderList"
                    :key="order.id"
                >
                    <!-- 订单的抬头信息 -->
                    <thead>
                        <tr>
                            <th colspan="5">
                                <span class="ordertitle"
                                    >{{ order.createTime }} 订单编号：{{
                                        order.outTradeNo
                                    }}
                                    <span class="pull-right delete"
                                        ><img
                                            src="../images/delete.png" /></span
                                ></span>
                            </th>
                        </tr>
                    </thead>
                    <!-- 每个订单的单条商品信息 -->
                    <tbody>
                        <tr
                            v-for="(item, index) in order.orderDetailList"
                            :key="item.id"
                        >
                            <td width="60%">
                                <div class="typographic">
                                    <img
                                        :src="item.imgUrl"
                                        style="width: 100px; height: 100px"
                                    />
                                    <a href="#" class="block-text">{{
                                        item.skuName
                                    }}</a>
                                    <span>x{{ item.skuNum }}</span>
                                    <a href="#" class="service">售后申请</a>
                                </div>
                            </td>
                            <td
                                :rowspan="order.orderDetailList.length"
                                width="8%"
                                class="center"
                                v-show="index == 0"
                            >
                                {{ order.consignee }}
                            </td>
                            <td
                                :rowspan="order.orderDetailList.length"
                                width="13%"
                                class="center"
                                v-show="index == 0"
                            >
                                <ul class="unstyled">
                                    <li>总金额¥{{ order.totalAmount }}.00</li>
                                    <li>在线支付</li>
                                </ul>
                            </td>
                            <td
                                :rowspan="order.orderDetailList.length"
                                width="8%"
                                class="center"
                                v-show="index == 0"
                            >
                                <a href="#" class="btn"
                                    >{{ order.orderStatusName }}
                                </a>
                            </td>
                            <td
                                :rowspan="order.orderDetailList.length"
                                width="13%"
                                class="center"
                                v-show="index == 0"
                            >
                                <ul class="unstyled">
                                    <li>
                                        <a href="mycomment.html" target="_blank"
                                            >评价|晒单</a
                                        >
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 分页器组件 -->
            <div class="choose-order">
                <!-- total分页器总共展示的订单数量
                pageSize 单页展示数据的数量
                pageNo 当前页码
                pageCount 分页器连续页码数量
                currentPage 自定义事件 父组件获取分页器当前页码
                -->
                <AppPagination
                    :total="total"
                    :pageSize="limit"
                    :pageNo="page"
                    :pageCount="5"
                    @currentPage="currentPage"
                ></AppPagination>
            </div>
        </div>
        <!--猜你喜欢-->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike01.png" />
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike02.png" />
                    </div>
                    <div class="attr">
                        Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike03.png" />
                    </div>
                    <div class="attr">
                        DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike04.png" />
                    </div>
                    <div class="attr">
                        DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { reqMyOrderList } from "@/api/apiManager";
export default {
    name: "MyOrder",
    data() {
        return {
            page: 0, // 当前页码
            limit: 3, // 单个页面展示的订单数量
            orderList: [], // 订单数据列表
            total: 0, // 分页器一共展示的订单数量
        };
    },
    mounted() {
        // 组件挂载完毕获取当前订单页面数据
        this.getData();
    },
    methods: {
        // 请求获取我的订单数据
        async getData() {
            const { page, limit } = this;
            let result = await reqMyOrderList(page, limit);
            if (result.code == 200) {
                this.orderList = result.data.records;
                this.total = result.data.total;
            }
        },
        // 父子组件自定义事件通信 父组件获取分页器当前页码
        currentPage(page) {
            // 更新页码参数
            this.page = page;
            // 再次发送请求获取当前订单页面数据
            this.getData();
        },
    },
};
</script>

<style></style>
