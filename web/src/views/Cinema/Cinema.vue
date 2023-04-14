<template>
  <div class="cinema">
    <!-- 顶部搜索栏 -->
    <div class="header-search">
      <!-- 左边坐标区域 -->
      <div class="left">
        <div><i class="iconfont icon-red-chongwugou"></i></div>
        <div>仲恺</div>
      </div>
      <!-- 中间切换栏区域 -->
      <div class="center">
        <span>影院</span>
      </div>
      <!-- 右边搜索区域 -->
      <div class="right">
        <van-icon
          name="search"
          size="2rem"
          @click="$router.push('/cinemaSearch')"
        />
      </div>
    </div>
    <!-- 顶部搜索栏占位盒子 -->
    <div class="position-box"></div>
    <!-- 影院列表 -->
    <CinemaList
      :cinemaData="cinemaList"
      isRound="isRound"
      @cinemaClick="cinemaClick"
    >
    </CinemaList>
    <!-- 返回顶部按钮 -->
    <BackTop> </BackTop>
  </div>
</template>

<script>
import CinemaList from "@/components/CinemaList";
import BackTop from "@/components/BackTop";
export default {
  data() {
    return {
      // 影院列表数据
      cinemaList: [],
    };
  },
  components: {
    CinemaList,
    BackTop,
  },
  methods: {
    async getCinemaList() {
      const { data } = await this.$http.get("/public/cinemaList");
      this.cinemaList = data.cinemaList;
      // console.log(this.cinemaList);
    },
    // 数组去重 
    // 点击影院触发函数
    cinemaClick(val) {
      // console.log(val);
      this.$router.push({
        path: "/cinemaDetail",
        query: {
          cinemaId: val,
        },
      });
    },
  },
  created() {
    this.getCinemaList();
  },
};
</script>

<style lang="less" scoped>
// 外部样式
.cinema {
  padding: 0 0.7692rem;
  width: 100vw;
  height: calc(100vh - 4.5rem);
  background-image: -moz-linear-gradient(0, #ffffff, #00dcff4d);
  background-image: -webkit-linear-gradient(0, #ffffff, #00dcff4d);
  background-image: linear-gradient(0, #ffffff, #00dcff4d);
}
// 顶部导航栏样式
.header-search {
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  position: fixed;
  height: 3.8462rem;
  display: flex;
  background-color: #b8f5ff;
  // 左边左边盒子
  .left {
    width: 25%;
    font-size: 1.3846rem;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      display: block;
      color: rgb(250, 32, 159);
      font-size: 1.9231rem;
    }
  }
  // 中间盒子
  .center {
    // color: red;
    font-size: 1.9231rem;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 右边盒子
  .right {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
// 占位盒子
.position-box {
  height: 3.8462rem;
}
</style>