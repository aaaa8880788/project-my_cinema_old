<template>
  <div class="select-cinema">
    <!-- 顶部电影详情外部大盒子部分 -->
    <div class="herder" v-if="Object.keys(movieData).length">
      <!-- 上面盒子电影介绍大盒子部分 -->
      <div class="movie-detail">
        <!-- 左边盒子电影图片 -->
        <div class="movie-detail-left">
          <img :src="movieData.image" />
        </div>
        <!-- 右边盒子电影介绍和返回按钮 -->
        <div class="movie-detail-right">
          <div class="movie-content">
            <div class="movie-name ellipsis">
              <span>{{ movieData.name }}</span>
            </div>
            <div class="movie-performer ellipsis">
              主演：{{ movieData.performer }}
            </div>
            <div class="movie-rate">
              <van-rate
                readonly
                v-model="movieData.movieScoreHalf"
                rateStar
                color="#f7ba2a"
                void-color="#eff2f7"
                void-icon="star"
                size="1.3rem"
              />
              <span> {{ movieData.movieScoreHalf * 2 || "暂未评" }}分</span>
            </div>
            <div class="movie-type">
              <span class="movie-type-left ellipsis">
                {{ movieData.type[0] }}</span
              >
              <span class="movie-type-right">
                {{ movieData.language + movieData.vision }}
              </span>
            </div>
            <div class="movie-duration">影片时长：{{ movieData.duration }}</div>
            <div class="movie-time">
              <span>{{ movieData.time }} 中国大陆上映</span>
            </div>
          </div>
          <div class="back">
            <span @click.stop="toBack"><van-icon name="arrow" /></span>
          </div>
        </div>
      </div>
      <!-- 下面盒子电影想看和看过 -->
      <div class="movie-interesing">
        <!-- 左边盒子 -->
        <div
          @click.stop="wantWatch"
          :class="[wantWatchStatus ? 'activeWatch' : '']"
          v-if="!watchedStatus"
        >
          <span><van-icon name="like" /></span>
          <span>{{ wantWatchStatus ? "已想看" : "想看" }}</span>
        </div>
        <div class="activeWatch" @click.stop="deleteComment" v-else>
          <span><van-icon name="star" /></span>
          <span>已看过</span>
        </div>
        <!-- 右边盒子 -->
        <div v-if="!watchedStatus" @click.stop="watched">
          <span><van-icon name="star" /></span>
          <span>看过</span>
        </div>
        <div
          style="color: #ffb400; background-color: #6b848a"
          @click.stop="watched"
          v-else
        >
          <span><van-icon name="star" /></span>
          <span>我评{{ userScore }}分</span>
        </div>
      </div>
    </div>
    <!-- 底部选择电影院部分 -->
    <div class="footer">
      <!-- 影院列表 -->
      <CinemaList :cinemaData="cinemaList" @cinemaClick="cinemaClick">
      </CinemaList>
    </div>
    <!-- 电影列表为空时的占位背景 -->
    <div v-if="!this.cinemaList.length" class="bgc-show">
      <div class="bgc-show-center">
        <div class="logo"><i class="iconfont icon-nothing"></i></div>
        <div class="content"><span>暂无影院上映该电影</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import CinemaList from "@/components/CinemaList";
