<template>
  <div class="movieDetail">
    <!-- 顶部topBar部分 -->
    <TopBar
      bgc="rgb(76, 106, 114)"
      centerContent="电影"
      cor="#FFF"
      @backIconClick="backIconClick"
    >
    </TopBar>
    <!-- 中间主体内容部分 -->
    <div class="main" v-if="movieData">
      <!-- 电影展示部分 -->
      <div class="movie-show">
        <!-- 电影图片部分 -->
        <div class="movie-image">
          <img :src="movieData.image" />
        </div>
        <!-- 电影信息部分 -->
        <div class="movie-info">
          <!-- 电影名字 -->
          <div class="movie-name">
            <p>{{ movieData.name }}</p>
            <p>主演:{{ movieData.performer }}</p>
          </div>
          <!-- 电影详情 -->
          <div class="movie-detail">
            <span v-if="movieData.type" class="ellipsis">
              {{ movieData.type[0] }}
            </span>
            <span>{{ movieData.language + movieData.vision }}</span>
            <p>{{ movieData.time }}上映</p>
            <span>影片时长：{{ movieData.duration }}</span>
          </div>
          <!-- 电影兴趣 -->
          <div class="interesting">
            <!-- 左边部分 -->
            <div
              @click.stop="wantWatch"
              :class="wantWatchStatus ? 'activeWatch' : ''"
              v-if="!watchedStatus"
            >
              <span> <van-icon name="like" /></span>
              <span>{{ wantWatchStatus ? "已想看" : "想看" }}</span>
            </div>
            <div class="activeWatch" v-else @click.stop="deleteComment">
              <span><van-icon name="star" /></span>
              <span>已看过</span>
            </div>
            <!-- 右边部分 -->
            <div @click.stop="watched" v-if="!watchedStatus">
              <span><van-icon name="star" /></span>
              <span>看过</span>
            </div>
            <div style="color: #ffb400" @click.stop="watched" v-else>
              <span><van-icon name="star" /></span>
              <span>我评{{ userScore }}分</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 电影口碑 -->
      <div class="movie-quality">
        <!-- 左盒子 -->
        <div class="movie-quality-left">
          <!-- 标题 -->
          <div class="movie-quality-title">
            <span>电影口碑</span>
          </div>
          <!-- 评分 -->
          <div>
            <van-rate
              allow-half
              readonly
              v-model="movieData.movieScoreHalf"
              rateStar
              color="#f7ba2a"
              void-color="#eff2f7"
              void-icon="star"
              size="2rem"
            />
          </div>
        </div>
        <!-- 右盒子 -->
        <div class="movie-quality-right">
          <div class="peopleRate">
            <span v-if="!movieData.wishWatch.length">暂无想看</span>
            <span v-else>{{ movieData.wishWatch.length }}人想看</span>
            <span v-if="!movieData.comments.length">暂无评价</span>
            <span v-else>{{ movieData.comments.length }}人看过</span>
          </div>
          <div class="movie-number">
            <span>{{ movieData.movieScoreHalf * 2 }}</span>
            <span>分</span>
          </div>
        </div>
      </div>
      <!-- 电影简介 -->
      <div class="movie-desc">
        <h3>简介</h3>
        <p>{{ movieData.summary }}</p>
      </div>
    </div>
    <!-- 用户评论部分 -->
    <div class="user-comment">
      <div class="user-comment-title">
        <div>
          <span>观众热评</span>
          <span>（{{ movieData.comments.length }}）</span>
        </div>
        <div>
          <span @click.stop="watched">参与评论</span>
        </div>
      </div>
      <div class="user comment-list" v-if="movieData.comments.length">
        <div
          class="user-comment-content"
          v-for="(item, index) in movieData.comments"
          :key="index"
        >
          <!-- 用户头像 -->
          <div class="user-avatar">
            <img :src="item.userId.avatar" />
          </div>
          <!-- 用户评分 -->
          <div class="user-rateInfo">
            <div class="user-name">
              <h2>{{ item.userId.username }}</h2>
            </div>
            <div class="user-rate">
              <van-rate
                readonly
                v-model="item.userScore"
                rateStar
                color="#f7ba2a"
                void-color="#eff2f7"
                void-icon="star"
                size="1.3rem"
              />
              <span>{{ item.userScore }}分</span>
            </div>
            <div class="user-detail">
              <p>{{ item.userComment }}</p>
            </div>
            <div class="user-footer">
              <div class="user-footer-left">
                <span>{{ item.updatedAt | date("YYYY-MM-DD") }}</span>
              </div>
              <div class="user-footer-right">
                <span @click="supportClick(item)"
                  ><van-icon name="good-job-o" />
                  {{ item.supportUserId.length }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 没有评论时显示 -->
      <div
        v-else
        style="margin: 1.5385rem 0; font-size: 1.2308rem; height: 3.8rem"
      >
        空空如也~快点参与评论吧！
      </div>
    </div>
    <!-- 底部特惠购票部分 -->
    <div class="footer" v-if="movieData.plans.length">
      <span @click.stop="toSelectCinema">特惠购票</span>
    </div>
    <!-- 返回顶部按钮 -->
    <BackTop> </BackTop>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import BackTop from "@/components/BackTop";
export default {
  name: "MovieDetail",
  components: {
    TopBar,
    BackTop,
  },
  props: ["id"],
  data() {
    return {
      movieData: {
        wishWatch: [],
        comments: [],
        type: [],
        plans: [],
      }, //电影详情数据
      userScore: 0, //登录用户看过的评分
      commentList: [], //评论列表
    };
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
          if (item.userId._id == userId) {
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
    // 顶部返回按钮点击触发
    backIconClick() {
      this.$router.back();
    },
    // 获取电影详情数据
    async getMovieDetail() {
      const {
        data: { movieDetailData },
      } = await this.$http.get(`/public/movieDetail/${this.id}`);
      this.movieData = { ...this.movieData, ...movieDetailData };
      // console.log(this.movieData);
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
    // 点赞按钮触发
    async supportClick(item) {
      // 先判断是否登录
      if (await this.isLogin()) {
        const userId = window.localStorage.getItem("userId");
        const isHaving = item.supportUserId.some((item1) => item1 == userId);
        if (!isHaving) {
          // 发送网络请求添加点赞用户
          const { data } = await this.$http.put(`/addSupportUser/${userId}`, {
            commentId: item._id,
          });
          // console.log(data);
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
            message: "点赞成功~",
            duration: 1000,
          });
        } else {
          // 发送网络请求更新评论数据
          const { data } = await this.$http.put(
            `/deleteSupportUser/${userId}`,
            {
              commentId: item._id,
            }
          );
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
            message: "取消点赞成功~",
            duration: 1000,
          });
        }
        this.getMovieDetail();
      }
    },
    // 点击特惠购票触发
    async toSelectCinema() {
      this.$router.push(`/selectCinema/${this.movieData._id}`);
    },
  },
  created() {
    this.getMovieDetail();
  },
};
</script>

