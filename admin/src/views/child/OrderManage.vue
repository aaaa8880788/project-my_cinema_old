<template>
  <div class="Plan">
    <!--搜索-->
    <div class="top">
      <el-col :span="15">
        <el-input
          placeholder="请输入影院名"
          class="input-with-select"
          style="width: 100%"
          v-model="searchContent"
          clearable
          @input="handleSearch"
        >
          <el-button slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
    </div>
    <!-- 表格 -->
    <div class="plan-table">
      <el-table border :data="ordersList">
        <el-table-column
          label="影院名"
          width="130"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="用户名"
          width="80"
          show-overflow-tooltip
          prop="userId.name"
        ></el-table-column>
        <el-table-column
          label="电影名"
          width="130"
          show-overflow-tooltip
          prop="movieId.name"
        ></el-table-column>
        <el-table-column
          label="订单时间"
          width="140"
          show-overflow-tooltip
          prop="updatedAt"
        >
          <template slot-scope="scoped">
            <span style="margin-right: 10px">{{ scoped.row.orderDate }}</span>
            <span>{{ scoped.row.orderTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="支付类型"
          width="100"
          align="center"
          show-overflow-tooltip
          prop="userScore"
        >
          <template slot-scope="scoped">
            <span v-show="scoped.row.payType == 1">微信支付</span>
            <span v-show="scoped.row.payType == 2">支付宝支付</span>
            <span v-show="scoped.row.payType == 3">云闪付</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购票数量"
          show-overflow-tooltip
          prop="ticketNum"
        ></el-table-column>
        <el-table-column
          label="支付金额（元）"
          show-overflow-tooltip
          prop="totalPrice"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage"
      :page-size="queryInfo.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="queryInfo.total"
      style="margin-top: 20px"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ordersList: [], //订单列表信息
      // 分页器样式
      queryInfo: {
        // 每页显示的条数
        pageSize: 7,
        // 当前页数
        currentPage: 1,
        // 总页数
        total: 0,
      },
      // 搜索框内容
      searchContent: "",
    };
  },
  methods: {
    // 获取订单列表
    async getordersList() {
      let res;
      if (!this.searchContent) {
        // 如果搜索框内容为空
        const { data } = await this.$http.get("/rest/orders", {
          params: {
            ...this.queryInfo,
          },
        });
        res = data;
        // console.log(res);
      } else {
        // 如果搜索框内容不为空
        // console.log(this.searchContent);
        const { data } = await this.$http.get(
          `/rest/orders/${this.searchContent}`,
          {
            params: {
              ...this.queryInfo,
            },
          }
        );
        res = data;
        // console.log(res);
      }
      // console.log(res);
      if (res.data) {
        this.ordersList = JSON.parse(JSON.stringify(res.data));
      }
      if (res.total) {
        this.queryInfo.total = JSON.parse(JSON.stringify(res.total));
      }
      console.log(this.ordersList);
    },
    // 删除订单
    async handleDelete(row) {
      const confirmResult = await this.$confirm(
        `是否确定要删除该订单:?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const data = await this.$http.delete(`/rest/orders/${row._id}`);
        // 删除后，更新列表
        this.getordersList();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      } else {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    // 分页器当前页面变动时触发
    handleCurrentChange(val) {
      this.queryInfo.currentPage = val;
      this.getordersList();
    },
    // 搜索框搜索
    async handleSearch() {
      this.getordersList();
    },
  },
  created() {
    // 获取订单列表
    this.getordersList();
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 20px;
}
// 海报图片样式
.avatar-uploader-icon {
  width: 276px;
  height: 92px;
  line-height: 92px;
}
.avatar {
  width: 276px;
  height: 92px;
}
</style>