export default {
  name: "SelectCinema",
  props: ["id"],
  data() {
    return {
      movieData: {},
      cinemaList: [],
    };
  },
  components: {
    CinemaList,
  },
  computed: {
    //想看的状态：是否想看
    wantWatchStatus() {
      const userId = window.localStorage.getItem("userId");
      let status = false;
      // 这里要判断电影数据获取到没有，没有获取到就进行map报错
      if (!Object.keys(this.movieData).length) {
        return status;
      } else {
        this.movieData.wishWatch.map((item) => {
          if (item == userId) {
            status = true;
          }
          return item;
        });
        return status;
      }
    },
    //看过的状态：是否看过
    watchedStatus() {
      const userId = window.localStorage.getItem("userId");
      let status = false;
      // 这里要判断电影数据获取到没有，没有获取到就进行map报错
      if (!Object.keys(this.movieData).length) {
        return status;
      } else {
        this.movieData.comments.map((item) => {
          if (item.userId._id == userId && item.isPass == 1) {
            status = true;
            // 在本登录用户为看过的状态时，也就是watchedStatus==true,获取本用户评论分数
            this.userScore = item.userScore;
          }
          return item;
        });
        return status;
      }
    },
  },
  methods: {
    // 获取电影详情数据和影院列表数据
    async getMovieDetail() {
      const movieId = this.id;
      const {
        data: { movieData, cinemaList },
      } = await this.$http.get(`/public/selectCinema/${movieId}`);
      // console.log("电影详情数据", movieData);
      // console.log("影院列表数据", cinemaList);
      // 获取电影数据
      this.movieData = JSON.parse(JSON.stringify(movieData));
      // 获取排片的影院列表
      this.cinemaList = JSON.parse(JSON.stringify(cinemaList));
    },
    // 点击返回按钮
    toBack() {
      this.$router.back();
    },
    // 点击想看和不想看事件
    async wantWatch() {
      const userId = window.localStorage.getItem("userId");
      // 判断是否登录,因为在登录状态才有此功能
      if (await this.isLogin()) {
        // 为登录状态
        // 判断该电影中本用户是否标记想看
        if (!this.wantWatchStatus) {
          // 发送网络请求标记想看
          const { data } = await this.$http.put(`/addWishWatch/${userId}`, {
            movieId: this.id,
          });
          if (data.status !== "Ok") {
            return this.$dialog.alert({
              title: "提示",
              message: data.message,
              theme: "round-button",
              confirmButtonColor: "#fa209f",
            });
          }
          this.$toast({
            type: "success",
            message: "已标记想看~",
            duration: 1000,
          });
        } else {
          // 发送网络请求取消标记想看
          const { data } = await this.$http.put(`/deleteWishWatch/${userId}`, {
            movieId: this.id,
          });
          if (data.status !== "Ok") {
            return this.$dialog.alert({
              title: "提示",
              message: data.message,
              theme: "round-button",
              confirmButtonColor: "#fa209f",
            });
          }
          this.$toast({
            type: "success",
            message: "已取消想看~",
            duration: 1000,
          });
          // console.log(this.movieData);
        }
        this.getMovieDetail();
      }
    },
    // 右边盒子点击看过事件或者点击我评X分
    async watched() {
      // 判断是否登录,因为在登录状态才有此功能
      if (await this.isLogin()) {
        this.$router.push(`/movieComment/${this.id}`);
      }
    },
    // 点击左边盒子的删除评论
    async deleteComment() {
      if (await this.isLogin()) {
        const result = await this.$dialog
          .confirm({
            title: "是否取消看过？",
            message: "若取消看过，你的评分和评论内容都将被删除~",
            confirmButtonColor: "#1989fa",
          })
          .catch((err) => err);
        // console.log(result);
        if (result == "cancel") return;
        const userId = window.localStorage.getItem("userId");
        const movieId = this.movieData._id;
        // 删除登录用户的评论
        const { data } = await this.$http.delete(`/deleteComment/${movieId}`, {
          params: {
            userId,
          },
        });
        if (data.status == "Ok") {
          this.$toast({
            type: "success",
            message: "取消看过成功,已删除评论~",
            duration: 1000,
          });
        }
        // 删除评论后，更新电影数据
        this.getMovieDetail();
      }
    },
    // 点击影院触发函数
    cinemaClick(val) {
      // console.log(val);
      this.$router.push({
        path: "/cinemaDetail",
        query: {
          movieId: this.id,
          cinemaId: val,
        },
      });
    },
  },
  created() {
    this.getMovieDetail();
  },
};
</script>

<style lang="less" scoped>
// 外部容器部分
.select-cinema {
  height: 100vh;
  width: 100vw;
}
// 顶部电影详情外部大盒子部分
.herder {
  padding: 0.7692rem;
  height: 35%;
  background-color: rgba(76, 106, 114, 0.7);
  //  上面盒子电影介绍大盒子部分
  .movie-detail {
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .movie-detail-left {
      width: 35%;
      img {
        border-radius: 0.3846rem;
        width: 100%;
      }
    }
    .movie-detail-right {
      color: #fff;
      height: 100%;
      text-align: left;
      width: 63%;
      display: flex;
      justify-content: space-between;
      // 电影内容样式
      .movie-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 85%;
        .movie-name {
          font-size: 1.5385rem;
          margin-top: 0.3846rem;
        }
        .movie-rate {
          color: #f7ba2a;
          span {
            margin-left: 0.3846rem;
          }
        }
        .movie-type {
          .movie-type-right {
            border-radius: 0.3846rem;
            padding: 0.3846rem;
            background-color: rgb(111, 121, 128);
            margin-left: 10px;
          }
        }
      }
      // 返回箭头样式
      .back {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5385rem;
        span {
          padding: 0.3846rem;
          border-radius: 100%;
          background-color: rgb(154, 169, 179);
        }
      }
    }
  }
  // 下面盒子电影想看和看过
  .movie-interesing {
    color: #fff;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 20%;
    div {
      border-radius: 0.3846rem;
      height: 80%;
      width: 48%;
      background-color: rgb(154, 169, 179);
      display: flex;
      align-items: center;
      justify-content: center;
      span:nth-child(2) {
        margin: 0 0.3846rem;
      }
    }
  }
}

// 想看和看过样式
.activeWatch {
  background-color: #6b848a !important;
  color: rgb(196, 196, 196) !important;
}

// 占位背景
.bgc-show {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20%;
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