<style lang="less" scoped>
// 外部盒子样式
.movieDetail {
  width: 100vw;
  height: 100vh;
  background-color: rgb(76, 106, 114);
}

// 内容主体部分
.main {
  margin: 1.5385rem 0;
  padding: 0 0.7692rem;
  // 电影展示部分
  .movie-show {
    margin-bottom: 0.7692rem;
    text-align: left;
    display: flex;
    // 电影图片部分
    .movie-image {
      width: 30%;
      img {
        border-radius: 0.7692rem;
        width: 100%;
      }
    }
    // 电影信息部分
    .movie-info {
      color: #9bacb3;
      width: 70%;
      padding: 0.3846rem 0.7692rem;
      // 电影标题部分
      .movie-name {
        margin-bottom: 0.7692rem;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p:nth-child(1) {
          color: #ffffff;
          font-size: 1.8462rem;
        }
      }
      // 电影详情部分
      .movie-detail {
        height: 40%;

        span:nth-child(1) {
          margin-right: 0.7692rem;
        }
        span:nth-child(2) {
          color: rgb(240, 239, 239);
          font-size: 0.9231rem;
          padding: 0.1538rem;
          background-color: #354e55;
          border-radius: 0.3846rem;
        }
        p {
          margin-top: 0.3846rem;
        }
      }
      // 兴趣部分
      .interesting {
        height: 25%;
        display: flex;
        justify-content: space-between;
        padding-top: 0.6154rem;
        div {
          height: 100%;
          width: 45%;
          background-color: #6d858b;
          border-radius: 0.7692rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          span:nth-child(2) {
            margin-left: 0.3846rem;
          }
        }
      }
    }
  }
  // 电影口碑部分
  .movie-quality {
    margin-bottom: 0.7692rem;
    padding: 1.1538rem;
    height: 10rem;
    background-color: #314c53;
    display: flex;
    border-radius: 0.7692rem;
    .movie-quality-left {
      text-align: left;
      width: 60%;
      font-size: 20px;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .movie-quality-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .peopleRate {
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        span {
          padding: 0.3846rem;
          background-color: #6d858b;
          border-radius: 0.2308rem;
        }
      }
      .movie-number {
        // text-align: right;
        color: #ffb400;
        span:nth-child(1) {
          font-size: 2.3077rem;
        }
      }
    }
  }
  // 电影简介部分
  .movie-desc {
    color: #ffffff;
    text-align: justify;
    padding: 1.1538rem;
    background-color: #314c53;
    border-radius: 0.7692rem;
    h3 {
      margin-bottom: 1.1538rem;
    }
    p {
      line-height: 1.3077rem;
    }
  }
}

