<template>
  <div class="cinema-detail">
    <!-- 顶部topBar部分 -->
    <TopBar
      bgc="#fff"
      :centerContent="cinemaData.name ? cinemaData.name : '影院'"
      @backIconClick="backIconClick"
    >
    </TopBar>
    <!-- 影院信息部分 -->
    <div class="cinemaDetail" v-if="cinemaData">
      <div class="title">
        <h2>{{ cinemaData.name }}</h2>
      </div>
      <div class="address">
        <span class="ellipsis-two"
          ><van-icon name="location-o" />{{ cinemaData.address }}</span
        >
      </div>
      <div class="phone">
        <span><van-icon name="phone-o" />{{ cinemaData.phone }}</span>
      </div>
    </div>
    <!-- 轮播图部分 -->
    <div class="swiper-bgc" v-if="showingMovieList.length">
      <MovieSwiper ref="movieSwiper" @swiperChange="swiperChange">
        <swiper-slide v-for="item in showingMovieList" :key="item._id">
          <img :src="item.image" />
        </swiper-slide>
      </MovieSwiper>
      <div class="triangle"></div>
    </div>
    <!-- 电影详情部分 -->
    <div class="movieDetail" v-if="showingMovieList.length">
      <div class="movieDetail-title">
        <div class="movie-name">{{ showingMovieList[currentActive].name }}</div>
        <div class="movie-score">
          {{ showingMovieList[currentActive].movieScore || "暂未评" }}分
        </div>
      </div>
      <div class="movieDetail-content">
        <div class="movieDetail-content-center">
          <span>{{ showingMovieList[currentActive].duration }}</span>
          <span class="sign">|</span>
          <span>{{
            showingMovieList[currentActive].type[0].split("、")[0]
          }}</span>
          <span class="sign">|</span>
          <span>{{
            showingMovieList[currentActive].performer.split("、")[0]
          }}</span>
        </div>
      </div>
    </div>
    <!-- Tab标签页 -->
    <div class="tab" v-if="showingMovieList.length">
      <van-tabs
        v-model="active"
        title-active-color="#ee0a24"
        line-width="30vw"
        line-height="0.2308rem"
      >
        <van-tab
          :title="tabTitle[index]"
          v-for="(item, index) in showingMovieList[currentActive].plans"
          :key="index"
        >
          <div class="movie-plan" v-for="(item1, index1) in item" :key="index1">
            <div class="movie-plan-left">
              <div class="inTime">{{ item1.outTime }}</div>
              <div class="outTime">{{ item1.leaveTime }}散场</div>
            </div>
            <div class="movie-plan-center">
              <div class="type">
                <div class="language">
                  {{ item1.movieId.language + item1.movieId.vision }}
                </div>
                <div class="position ellipsis">{{ item1.hall.name }}</div>
              </div>
              <div class="money">{{ item1.sale }}元</div>
            </div>
            <div class="movie-plan-right" @click.stop="payClick(item1)">
              <div class="pay">购票</div>
            </div>
          </div>
          <div v-if="!item.length" class="bgc-show1">
            <div class="bgc-show-center">
              <div class="logo"><i class="iconfont icon-nothing"></i></div>
              <div class="content"><span>暂无上映场次</span></div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 在无上映电影时的占位背景 -->
    <div v-if="!showingMovieList.length" class="bgc-show">
      <div class="bgc-show-center">
        <div class="logo"><i class="iconfont icon-nothing"></i></div>
        <div class="content"><span>该影院暂无上映电影</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import MovieSwiper from "@/components/MovieSwiper";
