<template>
  <swiper ref="mySwiper" class="swiper" :options="options" v-if="Image.length">
    <swiper-slide v-for="(item, index) in Image" :key="index">
      <router-link :to="`/movieDetail/${item.movieId}`">
        <img class="image" :src="item.adImage" />
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      options: {
        loop: true,
        autoplay: {
          //swiper手动滑动之后自动轮播失效的解决方法,包括触碰，拖动，点击pagination,重新启动自动播放
          disableOnInteraction: false,
          // 自动播放时间：毫秒
          delay: 2000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // bulletClass: "my-bullet",
        },
      },
    };
  },
  props: ["Image"],
  mounted() {
    console.log('----',this.$refs.mySwiper);
  },
};
</script>

<style lang="less" scoped>
.swiper {
  img {
    width: 100%;
  }
}
</style>
<style>
.swiper-pagination-bullet {
  width: 2rem;
  height: 0.3rem;
  background-color: rgba(193, 191, 191, 0.5);
  opacity: 1;
  border-radius: 0.1538rem;
}
.swiper-pagination-bullet-active {
  background-color: #fff;
}
.image{
  width: 100%;
  height: 170px;
}
</style>