<template>
  <div class="User">
    <!--搜索-->
    <div class="top">
      <el-col :span="15">
        <el-input
          placeholder="请输入用户名"
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
        <el-button type="primary" size="small" @click="addUser"
          >添加用户</el-button
        >
      </el-col>
    </div>
    <!-- 表格 -->
    <div class="user-table">
      <el-table border :data="userList">
        <el-table-column label="头像" width="100" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="height: 3rem; width: 3rem" />
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          width="100"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="昵称"
          width="100"
          show-overflow-tooltip
          prop="username"
        ></el-table-column>
        <el-table-column label="性别" width="60" prop="sex"></el-table-column>
        <el-table-column
          label="手机"
          width="120"
          prop="phone"
        ></el-table-column>
        <el-table-column
          label="个人签名"
          show-overflow-tooltip
          prop="sign"
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
              >注销</el-button
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
    <!-- 添加或编辑用户对话框 -->
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        v-if="dialogFormVisible"
        :showClose="false"
        :close-on-click-modal="false"
        top="5vh"
      >
        <el-form
          label-width="80px"
          :model="userInfo"
          :rules="userInfoFormrules"
          ref="userInfoForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-col :span="16">
              <el-input
                v-model="userInfo.name"
                placeholder="请输入用户名"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="昵称">
            <el-col :span="16">
              <el-input
                v-model="userInfo.username"
                placeholder="请输入昵称"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="头像">
            <el-col :span="16">
              <el-upload
                class="avatar-uploader"
                :action="`${uploadUrl}/avatar`"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterAvatarUpload"
              >
                <img
                  v-if="userInfo.avatar"
                  :src="userInfo.avatar"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-col :span="16">
              <el-input
                v-model="userInfo.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-col :span="16">
              <el-input
                v-model="userInfo.password"
                show-password
                placeholder="请输入密码"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-col :span="16">
              <el-select
                v-model="userInfo.sex"
                placeholder="请选择性别"
                style="width: 100%"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="16">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="userInfo.birthday"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="个人签名">
            <el-col :span="16">
              <el-input
                type="textarea"
                v-model="userInfo.sign"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请填写个人签名"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="manageUserInfo">确 定</el-button>
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
        callback(new Error("请输入手机号码"));
      } else {
        if (/^1[3|4|5|6|7|8][0-9]{9}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确格式的手机号码"));
        }
      }
    };
    return {
      // 对话框显示标题
      dialogTitle: "",
      // 对话框显示状态
      dialogFormVisible: false,
      // 添加或编辑用户信息
      userInfo: {
        username: "",
        name: "",
        password: "",
        avatar: "",
        phone: "",
        sex: "",
        sign: "",
        birthday: "",
      },
      // 用户列表信息
      userList: [],
      // 表单验证规则
      userInfoFormrules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      // 分页器样式
      queryInfo: {
        // 每页显示的条数
        pageSize: 5,
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
    // 获取用户列表
    async getUserList() {
      let res;
      if (!this.searchContent) {
        // 如果搜索框内容为空
        const { data } = await this.$http.get("/rest/users", {
          params: {
            ...this.queryInfo,
          },
        });
        res = data;
      } else {
        const { data } = await this.$http.get(
          `/rest/users/${this.searchContent}`,
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
        this.userList = JSON.parse(JSON.stringify(res.data));
      }
      if (res.total) {
        this.queryInfo.total = JSON.parse(JSON.stringify(res.total));
      }
    },
    // 添加用户
    addUser() {
      // 清空用户列表
      this.userInfo = {};
      this.dialogTitle = "添加用户";
      this.dialogFormVisible = true;
    },
    // 确定对话框
    manageUserInfo() {
      this.$refs.userInfoForm.validate(async (valid) => {
        // 表单验证不通过
        if (!valid) {
          return this.$message.error("请合法输入必填信息");
        }
        // 表单验证通过,发送网络请求,先判断时添加用户还是编辑用户
        let data;
        if (this.dialogTitle === "添加用户") {
          // 昵称没填时，默认为用户名
          if (!this.userInfo.username) {
            this.userInfo.username = this.userInfo.name;
          }
          data = await this.$http.post("/rest/users", this.userInfo);
        } else {
          data = await this.$http.put(
            `/rest/users/${this.userInfo._id}`,
            this.userInfo
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
        if (this.dialogTitle === "添加用户") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
        if (this.dialogTitle === "编辑用户") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.getUserList();
        this.dialogFormVisible = false;
      });
    },
    // 取消对话框
    cancel() {
      // console.log(this.userInfo);
      this.dialogFormVisible = false;
    },
    // 上传完图片处理函数
    afterAvatarUpload(res) {
      // this.userInfo.avatar = res.url;
      // 这里用$set的原因是因为添加用户是,userInfo清空，里面没有avatar属性，而你这里又给这个属性直接赋值，会造成vue响应不了
      this.$set(this.userInfo, "avatar", res.url);
    },
    // 编辑用户
    handleEdit(row) {
      this.dialogTitle = "编辑用户";
      // 这里拿到的row直接赋值是浅拷贝，JSON赋值是深拷贝
      // 如果浅拷贝，Bug：点击编辑出现对话框修改数据，点击取消列表数据会变
      // 但其实并没发请求，刷新后又变回原样
      this.userInfo = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
      // console.log(this.userInfo);
    },
    // 注销用户
    async handleDelete(row) {
      const confirmResult = await this.$confirm(
        `是否确定要注销用户:${row.name}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const data = await this.$http.delete(`/rest/users/${row._id}`);
        // 删除后，更新列表
        this.getUserList();
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
      this.getUserList();
    },
    // 搜索框搜索
    async handleSearch() {
      this.getUserList();
    },
  },
  created() {
    this.getUserList();
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