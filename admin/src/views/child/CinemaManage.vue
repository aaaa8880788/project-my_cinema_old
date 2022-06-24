<template>
  <div class="Cinema">
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
      <el-col :span="2" :offset="1">
        <el-button type="primary" size="small" @click="addCinema"
          >添加影院</el-button
        >
      </el-col>
    </div>
    <!-- 表格 -->
    <div class="cinema-table">
      <el-table border :data="cinemaList">
        <el-table-column
          label="影院名"
          width="200"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="联系电话"
          width="150"
          prop="phone"
        ></el-table-column>
        <el-table-column
          label="地址"
          show-overflow-tooltip
          prop="address"
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
    <!-- 添加或编辑影院对话框 -->
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
          :model="cinemaInfo"
          :rules="cinemaInfoFormrules"
          ref="cinemaInfoForm"
        >
          <el-form-item label="影院名" prop="name">
            <el-col :span="16">
              <el-input
                v-model="cinemaInfo.name"
                placeholder="请输入影院名"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-col :span="16">
              <el-input
                v-model="cinemaInfo.phone"
                placeholder="请输入联系电话"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="影院特色">
            <el-col :span="16">
              <el-input
                v-model="cinemaInfo.desc1"
                placeholder="请输入影院特色，格式为(XX 或者 XX,XX,XX)"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="体验特色">
            <el-col :span="16">
              <el-input
                v-model="cinemaInfo.desc2"
                placeholder="请输入体验特色，格式为(XX 或者 XX,XX,XX)"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="入门门槛" prop="demand">
            <el-col :span="16">
              <el-input
                v-model="cinemaInfo.demand"
                placeholder="请输入入门门槛，格式为(数字)"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-col :span="16">
              <el-input
                type="textarea"
                v-model="cinemaInfo.address"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请填写地址"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="manageCinemaInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 表单验证规则中的phone自定义规则
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入联系电话"));
      } else {
        if (/^1[3|4|5|6|7|8][0-9]{9}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确格式的联系电话"));
        }
      }
    };

    return {
      // 对话框显示标题
      dialogTitle: "",
      // 对话框显示状态
      dialogFormVisible: false,
      // 添加或编辑影院信息
      cinemaInfo: {
        name: "",
        phone: "",
        address: "",
        desc1: "",
        desc2: "",
        demand: "",
      },
      // 影院列表信息
      cinemaList: [],
      // 表单验证规则
      cinemaInfoFormrules: {
        name: [{ required: true, message: "请输入影院名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        demand: [
          {
            required: true,
            message: "请输入入门门槛(数字)",
            trigger: "blur",
          },
        ],
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
      let res;
      if (!this.searchContent) {
        // 如果搜索框内容为空
        const { data } = await this.$http.get("/rest/cinemas", {
          params: {
            ...this.queryInfo,
          },
        });
        res = data;
      } else {
        const { data } = await this.$http.get(
          `/rest/cinemas/${this.searchContent}`,
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
        this.cinemaList = JSON.parse(JSON.stringify(res.data));
      }
      if (res.total) {
        this.queryInfo.total = JSON.parse(JSON.stringify(res.total));
      }
    },
    // 添加影院
    addCinema() {
      // 清空影院列表
      this.cinemaInfo = {};
      this.dialogTitle = "添加影院";
      this.dialogFormVisible = true;
    },
    // 确定对话框
    manageCinemaInfo() {
      this.$refs.cinemaInfoForm.validate(async (valid) => {
        // 表单验证不通过
        if (!valid) {
          return this.$message.error("请合法输入必填信息");
        }
        // 表单验证通过,发送网络请求,先判断时添加影院还是编辑影院
        let data;

        if (this.dialogTitle === "添加影院") {
          data = await this.$http.post("/rest/cinemas", this.cinemaInfo);
        } else {
          data = await this.$http.put(
            `/rest/cinemas/${this.cinemaInfo._id}`,
            this.cinemaInfo
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
        if (this.dialogTitle === "添加影院") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
        if (this.dialogTitle === "编辑影院") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.getCinemaList();
        this.dialogFormVisible = false;
      });
    },
    // 取消对话框
    cancel() {
      // console.log(this.cinemaInfo);
      this.dialogFormVisible = false;
    },
    // 上传完图片处理函数
    afterAvatarUpload(res) {
      // this.cinemaInfo.avatar = res.url;
      // 这里用$set的原因是因为添加影院是,cinemaInfo清空，里面没有avatar属性，而你这里又给这个属性直接赋值，会造成vue响应不了
      this.$set(this.cinemaInfo, "avatar", res.url);
    },
    // 编辑影院
    handleEdit(row) {
      this.dialogTitle = "编辑影院";
      // 这里拿到的row直接赋值是浅拷贝，JSON赋值是深拷贝
      // 如果浅拷贝，Bug：点击编辑出现对话框修改数据，点击取消列表数据会变
      // 但其实并没发请求，刷新后又变回原样
      this.cinemaInfo = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      // console.log(this.cinemaInfo);
    },
    // 注销影院
    async handleDelete(row) {
      const confirmResult = await this.$confirm(
        `是否确定要删除影院:${row.name}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const data = await this.$http.delete(`/rest/cinemas/${row._id}`);
        // 删除后，更新列表
        this.getCinemaList();
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
      this.getCinemaList();
    },
    // 搜索框搜索
    async handleSearch() {
      this.getCinemaList();
    },
  },
  created() {
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