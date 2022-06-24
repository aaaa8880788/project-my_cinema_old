<template>
  <div class="Plan">
    <!--搜索-->
    <div class="top">
      <el-col :span="15">
        <el-input
          placeholder="请输入电影名"
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
      <el-table border :data="commentsList">
        <el-table-column
          label="电影名"
          width="140"
          show-overflow-tooltip
          prop="movieId.name"
        ></el-table-column>
        <el-table-column
          label="用户名"
          width="140"
          show-overflow-tooltip
          prop="userId.name"
        ></el-table-column>
        <el-table-column
          label="评论时间"
          width="170"
          show-overflow-tooltip
          prop="updatedAt"
        ></el-table-column>
        <el-table-column
          label="用户评分"
          width="80"
          align="center"
          show-overflow-tooltip
          prop="userScore"
        ></el-table-column>
        <el-table-column
          label="评论内容"
          show-overflow-tooltip
          prop="userComment"
        ></el-table-column>
        <el-table-column align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button
              v-show="!scope.row.isPass"
              size="mini"
              @click="passComment(scope.row)"
              >通过</el-button
            >
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
      commentsList: [], //评论列表信息
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
    // 获取评论列表
    async getCommentsList() {
      let res;
      if (!this.searchContent) {
        // 如果搜索框内容为空
        const { data } = await this.$http.get("/rest/comments", {
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
          `/rest/comments/${this.searchContent}`,
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
        this.commentsList = JSON.parse(JSON.stringify(res.data));
      }
      if (res.total) {
        this.queryInfo.total = JSON.parse(JSON.stringify(res.total));
      }
      console.log(this.commentsList);
      // 使用全局过滤器处理一下评论的更新时间
      // 然后再处理一下用户评分
      if (this.commentsList.length != 0) {
        this.commentsList.forEach((item) => {
          item.updatedAt = this.$options.filters.date(
            item.updatedAt,
            "YYYY-MM-DD HH:mm:ss"
          );
          item.createdAt = this.$options.filters.date(
            item.createdAt,
            "YYYY-MM-DD HH:mm:ss"
          );
        });
      }
    },
    // 审核通过
    async passComment(row) {
      row.isPass = 1;
      const { data } = await this.$http.put(`/rest/comment/${row._id}`, row);
      // 后端数据验证不通过
      if (!data.status) {
        return this.$message({
          message: data.data.message,
          type: "error",
        });
      }
      // 后端数据验证通过
      this.$message({
        message: "审核通过成功~",
        type: "success",
      });
      this.getCommentsList();
    },
    // 删除评论
    async handleDelete(row) {
      const confirmResult = await this.$confirm(
        `是否确定要删除该评论:?`,
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
        const data = await this.$http.delete(`/rest/comments/${row._id}`);
        // 删除后，更新列表
        this.getCommentsList();
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
      this.getCommentsList();
    },
    // 搜索框搜索
    async handleSearch() {
      this.getCommentsList();
    },
  },
  created() {
    // 获取评论列表
    this.getCommentsList();
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