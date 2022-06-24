<template>
  <div class="movie">
    <!-- 顶部搜索栏 -->
    <div class="header-search">
      <!-- 左边坐标区域 -->
      <div class="left">
        <div><i class="iconfont icon-red-chongwugou"></i></div>
        <div>广州</div>
        <div><van-icon name="arrow-down" color="black" size="1rem" /></div>
      </div>
      <!-- 中间切换栏区域 -->
      <div class="center">
        <div
          v-for="(item, index) in tabTitle"
          :key="index"
          @click="titleClick(index)"
        >
          <span
            :class="['title', currentIndex === index ? 'activeTitle' : '']"
            >{{ item }}</span
          >
        </div>
      </div>
      <!-- 右边搜索区域 -->
      <div class="right">
        <van-icon
          name="search"
          size="2rem"
          @click="$router.push('/movieSearch')"
        />
      </div>
    </div>
    <!-- 顶部搜索栏占位盒子 -->
    <div class="position-box"></div>
    <!-- 电影列表 -->
    <MovieList
      v-if="movieList.length"
      class="movie-list"
      :movieData="movieList"
      :pay="payTitle"
      bgc="rgba(250, 250, 250, 1)"
      :payColor="payColor"
    >
      <template #center="{ item }">
        <!-- 标题 -->
        <div class="title">
          <h3 class="ellipsis">{{ item.name }}</h3>
        </div>
        <!-- 内容 -->
        <div class="content">
          <div v-if="item.comments">
            <p class="ellipsis" v-if="item.movieScoreHalf">
              <van-rate
                readonly
                v-model="item.movieScoreHalf"
                allow-half
                rateStar
                color="#f7ba2a"
                void-color="#eff2f7"
                void-icon="star"
                size="1.3rem"
              />
              {{ item.movieScoreHalf * 2 }}分
            </p>
            <p class="ellipsis" v-else>暂无评分</p>
          </div>
          <p class="ellipsis">类型：{{ item.type[0] }}</p>
          <p class="ellipsis">主演：{{ item.performer }}</p>
        </div>
      </template>
    </MovieList>
    <!-- 电影数据为空时的占位背景 -->
    <div class="bgc-show" v-else>
      <div class="bgc-show-center">
        <div class="logo"><i class="iconfont icon-nothing"></i></div>
        <div class="content"><span>暂无电影数据</span></div>
      </div>
    </div>
    <!-- 返回顶部按钮 -->
    <BackTop> </BackTop>
  </div>
</template>

<script>
import MovieList from "@/components/MovieList";
import BackTop from "@/components/BackTop";
export default {
  data() {
    return {
      currentIndex: 0,
      // 顶部标题栏数据
      tabTitle: ["正在热映", "即将上映", "电影列表"],
      // 电影数据
      movieList: [],
      // 按钮显示文字
      payTitle: "",
      // 按钮背景颜色
      payColor: "",
    };
  },
  components: {
    MovieList,
    BackTop,
  },
  methods: {
    // 点击标题事件
    titleClick(index) {
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      this.getMovieList();
    },
    // 获取电影列表
    async getMovieList() {
      // 获取首页正在热映数据
      if (this.currentIndex == 0) {
        const {
          data: { isShowingData },
        } = await this.$http.get("/public/isShowingMovieList");
        this.movieList = isShowingData;
        this.payTitle = "购票";
      }

      // 获取首页即将上映数据
      if (this.currentIndex == 1) {
        const {
          data: { willShowingData },
        } = await this.$http.get("/public/willShowingMovieList");
        this.movieList = willShowingData;
        this.payTitle = "想看";
        this.payColor = "#faaf00";
      }

      // 获取首页电影列表数据
      if (this.currentIndex == 2) {
        const {
          data: { movieList },
        } = await this.$http.get("/public/movieList");
        this.movieList = movieList;
        this.payTitle = "想看";
        this.payColor = "#faaf00";
      }
      // console.log("电影数据\n", this.movieList);
    },
  },
  created() {
    const title = this.$route.query.movieTitle;
    if (title) {
      const index = this.tabTitle.indexOf(title);
      if (title !== -1) {
        this.titleClick(index);
      }
    }
  },
  mounted() {
    this.getMovieList();
  },
};
</script>

<style lang="less" scoped>
// 外部样式
.movie {
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
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .title {
      padding: 0.6154rem 0;
      font-size: 1.0769rem;
    }
  }
  // 右边盒子
  .right {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
// 顶部占位盒子
.position-box {
  height: 3.8462rem;
  margin-bottom: 1.5385rem;
}
// 选中标题显示下划线并且变字体颜色
.activeTitle {
  color: rgba(245, 6, 38, 0.925);
  border-bottom: 0.2308rem solid rgba(245, 6, 38, 0.925);
}
// 电影列表样式
.movie-list {
  margin-bottom: 20px;
}
// 占位背景
.bgc-show {
  margin-top: 50%;
  transform: translateY(-20%);
  .bgc-show-center {
    color: rgb(159, 159, 159);
    .logo {
      i {
        font-size: 11.5385rem;
      }
    }
    .content {
      margin-top: 2.3077rem;
      font-size: 1.5385rem;
    }
  }
}
</style>