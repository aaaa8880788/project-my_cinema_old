<template>
  <div class="mine">
    <!-- 顶部部分 -->
    <div class="header">
      <!-- 用户头像部分 -->
      <div class="user-avatar">
        <!-- 未登录时 -->
        <img src="@/assets/image/mine/userIcon.png" v-if="!userInfo" />
        <!-- 登录时 -->
        <img :src="userInfo.avatar" v-else />
      </div>
      <!-- 用户信息部分 -->
      <div class="user-info">
        <!-- 登录时 -->
        <div class="username">
          <span>{{ userInfo.username || "游客" }}</span>
        </div>
        <div class="sign ellipsis">
          <span class="">{{
            userInfo.sign || "同学很懒,什么也没留下~~~"
          }}</span>
        </div>
      </div>
    </div>
    <div class="myorder" @click="toMineInfo">
      <div class="content">
        <van-icon name="user-o" />
        <span>个人信息</span>
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="myorder" @click="toMineOrder">
      <div class="content">
        <van-icon name="cart-o" />
        <span>我的订单</span>
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="myorder" @click="toMineWishWatch">
      <div class="content">
        <van-icon name="play-circle-o" />
        <span>想看的电影</span>
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="myorder" @click="toMineWatched">
      <div class="content">
        <van-icon name="smile-o" />
        <span>看过的电影</span>
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      userInfo: "",
    };
  },
  methods: {
    // 点击跳往个人信息页
    async toMineInfo() {
      // 先判断是否为登录状态
      if (await this.isLogin()) {
        this.$router.push(`/mineInfo`);
      }
    },
    // 点击跳往我的订单页
    async toMineOrder() {
      // 先判断是否为登录状态
      if (await this.isLogin()) {
        this.$router.push(`/mineOrder`);
      }
    },
    // 点击跳往想看的电影页
    async toMineWishWatch() {
      // 先判断是否为登录状态
      if (await this.isLogin()) {
        this.$router.push(`/mineWishWatch`);
      }
    },
    // 点击跳往看过的电影页
    async toMineWatched() {
      // 先判断是否为登录状态
      if (await this.isLogin()) {
        this.$router.push(`/mineWatched`);
      }
    },
    // 获取用户信息
    async getUserInfo() {
      // 先判断是否为登录状态
      if (await this.isLogin()) {
        const userId = window.localStorage.getItem("userId");
        const {
          data: { userInfo },
        } = await this.$http.get(`/userInfo/${userId}`);
        this.userInfo = userInfo;
        // console.log(this.userInfo);
      }
    },
  },
  created() {
    this.getUserInfo();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.mine {
  width: 100vw;
  height: calc(100vh - 4.5rem);
  background-color: #f6f6f6;
}
// 顶部部分样式
.header {
  background-color: rgb(184, 245, 255);
  height: 19.2308rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3.0769rem;
  margin-bottom: 0.7692rem;
  // 用户头像部分
  .user-avatar {
    height: 40%;
    img {
      box-shadow: 0 0 0.5385rem 0.3846rem rgb(206, 206, 206);
      width: 6.9231rem;
      height: 6.9231rem;
      border-radius: 100%;
    }
  }
  // 用户信息部分
  .user-info {
    font-size: 1.6923rem;
    height: 25%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .sign {
      font-size: 1.2308rem;
    }
  }
}
.myorder {
  height: 3.8462rem;
  background-color: #fff;
  display: flex;
  margin-bottom: 0.7692rem;
  box-shadow: 0 0px 8px 8px rgba(230, 230, 230, 0.5);
  .content {
    padding-left: 2.3077rem;
    text-align: left;
    font-size: 1.5385rem;
    flex: 1;
    span {
      margin-left: 0.3846rem;
      line-height: 3.8462rem;
    }
  }
  .icon {
    width: 20%;
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>