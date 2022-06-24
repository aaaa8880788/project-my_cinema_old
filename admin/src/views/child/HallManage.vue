<template>
  <div class="Hall">
    <!--搜索-->
    <div class="top">
      <el-col :span="15">
        <el-input
          placeholder="请输入影厅名"
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
        <el-button type="primary" size="small" @click="addHall"
          >添加影厅</el-button
        >
      </el-col>
    </div>
    <!-- 表格 -->
    <div class="hall-table">
      <el-table border :data="hallList">
        <el-table-column
          label="影院名"
          width="200"
          show-overflow-tooltip
          prop="cinema.name"
        ></el-table-column>
        <el-table-column
          label="影院电话"
          width="150"
          prop="cinema.phone"
        ></el-table-column>
        <el-table-column
          label="影厅名"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
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
    <!-- 添加或编辑影厅对话框 -->
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        v-if="dialogFormVisible"
        :showClose="false"
        :close-on-click-modal="false"
        top="20vh"
      >
        <el-form
          label-width="80px"
          :model="hallInfo"
          :rules="hallInfoFormrules"
          ref="hallInfoForm"
        >
          <el-form-item label="影院名" prop="cinema">
            <el-col :span="16">
              <el-select
                v-model="hallInfo.cinema"
                clearable
                placeholder="请选择影院名"
                style="width: 100%"
                :disabled="cinemaDisabled"
              >
                <el-option
                  v-for="item in cinemaList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="影厅名" prop="name">
            <el-col :span="16">
              <el-input
                v-model="hallInfo.name"
                placeholder="请输入影厅名"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="manageHallInfo">确 定</el-button>
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
      // 添加或编辑影厅信息
      hallInfo: {
        name: "",
        cinema: "",
      },
      // 影院名选择器禁用状态
      cinemaDisabled: false,
      // 影厅列表数据
      hallList: [],
      // 影院列表数据
      cinemaList: [],
      // 表单验证规则
      hallInfoFormrules: {
        cinema: [
          { required: true, message: "请选择影院名", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入影厅名", trigger: "blur" }],
      },
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
    // 获取影院列表
    async getCinemaList() {
      const { data } = await this.$http.get("/rest/cinemas");
      this.cinemaList = data.allData;
      // console.log(this.cinemaList);
    },
    // 获取影厅列表
    async getHallList() {
      let res;
      if (!this.searchContent) {
        // 如果搜索框内容为空
        const { data } = await this.$http.get("/rest/halls", {
          params: {
            ...this.queryInfo,
          },
        });
        res = data;
      } else {
        // 如果搜索框内容不为空
        const { data } = await this.$http.get(
          `/rest/halls/${this.searchContent}`,
          {
            params: {
              ...this.queryInfo,
            },
          }
        );
        res = data;
      }
      // console.log(res);
      if (res.data) {
        this.hallList = JSON.parse(JSON.stringify(res.data));
      }
      if (res.total) {
        this.queryInfo.total = JSON.parse(JSON.stringify(res.total));
      }
    },
    // 添加影厅
    addHall() {
      // 清空影厅列表
      this.hallInfo = {};
      // 影院选择开启
      this.cinemaDisabled = false;
      this.dialogTitle = "添加影厅";
      this.dialogFormVisible = true;
    },
    // 确定对话框
    manageHallInfo() {
      this.$refs.hallInfoForm.validate(async (valid) => {
        // 表单验证不通过
        if (!valid) {
          return this.$message.error("请合法输入必填信息");
        }
        // 表单验证通过,发送网络请求,先判断时添加影厅还是编辑影厅
        let data;

        if (this.dialogTitle === "添加影厅") {
          data = await this.$http.post("/rest/halls", this.hallInfo);
        } else {
          data = await this.$http.put(
            `/rest/halls/${this.hallInfo._id}`,
            this.hallInfo
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
        if (this.dialogTitle === "添加影厅") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
        if (this.dialogTitle === "编辑影厅") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.getHallList();
        this.dialogFormVisible = false;
      });
    },
    // 取消对话框
    cancel() {
      // console.log(this.hallInfo);
      this.dialogFormVisible = false;
    },
    // 上传完图片处理函数
    afterAvatarUpload(res) {
      // this.hallInfo.avatar = res.url;
      // 这里用$set的原因是因为添加影厅是,hallInfo清空，里面没有avatar属性，而你这里又给这个属性直接赋值，会造成vue响应不了
      this.$set(this.hallInfo, "avatar", res.url);
    },
    // 编辑影厅
    handleEdit(row) {
      // 影院选择禁用
      this.cinemaDisabled = true;
      this.dialogTitle = "编辑影厅";
      // 这里拿到的row直接赋值是浅拷贝，JSON赋值是深拷贝
      // 如果浅拷贝，Bug：点击编辑出现对话框修改数据，点击取消列表数据会变
      // 但其实并没发请求，刷新后又变回原样
      this.hallInfo = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      // console.log(this.hallInfo);
    },
    // 删除影厅
    async handleDelete(row) {
      const confirmResult = await this.$confirm(
        `是否确定要删除影厅:${row.name}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const data = await this.$http.delete(`/rest/halls/${row._id}`);
        // 删除后，更新列表
        this.getHallList();
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
      this.getHallList();
    },
    // 搜索框搜索
    async handleSearch() {
      this.getHallList();
    },
  },
  created() {
    // 获取影厅列表
    this.getHallList();
    // 获取影院列表
    this.getCinemaList();
  },
};
</script>

<style lang="less">
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 20px;
}
</style>