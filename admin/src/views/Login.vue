<template>
  <div id="login">
    <div class="box">
      <el-form label-width="50px">
        <h3>影院售票管理系统</h3>
        <el-form-item label="用户">
          <el-input
            v-model="model.name"
            clearable
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            placeholder="请输入密码"
            v-model="model.password"
            show-password
          ></el-input>
        </el-form-item>
        <div class="bottom-btn">
          <el-button type="primary" size="medium" @click="reset"
            >重置</el-button
          >
          <el-button type="primary" size="medium" @click="login"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    reset() {
      this.model.name = "";
      this.model.password = "";
    },
    async login() {
      if (!this.model.name) {
        return this.$message({
          message: "请输入用户名",
          type: "warning",
        });
      }
      if (!this.model.password) {
        return this.$message({
          message: "请输入密码",
          type: "warning",
        });
      }
      const { data } = await this.$http.post("/login", this.model);
      console.log(data);
      // 后台校验成功会给出status为OK,否则校验失败,显示失败信息
      if (!data.status) {
        return this.$message({
          message: data.message,
          type: "error",
        });
      }
      // 登录成功
      this.$message({
        message: "登录成功！",
        type: "success",
      });

      // 本地保存token
      localStorage.token = data.token;
      // 本地保存用户名,用户主页右上角用户名显示
      localStorage.username = this.model.name;
      // 跳转主页
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="less">
#login {
  width: 100vw;
  height: 100vh;
  background: url("../assets/bg_admin.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 500px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0 0 8px 8px #ccc;
  }
}

h3 {
  margin-bottom: 40px;
  font-size: 36px;
  letter-spacing: 5px;
  color: #888;
}
// 底部按钮样式
.bottom-btn {
  display: flex;
  justify-content: center;
}
</style>
