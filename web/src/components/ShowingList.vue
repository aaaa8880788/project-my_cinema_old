<template>
  <div class="isShow">
    <!-- 顶部类别与数量盒子 -->
    <div class="title">
      <div class="left">{{ title }}</div>
      <div class="right" @click="gotoMovie(title)">
        <span>全部{{ Image.length }}部</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 电影列表部分 -->
    <div class="content-list">
      <router-link
        tag="div"
        :to="`/movieDetail/${item._id}`"
        class="content"
        v-for="(item, index) in Image"
        :key="index"
      >
        <div class="movie-img">
          <img :src="item.image" />
          <div class="rate" v-if="item.comments">
            <div v-if="item.movieScoreHalf">
              {{ item.movieScoreHalf * 2 }}分
            </div>
            <div v-else>暂无评分</div>
          </div>
        </div>
        <div class="movie-name ellipsis">{{ item.name }}</div>
        <div class="pay" v-if="pay">
          <span :style="`background-color: ${payBgc}`">{{ pay }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieList",
  props: ["Image", "title", "pay", "payBgc"],
  methods: {
    // 点击跳转电影页面
    gotoMovie(title) {
      this.$router.push({
        path: "/movie",
        query: { movieTitle: title },
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 正在热映样式
.isShow {
  background-color: rgba(255, 255, 255, 1);
  margin: 0.9rem 0;
  padding: 0.7692rem 1.2rem;
  border-radius: 0.7692rem;

  // 顶部盒子样式
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20%;
    margin-top: 0.7692rem;
    margin-bottom: 1.5385rem;
    .left {
      font-size: 16px;
      color: red;
      font-weight: 700;
    }
    .right {
      span {
        margin-right: 5px;
      }
    }
  }
  // 内容部分样式
  .content-list {
    width: 100%;
    overflow: scroll;
    display: flex;
    font-size: 0.9231rem;
    .content {
      flex-shrink: 0;
      width: 25%;
      padding: 0 0.3846rem;
      .movie-img {
        position: relative;
        img {
          width: 100%;
          border-radius: 0.7692rem;
        }
        .rate {
          position: absolute;
          left: 0.2308rem;
          bottom: 0.1538rem;
          font-size: 1.0769rem;
          font-weight: 700;
          color: #fa9005;
        }
      }
      .movie-name {
        margin: 0.3846rem 0;
      }
      .pay {
        color: #fff;
        padding: 0.3846rem;
        span {
          padding: 0.3846rem 0.6154rem;
          background-color: red;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
