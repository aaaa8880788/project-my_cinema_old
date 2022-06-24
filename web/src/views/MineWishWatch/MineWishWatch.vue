<template>
  <div class="wish-watch">
    <!-- 顶部topBar部分 -->
    <TopBar bgc="#fff" centerContent="想看的电影" @backIconClick="backIconClick">
    </TopBar>
    <!-- 编辑栏 -->
    <div class="editBar" v-if="movieList.length">
      <div class="editBar-letf">
        <span>共{{ movieList.length }}部</span>
      </div>
      <div class="editBar-right" @click="editClick">
        <span v-show="!isShowIcon">编辑</span>
        <span v-show="isShowIcon">取消</span>
      </div>
    </div>
    <!-- 编辑栏占位盒子 -->
    <div class="position-box" v-if="movieList.length"></div>
    <!-- 电影列表 -->
    <MovieList class="movie-list" :movieData="movieList" :pay="pay" :isShowIcon="isShowIcon" @deleteClick="deleteClick" bgcTitle="暂无想看的电影" positionBgc="rgb(240, 239, 239)">
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
              <van-rate readonly v-model="item.movieScoreHalf" allow-half rateStar color="#f7ba2a" void-color="#eff2f7" void-icon="star" size="1.3rem" />
              {{ item.movieScoreHalf * 2 }}分
            </p>
            <p class="ellipsis" v-else>暂无评分</p>
          </div>
          <p class="ellipsis">类型：{{ item.type.join("、") }}</p>
          <p class="ellipsis">主演：{{ item.performer }}</p>
        </div>
      </template>
    </MovieList>
  </div>
</template>


<script>
import TopBar from "@/components/TopBar";
import MovieList from "@/components/MovieList";
export default {
  name: "MineWishWatch",
  data() {
    return {
      movieList: [],
      isShowIcon: false, //电影列表打勾图标是否显示
      pay: "购票",
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
    // 获取用户信息
    async getUserInfo() {
      const userId = window.localStorage.getItem("userId");
      const {
        data: { movieList },
      } = await this.$http.get(`/mineWishWatch/${userId}`);
      // 拿到电影数据
      this.movieList = JSON.parse(JSON.stringify(movieList));
      // console.log(this.movieList);
    },
    // 点击编辑取消按钮触发
    editClick() {
      this.isShowIcon = !this.isShowIcon;
      if (!this.isShowIcon) {
        this.pay = "购票";
      } else {
        // 在每次进入编辑状态,购票按钮隐藏,却重置打勾状态为为选中
        this.movieList.forEach((item) => {
          this.$set(item, "isSelected", false);
        });
        this.pay = "";
      }
    },
    // 电影列表子组件点击删除按钮触发事件
    async deleteClick(val) {
      console.log(val);
      const result = await this.$dialog
        .confirm({
          message: "是否确定删除选中想看的电影？",
          confirmButtonColor: "#1989fa",
        })
        .catch((err) => err);

      // console.log(result);
      if (result == "cancel") return;
      // 获取用户id
      const userId = window.localStorage.getItem("userId");
      const { data } = await this.$http.put(`/deleteWishWatchList/${userId}`, {
        movieList: val,
      });
      if (!data.status) {
        return this.$toast({
          type: "success",
          message: "删除失败~",
        });
      }
      this.$toast({
        type: "success",
        message: "删除成功~",
      });
      // 从编辑状态退出
      this.editClick();
      // 更新电影列表
      this.getUserInfo();
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style lang="less" scoped>
// 最外层容器
.wish-watch {
  background-color: #fff;
  height: 100vh;
  width: 100vw;
}
// 编辑栏占位盒子
.position-box {
  height: 3.0769rem;
}
// 编辑栏样式
.editBar {
  z-index: 999;
  position: fixed;
  top: 3.8rem;
  left: 0;
  right: 0;
  height: 3.0769rem;
  background-color: rgb(240, 239, 239);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5385rem;
  .editBar-letf {
    color: rgb(150, 150, 150);
  }
  .editBar-right {
    color: rgb(150, 150, 150);
    span {
      padding: 0.3077rem 0.6154rem;
      border-radius: 0.7692rem;
      background-color: #fff;
    }
  }
}
</style>