<template>
  <div class="movie-search">
    <!-- 顶部topBar部分 -->
    <TopBar
      bgc="#FFF"
      centerContent="搜索电影"
      cor="black"
      @backIconClick="backIconClick"
    >
    </TopBar>
    <!-- 搜索框 -->
    <div class="search">
      <van-search
        v-model="value"
        placeholder="请输入电影关键词"
        shape="round"
        autofocus
        @search="goToSearch"
        @clear="movieList = []"
      />
    </div>
    <!-- 电影列表 -->
    <MovieList
      v-if="movieList.length"
      class="movie-list"
      :movieData="movieList"
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
              评分：
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
          <p class="ellipsis">类型：{{ item.type.join("、") }}</p>
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
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import MovieList from "@/components/MovieList";
export default {
  name: "MovieSearch",
  data() {
    return {
      value: "", //搜索框内容
      movieList: [],
    };
  },
  components: {
    TopBar,
    MovieList,
  },
  methods: {
    // 顶部返回按钮点击触发
    backIconClick() {
      this.$router.back();
    },
    // 确认搜索时触发，回车键
    async goToSearch() {
      if (this.value) {
        const {
          data: { movieList },
        } = await this.$http.get(`/public/movieSearch/${this.value}`);
        if (movieList.length != 0) {
          this.$toast({
            type: "success",
            message: `为您搜索到${movieList.length}部电影`,
            duration: 1000,
          });
        } else {
          this.$toast({
            type: "success",
            message: "无相关电影~",
            duration: 1000,
          });
        }
        this.movieList = movieList;
      } else {
        this.$toast({
          type: "success",
          message: `请输入搜索内容`,
          duration: 1000,
        });
        this.movieList = [];
      }
      // console.log(this.movieList);
    },
  },
};
</script>

<style lang="less" scoped>
// 外部盒子
.movie-search {
  height: 100vh;
  width: 100vw;
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