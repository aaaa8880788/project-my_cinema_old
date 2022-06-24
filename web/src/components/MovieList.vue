<template>
  <div class="movie-list" :style="`backgroundColor: ${bgc}`">
    <!-- 单个电影 -->
    <router-link
      tag="div"
      :to="`/movieDetail/${item._id}`"
      class="movie-item"
      v-for="item in movieData"
      :key="item._id"
    >
      <!-- 选中图表部分 -->
      <div
        class="selectIcon"
        v-if="isShowIcon"
        @click.stop="selectOneClick(item)"
      >
        <span :class="[!item.isSelected ? '' : 'selectedActive']">
          <van-icon name="success" />
        </span>
      </div>
      <!-- 图片部分 -->
      <div class="image">
        <img :src="item.image" :alt="item.name" />
      </div>
      <!-- 详情部分 -->
      <div class="detail">
        <slot name="center" :item="item"></slot>
      </div>
      <!-- 购买部分 -->
      <div class="pay" v-if="pay">
        <span :style="{ backgroundColor: payColor ? payColor : 'red' }">{{
          pay
        }}</span>
      </div>
    </router-link>
    <!-- 底部全选栏部分 -->
    <div class="footer" v-if="isShowIcon">
      <div class="footer-left">
        <div class="footer-left-selectIcon" @click="selectAllClick">
          <span
            :class="[
              movieData.length == selectedMovieNum ? 'selectedActive' : '',
            ]"
            ><van-icon name="success"
          /></span>
        </div>
        <div class="selectedNum">
          <span
            >已选择<span style="color: red">{{ selectedMovieNum }}</span
            >条</span
          >
        </div>
      </div>
      <div class="footer-right" @click="delteClick">
        <span :class="[!selectedMovieNum ? '' : 'selectedActive']">删除</span>
      </div>
    </div>
    <!-- 底部全选栏占位盒子 -->
    <div class="position-box" v-if="isShowIcon"></div>
    <!-- 电影数据为空时的占位背景 -->
    <div
      class="bgc-show"
      v-if="!movieData.length"
      :style="`background-color: ${positionBgc}`"
    >
      <div class="bgc-show-center">
        <div class="logo"><i class="iconfont icon-nothing"></i></div>
        <div class="content">
          <span>{{ bgcTitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "movieData",
    "pay",
    "bgc",
    "isShowIcon",
    "bgcTitle",
    "positionBgc",
    "payColor",
  ],
  data() {
    return {
      selectedMovieList: [], // 选中的电影列表
    };
  },
  computed: {
    // 选中的电影数量
    selectedMovieNum() {
      return this.selectedMovieList.length;
    },
  },
  watch: {
    // 这里是监听isShowIcon，在每次进入编辑状态时，重置数据，清空选中的电影列表
    isShowIcon(val, oldVal) {
      if (!oldVal) {
        this.selectedMovieList = [];
      }
    },
  },
  methods: {
    // 点击每个电影选项勾图标触发
    selectOneClick(movieData) {
      const flag = this.selectedMovieList.findIndex((item) => {
        return item._id == movieData._id;
      });
      if (flag == -1) {
        this.$set(movieData, "isSelected", true);
        this.selectedMovieList.push(movieData);
      } else {
        this.$set(movieData, "isSelected", false);
        this.selectedMovieList.splice(flag, 1);
      }
    },
    // 点击全选按钮触发
    selectAllClick() {
      if (this.movieData.length == this.selectedMovieNum) {
        // 如果已经是全选状态
        this.movieData.forEach((item) => {
          this.$set(item, "isSelected", false);
        });
        this.selectedMovieList = [];
      } else {
        // 非全选状态
        this.movieData.forEach((item) => {
          this.$set(item, "isSelected", true);
        });
        this.selectedMovieList = JSON.parse(JSON.stringify(this.movieData));
      }
    },
    // 删除按钮点击触发
    async delteClick() {
      // 选中的电影为0时，删除按钮点击无效
      if (!this.selectedMovieNum) return;
      // 选中的电影为>0时,将选中的电影数据交给父组件处理
      this.$emit("deleteClick", this.selectedMovieList);
    },
  },
};
</script>

<style lang="less" scoped>
// 电影列表部分
.movie-list {
  padding: 0.3846rem 1.5385rem;
  border-radius: 1.5385rem;
  // 单个电影样式
  .movie-item {
    margin: 1.5385rem 0;
    padding-bottom: 0.7692rem;
    display: flex;
    align-items: center;
    height: 7.6923rem;
    text-align: left;
    border-bottom: 0.0769rem solid #ccc;
    // 选中图标部分
    .selectIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 10%;
      span {
        color: #fff;
        font-size: 1.5385rem;
        border-radius: 100%;
        border: 1px solid rgb(126, 126, 126);
      }
    }
    // 图片部分
    .image {
      width: 25%;
      height: 100%;
      img {
        height: 100%;
        border-radius: 10%;
      }
    }
    // 详情部分
    .detail {
      width: 60%;
      height: 100%;
      display: flex;
      font-size: 1.1538rem;
      flex-direction: column;
      justify-content: space-around;
      // 标题
      .title {
        width: 100%;
      }
      // 内容
      .content {
        color: rgb(126, 126, 126);
        p {
          padding: 0.0769rem 0;
        }
      }
    }
    // 购买部分
    .pay {
      text-align: right;
      flex: 1;
      color: #fff;
      span {
        background-color: red;
        padding: 0.3846rem 0.7692rem;
        border-radius: 0.3846rem;
      }
    }
  }
  // 底部全选栏部分
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 1.5385rem;
    z-index: 100;
    height: 3.8462rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer-left {
      display: flex;
      align-items: center;
      // 全选图标样式
      .footer-left-selectIcon {
        span {
          color: #fff;
          font-size: 1.5385rem;
          border-radius: 100%;
          border: 1px solid rgb(126, 126, 126);
        }
      }
      // 被选中数量提示样式
      .selectedNum {
        margin: 0 0.7692rem;
      }
    }
    .footer-right {
      span {
        color: #fff;
        background-color: #f7afaf;
        padding: 0.3846rem 0.7692rem;
        border-radius: 1.1538rem;
      }
    }
  }
  // 占位盒子
  .position-box {
    height: 3.8462rem;
  }
}
// 打勾图标选中高亮和删除按钮高亮
.selectedActive {
  color: #fff !important;
  background-color: red !important;
  border: none !important;
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