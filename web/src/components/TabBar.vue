<template>
  <div class="tab-bar">
    <!-- 4个大盒子 -->
    <div
      :class="['wrap', $route.path === item.path ? 'highLight' : '']"
      v-for="(item, index) in tabBarData"
      :key="index"
      @click="switchTo(item.path)"
    >
      <div class="inner-top">
        <img :src="$route.path === item.path ? item.active : item.normal" />
      </div>
      <div class="inner-bottom">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      // 导航栏数据
      tabBarData: [
        {
          normal: require("@/assets/image/tab-bar/home.png"),
          active: require("@/assets/image/tab-bar/home-active.png"),
          text: "首页",
          path: "/home",
        },
        {
          normal: require("@/assets/image/tab-bar/movie.png"),
          active: require("@/assets/image/tab-bar/movie-active.png"),
          text: "电影",
          path: "/movie",
        },
        {
          normal: require("@/assets/image/tab-bar/cinema.png"),
          active: require("@/assets/image/tab-bar/cinema-active.png"),
          text: "影院",
          path: "/cinema",
        },
        {
          normal: require("@/assets/image/tab-bar/mine.png"),
          active: require("@/assets/image/tab-bar/mine-active.png"),
          text: "我的",
          path: "/mine",
        },
      ],
    };
  },
  methods: {
    // 点击路由跳转
    switchTo(path) {
      if (this.$route.path !== path) {
        this.$router.replace(path);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tab-bar {
  z-index: 50;
  position: absolute;
  bottom: 0;
  background-color: #ffffff;
  border-top: 1px solid rgb(246, 246, 246);
  height: 4.5rem;
  width: 100%;
  display: flex;
  .wrap {
    flex: 1;
    padding: 0.3846rem 0;
  }
}
// 图片样式
img {
  width: 2.6923rem;
  height: 2.6923rem;
}
// 高亮样式
.highLight {
  color: #d81e06;
}
</style>