export default {
  name: "cinema-detail",
  components: {
    TopBar,
    MovieSwiper,
  },
  data() {
    return {
      cinemaId: "", //影院Id
      movieId: "", //电影Id
      cinemaData: "", //影院数据
      showingMovieList: [], //热映的电影列表
      active: 0, //tab栏默认获取索引值
      currentActive: 0, //当前轮播图活动索引
      tabTitle: [], // tab栏的标题
    };
  },
  methods: {
    // 顶部返回按钮点击触发
    backIconClick() {
      this.$router.back();
    },
    // 根据影院Id查询影院
    async getCinemaDetail() {
      const {
        data: { cinemaData },
      } = await this.$http.get(`/public/cinemaDetail/${this.cinemaId}`);
      // ------数据处理------
      // 获取该影院信息
      this.cinemaData = cinemaData;
      // console.log("影院信息", this.cinemaData);
      this.showingMovieList = cinemaData.showingMovieList;
      // console.log("正在热映电影列表", this.showingMovieList);
      // 如果movieId存在，证明是从电影详情页点进来的，跳往指定电影
      // 默认显示本页面id对应的电影数据,先跳往对应轮播图
      // 获取该电影的索引值，然后跳往
      if (this.movieId) {
        const index = this.showingMovieList.findIndex((item) => {
          return item._id == this.movieId;
        });
        this.$nextTick(() => {
          this.$refs.movieSwiper.slideTo(1);
        });
      }
    },
    // 轮播图改变时触发函数
    swiperChange(index) {
      this.currentActive = index;
      this.active = 0;
    },
    // 点击购票触发
    async payClick(moviePlan) {
      // 先判断是否登录
      if (await this.isLogin()) {
        // console.log(moviePlan);
        this.$router.push({
          path: "/seatSelect",
          query: {
            planId: moviePlan._id,
          },
        });
      }
    },
  },
  created() {
    this.cinemaId = this.$route.query.cinemaId;
    this.movieId = this.$route.query.movieId;
    const today = this.$options.filters.date(new Date(), "YYYY-MM-DD");
    const todayTime = new Date(today).getTime();
    const tomorrowTime = todayTime + 1 * 24 * 60 * 60 * 1000;
    const afterTomorrowTime = todayTime + 2 * 24 * 60 * 60 * 1000;
    const tomorrowMM = this.$options.filters.date(new Date(tomorrowTime), "MM");
    const tomorrowDD = this.$options.filters.date(new Date(tomorrowTime), "DD");
    const afterTomorrowMM = this.$options.filters.date(
      new Date(afterTomorrowTime),
      "MM"
    );
    const afterTomorrowDD = this.$options.filters.date(
      new Date(afterTomorrowTime),
      "DD"
    );
    this.tabTitle.push(`明天${tomorrowMM}月${tomorrowDD}日`);
    this.tabTitle.push(`后天${afterTomorrowMM}月${afterTomorrowDD}日`);
  },
  mounted() {
    this.getCinemaDetail();
  },
};
</script>

<style lang="less" scoped>
// 最外层容器
.cinema-detail {
  background-color: #fff;
  height: 100vh;
  width: 100vw;
}
// 影院信息部分
.cinemaDetail {
  width: 100vw;
  height: 7.6923rem;
  padding: 0.7692rem;
  text-align: justify;
  font-size: 1.0769rem;
  color: rgb(137, 137, 137);
  .title {
    color: #000;
    // height: 30%;
  }
  .address {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .phone {
    height: 20%;
  }
}
// 轮播图部分
.swiper-bgc {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15.3846rem;
  width: 100vw;
  background-color: #1b1d37;
  img {
    width: 9.2308rem;
    height: 12.9231rem;
  }
  // 轮播图部分里面的小三角
  .triangle {
    z-index: 10;
    bottom: -0.0769rem;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 0rem;
    height: 0rem;
    border-bottom: 0.7692rem solid #fff;
    border-left: 0.7692rem solid transparent;
    border-right: 0.7692rem solid transparent;
  }
}

// 电影描述部分
.movieDetail {
  margin: 0.3846rem 0;
  height: 4.2308rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .movieDetail-title {
    display: flex;
    div {
      font-size: 1.2308rem;
      margin: 0 0.7692rem;
    }
    .movie-score {
      color: #ffb400;
    }
  }
  .movieDetail-content {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    font-size: 1.0769rem;
    color: rgb(145, 145, 145);
    .movieDetail-content-center {
      .sign {
        margin: 0 0.3846rem;
      }
    }
  }
}

// Tab标签页
.tab {
  .movie-plan {
    padding: 1.1538rem 0.7692rem;
    display: flex;
    border-bottom: 1px solid #ccc;
    height: 5.7692rem;
    .movie-plan-left {
      height: 100%;
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      .inTime {
        font-size: 1.2308rem;
        font-weight: 700;
      }
      .outTime {
        color: rgb(171, 171, 171);
      }
    }
    .movie-plan-center {
      height: 100%;
      width: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      .type {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        .position {
          width: 100%;
          color: rgb(171, 171, 171);
        }
      }
      .money {
        width: 30%;
        color: #ee0a24;
        font-size: 1.1538rem;
      }
    }
    .movie-plan-right {
      width: 15%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .pay {
        border: 0.0769rem solid #ee0a24;
        padding: 0.2308rem 0.7692rem;
        border-radius: 1.5385rem;
        color: #ee0a24;
      }
    }
  }
}
// 在明天或后天栏目里面没有排电影时显示的背景
.bgc-show1 {
  .bgc-show-center {
    margin-top: 1.9231rem;
    font-size: 1.3846rem;
    i {
      font-size: 6.1538rem;
    }
    .content {
      margin-top: 1.9231rem;
    }
  }
}

// 占位背景
.bgc-show {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(240, 239, 239);
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