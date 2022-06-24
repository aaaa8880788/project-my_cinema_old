<template>
  <div class="back-top">
    <!-- 返回顶部按钮 -->
    <van-icon
      v-if="btnFlag"
      name="back-top"
      @click="backTop"
      class="back-btn"
      ref="box"
    />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {
      btnFlag: false, //按钮的显示隐藏状态
      scrollTop: 0, //距离顶部的位置
    };
  },
  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + ispeed;
        if (this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (this.scrollTop > 200) {
        this.btnFlag = true;
      } else {
        this.btnFlag = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
};
</script>

<style lang="less" scoped>
.back-btn {
  background-color: rgba(178, 178, 178, 0.7);
  border-radius: 100%;
  padding: 0.3846rem;
  color: #fff;
  position: fixed;
  top: 60%;
  right: 5%;
  font-size: 2.3077rem;
}
</style>