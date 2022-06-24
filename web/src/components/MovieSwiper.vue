<template>
  <swiper
    ref="mySwiper"
    class="swiper"
    :options="options"
    @slideChange="onChange"
  >
    <slot></slot>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图配置项
      options: {
        effect: "coverflow",
        slidesPerView: 3,
        centeredSlides: true,
        slideToClickedSlide: true,
      },
    };
  },
  methods: {
    // 轮播图滑动时触发
    onChange() {
      // console.log(this.$refs.mySwiper.swiper.realIndex);
      this.$emit("swiperChange", this.$refs.mySwiper.swiper.realIndex);
    },
    // 参数为索引值，触发该函数时，通过索引值跳往对应realIndex的轮播图页
    slideTo(i) {
      this.$refs.mySwiper.swiper.slideTo(i);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100vw;
}
</style>