<template>
  <!-- 影院列表 -->
  <div :class="['cinmaList', isRound ? 'isRound' : '']">
    <!-- 每个影院 -->
    <div
      class="cinema-item"
      v-for="item in cinemaData"
      :key="item._id"
      @click="cinemaClick(item._id)"
    >
      <!-- 左边盒子 -->
      <div class="cinema-item-left">
        <!-- 影院名 -->
        <div class="cinema-name">
          <h3>{{ item.name }}</h3>
        </div>
        <!-- 影院地址 -->
        <div class="cinema-address">
          <p class="ellipsis">
            <van-icon name="location-o" />{{ item.address }}
          </p>
        </div>
        <!-- 联系电话 -->
        <div class="cinema-phone">
          <p><van-icon name="phone-o" />联系电话：{{ item.phone }}</p>
        </div>
        <!-- 影院描述 -->
        <div class="cinema-desc">
          <span
            class="desc-user ellipsis"
            v-for="item1 in item.desc2"
            :key="item1"
          >
            {{ item1 }}
          </span>
          <span
            class="desc-cinema ellipsis"
            v-for="item2 in item.desc1"
            :key="item2"
          >
            {{ item2 }}
          </span>
        </div>
      </div>
      <!-- 右边盒子 -->
      <div class="cinema-item-right">
        <span>{{ item.demand }}</span>
        <span>元</span>
        <span>起</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CinemaList",
  props: ["cinemaData", "isRound"],
  methods: {
    // 每个影院点击触发事件,交给父组件处理,返回影院的id
    cinemaClick(id) {
      this.$emit("cinemaClick", id);
    },
  },
};
</script>

<style lang="less" scoped>
// 影院列表样式
.cinmaList {
  margin-top: 0.7692rem;
  background-color: rgba(255, 255, 255, 1);
  padding: 1.5385rem;
  // 每个影院
  .cinema-item:not(:last-child) {
    margin-bottom: 1.5385rem;
  }
  .cinema-item {
    display: flex;
    padding-bottom: 1.5385rem;
    border-bottom: 1px solid rgb(209, 209, 209);
    // 左边盒子
    .cinema-item-left {
      text-align: left;
      width: 70%;
      // 影院名
      .cinema-name {
        padding-bottom: 0.7692rem;
      }
      // 影院地址
      .cinema-address {
        color: rgb(130, 130, 130);
        padding-bottom: 0.7692rem;
      }
      // 联系电话
      .cinema-phone {
        color: rgb(130, 130, 130);
        padding-bottom: 0.7692rem;
      }
      // 影院描述
      .cinema-desc {
        span {
          border-radius: 0.2308rem;
          margin-right: 0.3846rem;
          padding: 0.0769rem;
        }
        .desc-user {
          color: rgb(109, 255, 5);
          border: 1px solid rgb(109, 255, 5);
        }
        .desc-cinema {
          // display: inline-block;
          color: rgb(255, 132, 0);
          border: 1px solid rgb(255, 132, 0);
        }
      }
    }
    // 右边盒子
    .cinema-item-right {
      text-align: right;
      width: 30%;
      span:nth-child(1) {
        color: red;
        font-size: 1.5385rem;
      }
      span:nth-child(2) {
        color: red;
      }
      span:nth-child(3) {
        color: rgb(130, 130, 130);
      }
    }
  }
}
// 影院列表是否圆角显示
.isRound {
  border-radius: 1.5385rem;
}
</style>