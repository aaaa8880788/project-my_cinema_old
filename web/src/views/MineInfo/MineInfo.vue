<template>
  <div class="MineInfo">
    <!-- 顶部topBar部分 -->
    <TopBar bgc="#fff" centerContent="我的资料" @backIconClick="backIconClick">
    </TopBar>
    <div class="main">
      <!-- 头像 -->
      <div class="avatar public">
        <div class="left" @click="showUsernamePicker = true">
          <span class="title">昵称</span>
          <span class="ellipsis content">{{ userInfo.username }}</span>
        </div>
        <div class="right">
          <van-uploader :after-read="afterImage">
            <img :src="userInfo.avatar" />
          </van-uploader>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 简介 -->
      <div class="sign public" @click="showSignPicker = true">
        <div class="left">
          <span class="title">简介</span>
          <span class="ellipsis content">{{ userInfo.sign }}</span>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 性别 -->
      <div class="sex public">
        <div class="left">
          <span>性别</span>
        </div>
        <div class="right">
          <span>
            <van-field
              input-align="right"
              readonly
              clickable
              :value="userInfo.sex"
              placeholder="选择性别"
              @click="showSexPicker = true"
            />
          </span>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 手机 -->
      <div class="phone public" @click="phoneClick">
        <div class="left">
          <span>手机</span>
        </div>
        <div class="right">
          <span> {{ userInfo.phone }} </span>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 生日 -->
      <div class="birthday public">
        <div class="left">
          <van-cell
            title="生日"
            :value="userInfo.birthday"
            @click="showBirthdayPicker = true"
            title-class="birthday-left"
            value-class="birthday-right"
            style="padding: 0"
          />
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <!-- 按钮部分 -->
    <div class="Btn">
      <!-- 修改密码按钮 -->
      <van-button round type="info" class="outBtn" @click="UpdataPwdClick"
        >修改密码</van-button
      >
      <!-- 退出登录按钮 -->
      <van-button round type="info" class="outBtn" @click="logout"
        >退出登录</van-button
      >
    </div>
    <!-- 昵称部分弹出层 -->
    <van-popup v-model="showUsernamePicker" round @close="UpdataUserInfo">
      <van-field
        style="width: 100%"
        v-model="userInfo.username"
        label="昵称"
        placeholder="请输入昵称"
        label-width="3rem"
      />
    </van-popup>
    <!-- 简介部分弹出层 -->
    <van-popup v-model="showSignPicker" round @close="UpdataUserInfo">
      <van-field
        style="width: 100%"
        v-model="userInfo.sign"
        label="简介"
        placeholder="请输入简介"
        label-width="3rem"
        rows="3"
        autosize
        type="textarea"
        maxlength="50"
        show-word-limit
      />
    </van-popup>
    <!-- 性别选择器弹出层 -->
    <van-popup
      v-model="showSexPicker"
      round
      position="bottom"
      @close="UpdataUserInfo"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showSexPicker = false"
        @confirm="SexOnConfirm"
      />
    </van-popup>
    <!-- 修改密码部分弹出层 -->
    <van-popup v-model="showUpdataPwdPicker" round @close="UpdataPwd">
      <van-field
        type="password"
        style="width: 80vw"
        label="旧密码"
        placeholder="请输入旧密码"
        label-width="5rem"
        v-model="changePwd.oldPwd"
      />
      <van-field
        type="password"
        style="width: 80vw"
        label="新密码"
        placeholder="请输入新密码"
        label-width="5rem"
        v-model="changePwd.newPwd"
      />
      <van-field
        type="password"
        style="width: 80vw"
        label="确认密码"
        placeholder="请再次输入新密码"
        label-width="5rem"
        v-model="changePwd.confirmPwd"
      />
    </van-popup>
    <!-- 生日部分弹出层 -->
    <van-popup v-model="showBirthdayPicker" round>
      <van-datetime-picker
        v-model="selectDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthdayPicker = false"
        @confirm="birthdayConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  name: "MineInfo",
  data() {
    return {
      userId: "",
      userInfo: "", //用户信息
      // 性别选择器与弹出框部分
      showSexPicker: false,
      columns: ["男", "女"],
      // 昵称弹出框部分
      showUsernamePicker: false,
      // 简介弹出框部分
      showSignPicker: false,
      // 日历选择器与弹出框部分
      showBirthdayPicker: false,
      minDate: new Date(1900),
      maxDate: new Date(),
      selectDate: "",
      // 修改密码弹出框部分
      showUpdataPwdPicker: false,
      // 修改密码部分
      changePwd: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
    };
  },
  components: {
    TopBar,
  },
  methods: {
    // 顶部返回按钮点击触发
    backIconClick() {
      this.$router.back();
    },
    // 获取用户信息
    async getUserInfo() {
      const userId = window.localStorage.getItem("userId");
      const {
        data: { userInfo },
      } = await this.$http.get(`/userInfo/${userId}`);
      this.userInfo = userInfo;
      // 让生日的日历选择默认选中生日那天
      this.selectDate = new Date(userInfo.birthday);
      // console.log(this.userInfo);
    },
    // 上传文件函数
    async afterImage(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      let formData = new FormData();
      formData.append("file", file.file);
      const { data } = await this.$http.post("/upload/avatar", formData);
      console.log(data);
      this.userInfo.avatar = data.url;
      // 更新数据
      this.UpdataUserInfo();
    },
    // 性别选择器部分
    SexOnConfirm(value) {
      this.userInfo.sex = value;
      this.showSexPicker = false;
    },
    // 点击手机触发
    phoneClick() {
      this.$toast({
        type: "fail",
        message: "手机号已用于注册，不可修改",
      });
    },
    // 生日选择器确定按钮触发
    birthdayConfirm(value) {
      this.selectDate = value;
      // 调用时间格式化过滤器处理时间
      this.userInfo.birthday = this.$options.filters.date(value, "YYYY-MM-DD");
      this.UpdataUserInfo();
      this.showBirthdayPicker = false;
    },
    // 弹出层关闭触发，发送请求更新用户信息
    async UpdataUserInfo() {
      // console.log(this.userInfo);
      const { data } = await this.$http.put(
        `/userInfo/${this.userInfo._id}`,
        this.userInfo
      );
      this.$toast({
        type: "success",
        message: data.message,
      });
    },
    // 退出登录
    async logout() {
      const result = await this.$dialog
        .confirm({
          title: "警告",
          message: "是否确定退出登录？",
          confirmButtonColor: "#1989fa",
        })
        .catch((err) => err);
      if (result === "confirm") {
        window.localStorage.removeItem("WebToken");
        window.localStorage.removeItem("userId");
        this.$toast({
          type: "success",
          message: "退出登录成功",
        });
        setTimeout(() => {
          this.$router.replace("/home");
        }, 1000);
      }
    },
    // 点击修改密码触发
    UpdataPwdClick() {
      this.changePwd = {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      };
      this.showUpdataPwdPicker = true;
    },
    // 修改密码弹出框关闭触发
    async UpdataPwd() {
      // 表单验证
      if (!this.changePwd.oldPwd) {
        return this.$toast({
          type: "fail",
          message: "旧密码不可为空",
          duration: 1000,
        });
      }
      if (!this.changePwd.newPwd) {
        return this.$toast({
          type: "fail",
          message: "新密码不可为空",
          duration: 1000,
        });
      }
      if (!this.changePwd.confirmPwd) {
        return this.$toast({
          type: "fail",
          message: "确认密码不可为空",
          duration: 1000,
        });
      }
      if (this.changePwd.confirmPwd !== this.changePwd.newPwd) {
        return this.$toast({
          type: "fail",
          message: "新密码与确认密码不一致",
          duration: 1000,
        });
      }
      if (this.changePwd.oldPwd === this.changePwd.newPwd) {
        return this.$toast({
          type: "fail",
          message: "旧密码与新密码不能一致",
          duration: 1000,
        });
      }
      const { data } = await this.$http.post(
        `/updateUserPwd/${this.userId}`,
        this.changePwd
      );
      // 后台验证不通过，弹出错误信息
      if (data.status !== "Ok") {
        return this.$dialog.alert({
          title: "提示",
          message: data.message,
          theme: "round-button",
          confirmButtonColor: "#fa209f",
        });
      }
      // 后台通过
      return this.$toast({
        type: "success",
        message: data.message,
        duration: 1000,
      });
    },
  },
  created() {
    this.userId = window.localStorage.getItem("userId");
    this.getUserInfo();
  },
};
</script>
<style lang="less" scoped>
// 最外层容器
.MineInfo {
  background-color: #fff;
  height: 100vh;
  width: 100vw;
}
// 公共部分代码
.public {
  display: flex;
  justify-content: space-between;
  font-size: 1.2308rem;
  border-bottom: 0.0769rem solid #ccc;
  padding: 1.5385rem 0;
}
// 主体内容区域
.main {
  width: 100%;
  border-top: 1.1538rem solid rgb(241, 241, 241);
  padding: 0.7692rem 1.5385rem;
  // 头像上传部分
  .avatar {
    .left {
      width: 75%;
      display: flex;
      align-items: center;
      text-align: left;
      .title {
        width: 20%;
      }
      .content {
        width: 80%;
      }
    }
    .right {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: right;
      img {
        width: 5.3846rem;
        height: 5.3846rem;
        border-radius: 100%;
      }
    }
  }
  // 简介部分
  .sign {
    .left {
      width: 75%;
      display: flex;
      align-items: center;
      text-align: left;
      .content {
        width: 80%;
      }
      .title {
        width: 20%;
      }
    }
    .right {
      text-align: right;
      width: 25%;
    }
  }
  // 性别部分
  .sex {
    padding: 0.7692rem 0;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
    }
    span {
      margin-right: 0.3846rem;
    }
    .right {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: right;
    }
  }
  // 生日部分
  .birthday {
    .left {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .right {
      width: 8%;
      display: flex;
      align-items: center;
      justify-content: right;
    }
    .birthday-left {
      font-size: 1.2308rem;
      text-align: left;
    }
    .birthday-right {
      font-size: 1.2308rem;
    }
  }
}
// 按钮部分样式
.Btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2.3077rem;
  // 退出登录按钮样式
  // margin: 0.3846rem 0;
  .outBtn {
    margin-top: 0.7692rem;
    width: 90%;
  }
}
</style>