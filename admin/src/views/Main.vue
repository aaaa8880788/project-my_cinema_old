<template>
  <div id="home">
    <!-- 顶部部分 -->
    <el-row class="header">
      <div class="head-bar">
        <!-- 左盒子 -->
        <div class="left">
          <i
            class="iconfont icon-TV"
            style="font-size: 48px; margin-right: 5px"
          ></i>
          <span>仲恺电影</span>
        </div>
        <!-- 右盒子 -->
        <div class="right">
          <el-dropdown @command="btnClickHandle">
            <span class="el-dropdown-link">
              超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
    <el-row class="main">
      <div class="menu-nav">
        <el-menu router :default-active="$route.path">
          <el-menu-item index="/userManage">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/movieManage">
            <i class="el-icon-s-cooperation"></i>
            <span>电影管理</span>
          </el-menu-item>
          <el-menu-item index="/cinemaManage">
            <i class="el-icon-video-camera-solid"></i>
            <span>影院管理</span>
          </el-menu-item>
          <el-menu-item index="/hallManage">
            <i class="el-icon-bangzhu"></i>
            <span>影厅管理</span>
          </el-menu-item>
          <el-menu-item index="/moviePlan">
            <i class="el-icon-s-fold"></i>
            <span>电影排片</span>
          </el-menu-item>
          <el-menu-item index="/movieAdvertise">
            <i class="el-icon-wind-power"></i>
            <span>宣传电影</span>
          </el-menu-item>
          <el-menu-item index="/commentManage">
            <i class="el-icon-s-comment"></i>
            <span>评论管理</span>
          </el-menu-item>
          <el-menu-item index="/orderManage">
            <i class="el-icon-s-ticket"></i>
            <span>订单管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <!-- Key的作用是区分显示的路由,因为新建分类和编辑分类是同一个页面,不加key,路由区分不出来,从编辑页面到新建页面会出现数据还会存在的bug, -->
        <el-card>
          <router-view :key="$route.path"></router-view>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    btnClickHandle(type) {
      switch (type) {
        case '退出登录':
          this.logout()
          break;
      }
    },
    // 退出登录
    logout() {
      this.$message({
        message: "退出登录成功!",
        type: "success",
      });
      window.localStorage.removeItem("token");
      this.$router.replace("/login");
    },
  },
  computed: {
    getUsername() {
      return window.localStorage.getItem("username");
    },
  },
};
</script>

<style lang="less">
#home {
  height: 100vh;
  overflow: hidden;
  background-color: rgb(238, 238, 238);
  // 顶部区域样式
  .header {
    width: 100%;
    min-width: 1200px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 8px 1px #ccc;
    background-color: #fff;
    .head-bar {
      height: 100%;
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        height: 100%;
        display: flex;
        align-items: center;
        i {
          color: skyblue;
        }
        span {
          margin-left: 10px;
          font-size: 20px;
          font-weight: 700;
        }
      }
      .right {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
      }
    }
  }
  // 主体区域样式
  .main {
    height: calc(100vh - 64px);
    margin: 20px auto;
    width: 80%;
    display: flex;
    .menu-nav {
      // height: calc(100vh - 64px);
      width: 20%;
      min-width: 150px;
    }
    .content {
      width: 80%;
      min-width: 900px;
    }
  }
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
</style>
