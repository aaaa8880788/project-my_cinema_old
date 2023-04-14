<template>
  <div class="login">
    <div class="header">
      <van-icon name="cross" @click.prevent="closePage" />
    </div>
    <!-- 登录内容部分 -->
    <div class="login-container">
      <!-- 登录头部部分 -->
      <div class="login-header">
        <span class="iconfont icon-red-chongwugou"></span>
        <p class="title">仲恺影视</p>
        <i class="eng-title">dog Movie</i>
      </div>
      <!-- 登录内容部分 -->
      <div class="login-content">
        <!-- 登录类型 -->
        <div class="login-type">
          <span
            :class="{ 'active-login-type': loginType }"
            @click.prevent="changeLoginType('验证码')"
            >验证码登录</span
          >
          <span
            :class="{ 'active-login-type': !loginType }"
            @click.prevent="changeLoginType('密码')"
            >密码登录</span
          >
        </div>
        <!-- 登录部分 -->
        <div class="login-main">
          <form>
            <!-- 手机验证码登录部分 -->
            <div class="login-phone" v-show="loginType">
              <!-- 手机输入框部分 -->
              <section class="login-info">
                <input
                  type="number"
                  placeholder="请输入手机号"
                  v-model="phone"
                />
                <button
                  @click.prevent="getValidateCode"
                  :class="['codeBtn', checkPhone ? 'active-code' : '']"
                  v-if="countDown === 0"
                >
                  获取验证码
                </button>
                <div class="codeBtn" v-else>重新获取({{ countDown }}s)</div>
              </section>
              <!-- 验证码输入框部分 -->
              <section class="login-info">
                <input
                  type="number"
                  placeholder="请输入验证码"
                  v-model="phoneCode"
                />
              </section>
              <!-- 提示部分 -->
              <section class="login-info login-tip">
                <span>
                  温馨提示：未注册的手机号，验证后将自动注册账户，且代表已同意
                </span>
                <a href="#"> 《服务协议与隐私政策》 </a>
              </section>
            </div>
            <!-- 密码登录部分 -->
            <div class="login-phone" v-show="!loginType">
              <section class="login-info">
                <input
                  type="text"
                  placeholder="请输入用户名"
                  v-model="username"
                />
              </section>
              <section class="login-info">
                <input
                  type="password"
                  placeholder="请输入密码"
                  v-model="password"
                />
              </section>
              <section class="login-info">
                <!-- 验证码组件 -->
                <input
                  type="text"
                  placeholder="请输入验证码"
                  v-model="passwordCode"
                />
                <div @click.prevent="refreshIdentifyCode">
                  <SIdentify :identifyCode="identifyCode" class="codeBtn">
                  </SIdentify>
                </div>
              </section>
            </div>
            <button class="login-submit" @click.prevent="login">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入登录验证组件
