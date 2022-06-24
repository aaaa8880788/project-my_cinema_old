<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="MovieSearch,CinemaSearch">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <TabBar v-if="$route.meta.showTabBar"></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";

export default {
  name: "App",
  data() {
    return {
      transitionName: "",
    };
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // console.log(to, "to");
      // console.log(from, "from");
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
  },
  components: { TabBar },
  beforeDestroy() {},
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: fixed;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
