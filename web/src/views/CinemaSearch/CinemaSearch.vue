<template>
  <div class="cinema-search">
    <!-- 顶部topBar部分 -->
    <TopBar
      bgc="#FFF"
      centerContent="搜索影院"
      cor="black"
      @backIconClick="backIconClick"
    >
    </TopBar>
    <!-- 搜索框 -->
    <div class="search">
      <van-search
        v-model="value"
        placeholder="请输入影院关键词"
        shape="round"
        autofocus
        @search="goToSearch"
        @clear="cinemaList = []"
      />
    </div>
    <!-- 影院列表 -->
    <!-- 影院列表 -->
    <CinemaList
      :cinemaData="cinemaList"
      isRound="isRound"
      @cinemaClick="cinemaClick"
    >
    </CinemaList>
    <!-- 影院数据为空时的占位背景 -->
    <!-- <div class="bgc-show" v-else>
      <div class="bgc-show-center">
        <div class="logo"><i class="iconfont icon-nothing"></i></div>
        <div class="content"><span>暂无影院数据</span></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import CinemaList from "@/components/CinemaList";
export default {
  name: "CinemaSearch",
  data() {
    return {
      value: "", //搜索框内容
      cinemaList: [],
    };
  },
  components: {
    TopBar,
    CinemaList,
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
          data: { cinemaList },
        } = await this.$http.get(`/public/cinemaSearch/${this.value}`);
        if (cinemaList.length != 0) {
          this.$toast({
            type: "success",
            message: `为您搜索到${cinemaList.length}个影院`,
            duration: 1000,
          });
        } else {
          this.$toast({
            type: "success",
            message: "无相关影院~",
            duration: 1000,
          });
        }
        this.cinemaList = cinemaList;
      } else {
        this.$toast({
          type: "success",
          message: `请输入搜索内容`,
          duration: 1000,
        });
        this.cinemaList = [];
      }
      // console.log(this.cinemaList);
    },
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
};
</script>

<style lang="less" scoped>
// 外部盒子
.cinema-search {
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