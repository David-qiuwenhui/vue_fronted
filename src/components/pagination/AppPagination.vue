<template>
    <div class="pagination">
        <!-- 左半部分 -->
        <button @click="$emit('currentPage', pageNo - 1)" :disabled="pageNo == 1">
            上一页
        </button>
        <button v-if="startAndEnd.start > 1" @click="$emit('currentPage', 1)">1</button>
        <button v-if="startAndEnd.start > 2">···</button>
        <!-- 中部位置 -->
        <!-- <button v-for="page in startAndEnd.end" :key="page" v-if="page >= startAndEnd.start"
            @click="$emit('currentPage', page)" :class="{ active: pageNo == page }">{{ page }}</button> -->
        <template v-for="page in startAndEnd.end">
            <button :key="page" v-if="page >= startAndEnd.start" @click="$emit('currentPage', page)"
                :class="{ active: pageNo == page }">{{ page }}</button>
        </template>
        <!-- 右半部分 -->
        <button v-if="startAndEnd.end < totalPage - 1">···</button>
        <button v-if="startAndEnd.end < totalPage" @click="$emit('currentPage', totalPage)">{{ totalPage }}</button>
        <button @click="$emit('currentPage', pageNo + 1)" :disabled="pageNo == totalPage">下一页</button>
        <button style="margin-left: 30px">共{{ total }}条</button>
    </div>
</template>

<script>
export default {
    name: "AppPagination",
    props: ["total", "pageSize", "pageNo", "pageCount"],
    computed: {
        // 计算分页器总页数
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        // 计算分页器页码参数
        startAndEnd() {
            // 算出中部的连续页码起始和结束位置
            let start = 0, end = 0;
            const { totalPage, pageNo, pageCount } = this;
            // 特殊情况 总页码数小于连续页码数
            if (totalPage < pageCount) {
                start = 1;
                end = totalPage;
            } else {
                // 正常情况 分页器总页数大于连续页码数
                start = pageNo - parseInt(pageCount / 2);
                end = pageNo + parseInt(pageCount / 2);
                // 约束start和end在合理范围内
                // 约束头部
                if (start < 1) {
                    start = 1;
                    end = pageCount;
                }
                // 约束尾部
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - pageCount + 1;
                }
            }
            // 多个参数以对象形式返回
            return { start, end }
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
