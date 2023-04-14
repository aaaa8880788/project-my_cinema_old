<template>
  <div class="home">
    <!-- 顶部搜索栏 -->
    <div class="header-search">
      <!-- 左边坐标区域 -->
      <div class="left">
        <div><i class="iconfont icon-red-chongwugou"></i></div>
        <div><span>仲恺</span></div>
      </div>
      <!-- 右边搜索区域 -->
      <div class="right" @click="movieSearch">
        <div class="search">
          <div class="serach-icon">
            <van-icon name="search" size="1.5rem" />
          </div>
          <input disabled type="text" placeholder="搜索想看的电影~" />
        </div>
      </div>
    </div>
    <!-- 顶部搜索栏占位盒子 -->
    <div class="position-box"></div>
    <!-- 轮播图区域 -->
    <div class="swiper-area">
      <ImageSwiper :Image="siwperImage"> </ImageSwiper>
    </div>
    <!-- 正在热映 -->
    <ShowingList
      :Image="isShowingData"
      title="正在热映"
      v-if="isShowingData.length"
      pay="购票"
    >
    </ShowingList>
    <!-- 即将上映 -->
    <ShowingList
      :Image="willShowingData"
      title="即将上映"
      v-if="willShowingData.length"
      pay="想看"
      payBgc="#faaf00"
    >
    </ShowingList>
    <!-- 电影列表 -->
    <ShowingList :Image="movieList" title="电影列表" v-if="movieList.length">
    </ShowingList>
  </div>
</template>

<script>
import ImageSwiper from "@/components/ImageSwiper";
import ShowingList from "@/components/ShowingList";
export default {
  name: "Home",
  data() {
    return {
      // 轮播图数据
      siwperImage: [],
      // 正在热映电影数据
      isShowingData: [],
      // 即将上映电影数据
      willShowingData: [],
      // 全部电影数据
      movieList: [],
    };
  },
  components: {
    ImageSwiper,
    ShowingList,
  },
  methods: {
    // 获取电影列表
    async getMovieList() {
      // 获取首页正在热映数据
      const {
        data: { isShowingData },
      } = await this.$http.get("/public/isShowingMovieList");
      this.isShowingData = isShowingData;

      // 获取首页即将上映数据
      const {
        data: { willShowingData },
      } = await this.$http.get("/public/willShowingMovieList");
      this.willShowingData = willShowingData;

      // 获取首页电影列表数据
      const {
        data: { movieList },
      } = await this.$http.get("/public/movieList");
      this.movieList = movieList;

      //  console.log("正在热映电影数据\n", this.isShowingData);
      // console.log("即将上映电影数据\n", this.willOutData);
      // console.log("全部电影数据\n", this.movieList);
    },
    // 获取电影宣传列表（轮播图数据）
    async getMovieAdList() {
      const { data } = await this.$http.get("/public/movieAdList");
      this.siwperImage = data;
    },
    // 点击搜索触发
    movieSearch() {
      this.$router.push("/movieSearch");
    },
  },
  created() {
    this.getMovieList();
    this.getMovieAdList();
  },
};
</script>

<style lang="less" scoped>
// 占位盒子
.position-box {
  height: 3.8462rem;
}
// 外部样式
.home {
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
  .right {
    flex: 1;
    padding: 0.5rem 1rem;
    .search {
      height: 100%;
      border-radius: 1.5385rem;
      background-color: #fff;
      display: flex;
      .serach-icon {
        display: flex;
        align-items: center;
        margin-left: 1rem;
      }
      input {
        background-color: #fff;
        margin-left: 0.7692rem;
        border: none;
        outline: none;
      }
    }
  }
}
// 轮播图区域样式
.swiper-area {
  margin: 0.7692rem 0;
  border-radius: 0.7692rem;
  overflow: hidden;
}
</style>