import SIdentify from "@/components/SIdentify";
export default {
  name: "login",
  data() {
    return {
      loginType: true, // 登录类型
      //-------------分割线--------------
      // 验证登录部分
      phone: "", // 手机号
      phoneCode: "", // 输入的手机验证码
      phoneIdentifyCode: "", //生成的手机验证码
      phoneIdentifyCodes: "1234567890", //生成手机验证码的依据
      countDown: 0, //倒计时,获取验证码与重新获取验证码切换状态
      //-------------分割线--------------
      // 密码登录部分
      username: "", //用户名
      password: "", //密码
      passwordCode: "", //输入的验证码
      identifyCode: "", //密码登录图形验证码
      identifyCodes: "1234567890abcdefghizklmnopqrstuvwxyz", //生成图形验证码的依据
    };
  },
  computed: {
    //检查手机格式
    checkPhone() {
      return /^1[3|4|5|6|7|8][0-9]{9}$/.test(this.phone);
    },
  },
  components: { SIdentify },
  methods: {
    //选择登录类型
    changeLoginType(str) {
      if (str === "验证码") {
        return (this.loginType = true);
      }
      this.loginType = false;
    },
    // 登录按钮触发
    async login() {
      // 判断是验证码登录还是密码登录
      if (this.loginType) {
        // 验证码登录
        // 先进行表单验证
        if (!this.phone) {
          return this.$dialog.alert({
            title: "提示",
            message: "请输入手机号码",
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        if (!this.checkPhone) {
          return this.$dialog.alert({
            title: "提示",
            message: "请输入正确格式的手机号码",
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        if (!this.phoneCode) {
          return this.$dialog.alert({
            title: "提示",
            message: "请输入验证码",
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        if (this.phoneCode !== this.phoneIdentifyCode) {
          return this.$dialog.alert({
            title: "提示",
            message: "请输入正确的验证码",
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        // 验证通过,发送登录或注册请求
        // console.log("验证通过");
        const { data } = await this.$http.post("/phoneLogin", {
          phone: this.phone,
        });
        // 后台验证不通过，弹出错误信息
        if (data.status !== "Ok") {
          return this.$dialog.alert({
            title: "提示",
            message: data.message,
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        // 后台验证通过，登录成功
        const { WebToken, message, userId } = data;
        this.$toast({
          type: "success",
          message: message,
        });
        window.localStorage.setItem("WebToken", WebToken);
        window.localStorage.setItem("userId", userId);
        const Path = window.localStorage.getItem("fromPath");
        setTimeout(() => {
          this.$router.replace(Path || "/mine");
        }, 1000);
      } else {
        // 密码登录
        if (!this.username) {
          return this.$dialog.alert({
            title: "提示",
            message: "请输入用户名",
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        if (!this.password) {
          return this.$dialog.alert({
            title: "提示",
            message: "请输入密码",
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        if (!this.passwordCode) {
          return this.$dialog.alert({
            title: "提示",
            message: "请输入验证码",
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        if (this.passwordCode !== this.identifyCode) {
          return this.$dialog.alert({
            title: "提示",
            message: "请输入正确的验证码",
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        // 验证通过,发送登录请求
        // console.log("验证通过");
        const { data } = await this.$http.post("/pwdLogin", {
          name: this.username,
          password: this.password,
        });
        // 后台验证不通过，弹出错误信息
        if (data.status !== "Ok") {
          return this.$dialog.alert({
            title: "提示",
            message: data.message,
            theme: "round-button",
            confirmButtonColor: "#fa209f",
          });
        }
        // 后台验证通过，登录成功
        // console.log(data);
        const { WebToken, message, userId } = data;
        this.$toast({
          type: "success",
          message: message,
        });
        window.localStorage.setItem("WebToken", WebToken);
        window.localStorage.setItem("userId", userId);
        const Path = window.localStorage.getItem("fromPath");
        setTimeout(() => {
          this.$router.replace(Path || "/mine");
        }, 1000);
      }
    },

    // 验证码登录验证码部分
    // 点击获取验证码触发
    getValidateCode() {
      // 计时中无法触发函数
      if (this.countDown !== 0) {
        return;
      }
      // 先判断手机号是否输入正确
      if (!this.checkPhone) {
        return this.$dialog.alert({
          title: "提示",
          message: "请输入正确格式的手机号",
          theme: "round-button",
          confirmButtonColor: "#fa209f",
        });
      }
      this.countDown = 10;
      // 计时10秒
      let timer = setInterval(() => {
        this.countDown--;
        if (this.countDown === 0) {
          clearInterval(timer);
        }
      }, 1000);
      // 在每次获取时清空上次获取的验证码值
      this.phoneIdentifyCode = "";
      // 获取验证码
      this.makePhoneIdentifyCode(4);
      this.$dialog.alert({
        title: "提示",
        message: `手机验证码为:${this.phoneIdentifyCode}`,
        theme: "round-button",
        confirmButtonColor: "#fa209f",
      });
      // console.log(this.phoneIdentifyCode);
    },
    // 生成l位数的随机验证码
    makePhoneIdentifyCode(l) {
      for (let i = 0; i < l; i++) {
        this.phoneIdentifyCode +=
          this.phoneIdentifyCodes[
            this.randomNum(0, this.phoneIdentifyCodes.length)
          ];
      }
    },
    // 密码登录验证码部分
    // 刷新验证码
    refreshIdentifyCode() {
      this.identifyCode = "";
      this.makeIdentifyCode(4);
    },
    // 生成l位数的随机验证码
    makeIdentifyCode(l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    // 生成单个验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 点击左上角×触发
    closePage() {
      const Path = window.localStorage.getItem("fromPath");
      if (Path === "/mine") {
        this.$router.replace("/home");
      } else {
        this.$router.back();
      }
    },
  },
  mounted() {
    // 初始化验证码
    this.identifyCode = "";
    this.makeIdentifyCode(4);
  },
};
</script>

<style lang="less" scoped>
/* 外部容器样式 */
.login {
  width: 100vw;
  height: 100vh;
  /* 渐变背景 */
  background: linear-gradient(125deg, #ffbe32, #b3fffa, #b6f597, #fdff79);
  /* 指定背景图像的大小 */
  background-size: 500%;
  /* 执行动画：动画名 时长 线性的 无限次播放 */
  animation: bgAnimation 15s linear infinite;
}
/* 定义动画 */
@keyframes bgAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
// 顶部返回栏
.header {
  height: 3.8462rem;
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 0 0.7692rem;
}
// 登录内容部分
.login-container {
  margin-top: 1.5385rem;
  // 登录头部部分
  .login-header {
    font-size: 1.5385rem;
    color: #fa209f;
    span {
      font-size: 7.6923rem;
    }
  }
  // 登录内容部分
  .login-content {
    // 登录类型
    .login-type {
      margin: 1.5385rem 0;
      font-size: 1.1538rem;
      font-weight: 700;
      span {
        padding: 0.3846rem 0;
        margin: 0 1.1538rem;
      }
    }
    // 登录部分
    .login-main {
      padding: 0.7692rem 3.0769rem;
      // 1.手机验证码登录与密码登录部分
      // 这俩部分样式都一样
      .login-info {
        width: 30%;
        position: relative;
        width: 100%;
        height: 3.0769rem;
        input {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 0.3846rem;
          padding: 0 1em;
          font-size: 1.0769rem;
          box-sizing: border-box;
          border: 0.0769rem solid transparent;
        }
        input:focus {
          border: 0.0769rem solid #fa209f;
        }
        // 验证码按钮样式
        .codeBtn {
          position: absolute;
          right: 0.7692rem;
          color: rgb(150, 150, 150);
          border: none;
          padding: 0.3846rem;
          background: transparent;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      .login-phone {
        height: 11.5385rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // 提示部分样式
        .login-tip {
          text-align: justify;
          color: rgb(150, 150, 150);
          a {
            color: #fa209f;
          }
        }
      }
      // 登录按钮部分
      .login-submit {
        margin-top: 0.7692rem;
        width: 100%;
        font-size: 1.2308rem;
        padding: 1.1538rem 0;
        color: #fff;
        background-color: #fa209f;
        border: none;
        border-radius: 0.3846rem;
      }
    }
  }
}
// 登录类型选中样式
.active-login-type {
  color: #fa209f;
  border-bottom: 0.3846rem solid #fa209f;
  border-radius: 0.3846rem;
}
// 手机号检测成功获取验证码文字颜色
.active-code {
  color: #fa209f !important;
}
</style>