// 用户评论部分
.user-comment {
  margin-bottom: 2rem;
  background-color: #fff;
  border-radius: 0.7692rem;
  padding: 1.5385rem;
  padding-bottom: 2.3077rem;
  .user-comment-title {
    // margin-bottom: 1.5385rem;
    height: 3.8462rem;
    display: flex;
    justify-content: space-between;
    div:nth-child(1) {
      font-size: 1.2308rem;
      font-weight: 700;
      span:nth-child(2) {
        color: #cacaca;
      }
    }
    div:nth-child(2) {
      color: #ffffff;
      span {
        border-radius: 0.3846rem;
        padding: 0.3846rem;
        background-color: rgb(255, 76, 95);
      }
    }
    div {
      display: flex;
      align-items: center;
    }
  }
  // 评论信息部分
  .user-comment-content {
    display: flex;
    margin: 1.5385rem 0;
    // 用户头像部分
    .user-avatar {
      width: 20%;
      img {
        width: 4.6154rem;
        height: 4.6154rem;
        border-radius: 100%;
      }
    }
    // 用户评论部分
    .user-rateInfo {
      margin-left: 0.7692rem;
      text-align: justify;
      flex: 1;
      .user-rate {
        margin: 0.7692rem 0;
        span {
          margin-left: 0.7692rem;
          color: #ffb400;
        }
      }
      p {
        font-size: 1.2308rem;
      }
    }
    .user-footer {
      padding: 1.5385rem 0;
      display: flex;
      justify-content: space-between;
      font-size: 1.2308rem;
      .user-footer-right {
        span {
          padding: 0.3846rem;
          border: 0.0769rem solid #cacaca;
          border-radius: 0.7692rem;
        }
      }
      border-bottom: 0.0769rem solid #ccc;
    }
  }
}

// 底部TabBar
.footer {
  border-radius: 0.7692rem 0.7692rem 0 0;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  height: 4.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 95%;
    color: #ffffff;
    font-size: 1.5385rem;
    padding: 0.7692rem 0;
    border-radius: 1.5385rem;
    background-color: rgb(255, 76, 95);
  }
}

// 想看和看过样式
.activeWatch {
  background-color: #425d63 !important;
  color: #628a94 !important;
}
</style>