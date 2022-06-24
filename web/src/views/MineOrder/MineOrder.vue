<template>
  <div class="mine-order">
    <!-- 顶部topBar部分 -->
    <TopBar bgc="#fff" centerContent="我的订单" @backIconClick="backIconClick">
    </TopBar>
    <!-- 订单列表部分 -->
    <div class="orderList">
      <div class="orderItem" v-for="item in orderList" :key="item._id">
        <div class="orderItem-top">
          <div
            class="cinema-name ellipsis"
            @click.stop.prevent="goToCinema(item.cinemaId)"
          >
            <span>{{ item.name }}</span>
            <span><van-icon name="arrow" /></span>
          </div>
          <div class="finish-status">
            <span>已完成</span>
          </div>
        </div>
        <div class="orderItem-center">
          <div
            class="movie-image"
            @click.stop.prevent="goToMovieDetail(item.movieId._id)"
          >
            <img :src="item.movieId.image" />
          </div>
          <div class="movie-detail">
            <div class="movie-name">
              <p class="ellipsis">{{ item.movieId.name }}</p>
              <span>{{ item.ticketNum }}张</span>
            </div>
            <div class="order-detail">
              <div class="ticket-code">
                <span>取票码：{{ item.ticketCode }}</span>
              </div>
              <div class="order-date">
                <span
                  >{{ item.orderDate.slice(0, 4) }}年{{
                    item.orderDate.slice(5, 7)
                  }}月{{ item.orderDate.slice(8, 10) }}日</span
                >
                <span>{{ item.orderTime }}</span>
              </div>
              <div class="postion ellipsis">
                <span>{{ item.hallId.name }}</span>
                <span v-for="(item1, index1) in item.seatInfo" :key="index1"
                  >{{ item1[0] + 1 }}排{{ item1[1] + 1 }}座</span
                >
              </div>
            </div>
          </div>
          <div
            class="comment-movie"
            @click.stop.prevent="commentMovie(item.movieId._id)"
          >
            <span>评价影片</span>
          </div>
        </div>
        <div class="orderItem-bottom">
          <div class="total-price">
            <span>总价：{{ item.totalPrice.toFixed(2) }}元</span>
          </div>
          <div class="delete-order" @click.stop.prevent="deleteOrder(item._id)">
            <span>删除订单</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单列表为空时的占位背景 -->
    <div v-if="!orderList.length" class="bgc-show">
      <div class="bgc-show-center">
        <div class="logo"><i class="iconfont icon-nothing"></i></div>
        <div class="content"><span>暂无订单</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  name: "MineOrder",
  components: {
    TopBar,
  },
  data() {
    return {
      orderList: [],
    };
  },
  methods: {
    // 顶部返回按钮点击触发
    backIconClick() {
      this.$router.back();
    },
    // 获取本订单列表
    async getOrderList() {
      const userId = localStorage.getItem("userId");
      const {
        data: { orderList },
      } = await this.$http.get(`/getUserOrderData/${userId}`);
      this.orderList = JSON.parse(JSON.stringify(orderList));
      console.log(this.orderList);
    },
    // 点击影院名触发
    goToCinema(cinemaId) {
      this.$router.push({
        path: "/cinemaDetail",
        query: {
          cinemaId: cinemaId,
        },
      });
    },
    // 点击电影图片触发
    goToMovieDetail(movieId) {
      this.$router.push(`/movieDetail/${movieId}`);
    },
    // 点击评价影片触发
    commentMovie(movieId) {
      this.$router.push(`/movieComment/${movieId}`);
    },
    // 点击删除订单触发
    async deleteOrder(orderId) {
      const result = await this.$dialog
        .confirm({
          message: "是否确定删除订单？",
          confirmButtonColor: "#1989fa",
        })
        .catch((err) => err);
      if (result == "cancel") return;
      const { data } = await this.$http.delete(`/deleteOrder/${orderId}`);
      if (data.status == "Ok") {
        this.$toast({
          type: "success",
          message: "删除成功~",
        });
        this.getOrderList();
      }
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>



<style lang="less" scoped>
// 最外层容器
.mine-order {
  background-color: #f6f6f6;
  height: 100vh;
  width: 100vw;
}
// 订单列表部分
.orderList {
  text-align: left;
  // padding: 0.7692rem;
  // background-color: red;
  .orderItem:nth-child(1) {
    border-top: none;
  }
  .orderItem {
    background-color: #fff;
    padding: 0.7692rem;
    border-bottom: 0.0769rem solid rgb(211, 211, 211);
    border-top: 0.0769rem solid rgb(211, 211, 211);
    margin-bottom: 0.7692rem;
    .orderItem-top {
      color: rgb(171, 171, 171);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cinema-name {
        max-width: 80%;
        font-size: 1.3846rem;
        span:nth-child(1) {
          margin-right: 0.3846rem;
        }
      }
    }
    .orderItem-center {
      display: flex;
      border-bottom: 0.0769rem solid rgb(228, 228, 228);
      border-top: 0.0769rem solid rgb(228, 228, 228);
      margin: 0.7692rem 0;
      padding: 0.7692rem 0;
      .movie-image {
        width: 20%;
        img {
          width: 100%;
        }
      }
      .movie-detail {
        padding: 0 0.7692rem;
        width: 55%;
        .movie-name {
          display: flex;
          align-items: center;
          font-size: 1.5385rem;
          width: 100%;
          height: 35%;
          p {
            max-width: 70%;
            margin-right: 0.7692rem;
          }
        }
        .order-detail {
          height: 65%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          .ticket-code {
            margin-bottom: 0.7692rem;
            font-size: 1.1538rem;
            color: rgb(160, 159, 159);
          }
          .order-date {
            color: rgb(90, 90, 90);
            height: 30%;
            display: flex;
            align-items: flex-end;
            span {
              margin-right: 0.3846rem;
            }
          }
          .postion {
            width: 100%;
            color: rgb(152, 152, 152);
            align-items: flex-end;
            height: 20%;
            span {
              margin-right: 0.3846rem;
            }
          }
        }
      }
      .comment-movie {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          padding: 0.7692rem;
          border-radius: 1.5385rem;
          color: #fff;
          background-color: #fe4e4a;
        }
      }
    }
    .orderItem-bottom {
      padding: 0.3846rem 0;
      font-size: 1.2308rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .total-price {
        color: rgb(154, 154, 154);
      }
      .delete-order {
        color: rgb(179, 179, 179);
        font-size: 1.0769rem;
        span {
          padding: 0.3846rem;
          border: 1px solid #ccc;
          border-radius: 1.5385rem;
        }
      }
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