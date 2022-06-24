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
      <el-col :span="2" :offset="1">
        <el-button type="primary" size="small" @click="addMovie"
          >添加宣传</el-button
        >
      </el-col>
    </div>
    <!-- 表格 -->
    <div class="plan-table">
      <el-table border :data="adList">
        <el-table-column
          label="电影名"
          width="200"
          show-overflow-tooltip
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column label="宣传海报" width="300" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.adImage" style="height: 5rem; width: 100%" />
          </template>
        </el-table-column>
        <el-table-column
          label="上映时间"
          width="150"
          show-overflow-tooltip
          prop="movieId.time"
          align="center"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >撤销</el-button
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
    <!-- 添加或编辑排片对话框 -->
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        v-if="dialogFormVisible"
        :showClose="false"
        :close-on-click-modal="false"
        top="10vh"
      >
        <el-form
          label-width="150px"
          :model="adInfo"
          :rules="adInfoFormrules"
          ref="planInfoForm"
        >
          <el-form-item label="电影名" prop="movieId">
            <el-col :span="16">
              <el-select
                v-model="adInfo.movieId"
                clearable
                placeholder="请选择电影名"
                style="width: 100%"
                @change="UpdateMovieName"
              >
                <el-option
                  v-for="item in movieList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="宣传海报" prop="adImage">
            <el-col :span="16">
              <el-upload
                class="avatar-uploader"
                :action="`${uploadUrl}/adImage`"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterAdImageUpload"
              >
                <img
                  v-if="adInfo.adImage"
                  :src="adInfo.adImage"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="managePlanInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 对话框显示标题
      dialogTitle: "",
      // 对话框显示状态
      dialogFormVisible: false,
      // 添加或编辑宣传信息
      adInfo: {
        name: "",
        movieId: "",
        adImage: "",
      },
      // 宣传列表数据
      adList: [],
      // 电影列表数据
      movieList: [],
      // 表单验证规则
      adInfoFormrules: {
        movieId: [
          { required: true, message: "电影名不能为空", trigger: "change" },
        ],
        adImage: [
          { required: true, message: "请上传电影宣传海报", trigger: "blur" },
        ],
      },
      // 分页器样式
      queryInfo: {
        // 每页显示的条数
        pageSize: 3,
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
    // 电影宣传海报上传成功
    afterAdImageUpload(res) {
      this.$set(this.adInfo, "adImage", res.url);
    },
    // 选中电影名后(得到是电影id),将电影名赋值给name
    UpdateMovieName(val) {
      this.adInfo.name = "";
      // console.log(val);
      this.movieList.some((item) => {
        if (item._id == val) {
          this.adInfo.name = item.name;
          return item._id == val;
        }
      });
      console.log(this.adInfo);
    },
    // 获取电影列表
    async getMovieList() {
      const { data } = await this.$http.get("/rest/movies");
      this.movieList = data.allData;
      // console.log("电影列表数据", this.movieList);
    },
    // 获取宣传列表
    async getAdList() {
      let res;
      if (!this.searchContent) {
        // 如果搜索框内容为空
        const { data } = await this.$http.get("/rest/advertises", {
          params: {
            ...this.queryInfo,
          },
        });
        res = data;
        // console.log(res);
      } else {
        // 如果搜索框内容不为空
        const { data } = await this.$http.get(
          `/rest/advertises/${this.searchContent}`,
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
        this.adList = JSON.parse(JSON.stringify(res.data));
      }
      if (res.total) {
        this.queryInfo.total = JSON.parse(JSON.stringify(res.total));
      }
      // console.log("宣传列表数据", this.adList);
    },
    // 添加宣传
    addMovie() {
      // 清空排片列表
      this.adInfo = {};
      this.dialogTitle = "添加宣传";
      this.dialogFormVisible = true;
    },
    // 确定对话框
    managePlanInfo() {
      this.$refs.planInfoForm.validate(async (valid) => {
        // 表单验证不通过
        if (!valid) {
          return this.$message.error("请合法输入必填信息");
        }
        // 表单验证通过,发送网络请求,先判断时添加排片还是编辑排片
        let data;

        if (this.dialogTitle === "添加宣传") {
          data = await this.$http.post("/rest/advertises", this.adInfo);
        } else {
          data = await this.$http.put(
            `/rest/advertises/${this.adInfo._id}`,
            this.adInfo
          );
        }
        // 后端数据验证不通过
        if (!data.data.status) {
          return this.$message({
            message: data.data.message,
            type: "error",
          });
        }
        // 后端数据验证通过
        if (this.dialogTitle === "添加宣传") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
        if (this.dialogTitle === "编辑宣传") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.getAdList();
        this.dialogFormVisible = false;
        // 清空adInfo数据
        this.adInfo = {};
      });
    },
    // 取消对话框
    cancel() {
      // console.log(this.adInfo);
      this.dialogFormVisible = false;
      // 清空adInfo数据
      this.adInfo = {};
    },
    // 编辑宣传
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.dialogTitle = "编辑宣传";
      // 这里拿到的row直接赋值是浅拷贝，JSON赋值是深拷贝
      // 如果浅拷贝，Bug：点击编辑出现对话框修改数据，点击取消列表数据会变
      // 但其实并没发请求，刷新后又变回原样
      this.adInfo = JSON.parse(JSON.stringify(row));
      this.adInfo.movieId = this.adInfo.movieId._id;
      console.log(this.adInfo);
    },
    // 删除宣传
    async handleDelete(row) {
      const confirmResult = await this.$confirm(
        `是否确定要撤销电影<${row.name}>的宣传?`,
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
        const data = await this.$http.delete(`/rest/advertises/${row._id}`);
        // 删除后，更新列表
        this.getAdList();
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
      this.getAdList();
    },
    // 搜索框搜索
    async handleSearch() {
      this.getAdList();
    },
  },
  created() {
    // 获取电影列表
    this.getMovieList();
    // 获取宣传列表
    this.getAdList();
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