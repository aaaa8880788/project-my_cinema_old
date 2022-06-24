<template>
  <div class="MovieComment">
    <!-- 顶部topBar部分 -->
    <TopBar
      bgc="#f9f9f9"
      cor="black"
      centerContent="短评"
      @backIconClick="backIconClick"
    >
    </TopBar>
    <div class="header">
      <div class="movie-name">
        <h2>{{ movieDetail.name }}</h2>
      </div>
      <div class="movie-rate">
        <div class="movie-rate-left">
          <span>评分</span>
          <van-rate
            v-model="model.userScoreHalf"
            color="#f7ae01"
            void-color="#b2b2b2"
            void-icon="star"
            size="1.7rem"
            allow-half
            @change="rateValueChange"
          />
        </div>

        <div class="movie-rate-right">
          <span>{{ this.rateComment }}</span>
        </div>
      </div>
    </div>
    <div class="user-userComment">
      <div class="userComment">
        <van-field
          v-model="model.userComment"
          autosize
          rows="13"
          maxlength="250"
          type="textarea"
          placeholder="大家都在问：剧情怎么样，画面好马，演技如何"
        />
        <div class="tip">{{ tip }}</div>
      </div>
    </div>
    <div class="footer" @click="publish">
      <span :class="[model.userComment.length > 9 ? '' : 'diableBtn']"
        >发布</span
      >
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  name: "MovieComment",
  props: ["id"],
  data() {
    return {
      // 电影详情信息
      movieDetail: {},
      model: {
        userScore: 0,
        userScoreHalf: 0,
        userComment: "",
        userId: "",
        movieId: "",
      },
      rateComment: "",
    };
  },
  computed: {
    tip() {
      if (this.model.userComment.length === 0) {
        return ``;
      }
      if (this.model.userComment.length < 10) {
        return `加油，再写${10 - this.model.userComment.length}个字就能发布啦`;
      }
      if (this.model.userComment.length < 50) {
        return `加油，再写${
          50 - this.model.userComment.length
        }个字,有机会被推荐`;
      }
      if (this.model.userComment.length < 50) {
        return `加油，再写${
          50 - this.model.userComment.length
        }个字,有机会被推荐`;
      }
      if (this.model.userComment.length < 150) {
        return `棒极啦！已经写了${this.model.userComment.length}个字`;
      }
      if (this.model.userComment.length < 250) {
        return `还可以写${250 - this.model.userComment.length}个字`;
      }
    },
  },
  components: {
    TopBar,
  },
  methods: {
    // 顶部导航栏返回按钮触发
    backIconClick() {
      this.$router.back();
    },
    // rate评分选中分值显示对应文字
    rateValueChange(value) {
      this.model.userScore = value * 2;
      if (value == 0) {
        this.rateComment = "可以拖动星星评分";
      } else if (value <= 1) {
        this.rateComment = "超烂啊，太差了~";
      } else if (value <= 2) {
        this.rateComment = "很差，不推荐~";
      } else if (value <= 3) {
        this.rateComment = "一般般~";
      } else if (value <= 4) {
        this.rateComment = "比较好，可以尝试~";
      } else {
        this.rateComment = "很不错，推荐看看~";
      }
    },
    // 点击发布触发
    async publish() {
      if (this.model.userComment.length > 9) {
        if (this.model.userScore == 0) {
          return this.$toast({
            type: "fail",
            message: "请评分~",
            duration: 1000,
          });
        }
        // 发布短评
        const { data } = await this.$http.post("commentPublish", this.model);
        // console.log(data);
        this.$toast({
          type: "success",
          message: "提交成功，等待管理员审核！",
          duration: 2000,
        });
        this.$router.back();
      }
    },
    // 根据电影id获取电影详情数据
    async getCommentsByMovieId() {
      const userId = window.localStorage.getItem("userId");
      const movieId = this.id;
      this.model.userId = userId;
      this.model.movieId = movieId;
      let {
        data: { movieComment, movieData },
      } = await this.$http.get(`/movieComment/${movieId}`, {
        params: {
          userId,
        },
      });
      // console.log("电影数据", movieData);
      // console.log("评论数据", movieComment);
      movieComment = JSON.parse(JSON.stringify(movieComment));
      movieData = JSON.parse(JSON.stringify(movieData));
      this.movieDetail = movieData;
      this.model = { ...this.model, ...movieComment };
      this.rateValueChange(this.model.userScoreHalf);
    },
  },
  created() {
    this.getCommentsByMovieId();
  },
};
</script>

<style lang="less" scoped>
// 最外部盒子
.MovieComment {
  height: 100vh;
  width: 100vw;
}
.header {
  text-align: left;
  overflow: hidden;
  padding: 1.5385rem;
  // 电影名字部分
  .movie-name {
    margin-bottom: 1.5385rem;
  }
  // 电影评分部分
  .movie-rate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.0769rem;
    .movie-rate-left {
      display: flex;
      align-items: center;
      span {
        margin-right: 0.7692rem;
      }
    }
  }
}
// 电影评论部分
.user-userComment {
  padding: 0 1.5385rem;
  .userComment {
    font-size: 13px;
    padding-top: 0.7692rem;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    position: relative;
    .tip {
      position: absolute;
      right: 0;
      bottom: 10px;
      color: #ccc;
    }
  }
}
// 底部发布按钮
// 底部TabBar
.footer {
  border-radius: 0.7692rem 0.7692rem 0 0;
  position: absolute;
  bottom: 1.5385rem;
  background-color: #ffffff;
  height: 4.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 90%;
    color: #ffffff;
    font-size: 1.5385rem;
    padding: 0.7692rem 0;
    border-radius: 1.5385rem;
    background-color: rgb(255, 76, 95);
  }
}
.van-cell {
  padding: 0;
}
.diableBtn {
  background-color: #fbd9d7 !important;
}
</style>