<template>
  <div class="order-submit">
    <!-- 顶部栏目部分 -->
    <TopBar
      bgc="rgb(119, 157, 176)"
      centerContent="确认订单"
      cor="#FFF"
      @backIconClick="backIconClick"
    >
      <template #right>
        <span style="font-size: 1.5385rem; margin-right: 0.3846rem"
          ><van-icon name="clock-o"
        /></span>
        <span style="font-size: 1.2308rem">
          {{ countDownMM }}:{{ countDownSS }}</span
        >
      </template>
    </TopBar>
    <!-- 电影详情部分 -->
    <div class="movie" v-if="orderData">
      <!-- 电影图片 -->
      <div class="movie-image">
        <img :src="orderData.movieId.image" />
      </div>
      <!-- 电影信息 -->
      <div class="movie-detail">
        <!-- 电影名 -->
        <div class="movie-name">
          <span>{{ orderData.movieId.name }}</span>
        </div>
        <!-- 电影类型 -->
        <div class="movie-type">
          <span>{{ orderData.movieId.type[0] }}</span>
          <span
            >（{{
              orderData.movieId.language + orderData.movieId.vision
            }}）</span
          >
        </div>
        <div class="movie-price">
          <span>票价￥{{ orderData.ticketPrice.toFixed(2) }}</span>
          <span>{{ orderData.ticketNum }}张</span>
        </div>
        <div class="cinema-name ellipsis">
          <span>{{ orderData.name }}</span>
        </div>
        <div class="hall-name ellipsis">
          <span>{{ orderData.hallId.name }}</span>
        </div>
        <div class="movie-date">
          <span
            >{{ orderData.orderDate.slice(0, 4) }}年{{
              orderData.orderDate.slice(5, 7)
            }}月{{ orderData.orderDate.slice(8, 10) }}日</span
          >
          <span>{{ orderData.orderTime }}</span>
        </div>
        <div class="positon">
          <div
            v-for="(item, index) in orderData.seatInfo"
            :key="index"
            class="positon-content"
          >
            <span>{{ item[0] + 1 }}排{{ item[1] + 1 }}座</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 禁止信息部分 -->
    <div class="forbid-info">
      <div class="box">
        <div>
          <span><van-icon name="close" /></span> <span>不可退票</span>
        </div>
        <div>
          <span><van-icon name="close" /></span> <span>不可改签</span>
        </div>
      </div>
    </div>
    <!-- 购买须知部分 -->
    <div class="pay-info">
      <div class="pay-title">
        <h2>购票须知</h2>
      </div>
      <div class="pay-content">
        <p>1.请确认场次和时间无误，购买成功后将不予以退还</p>
        <p>
          2.由于设备故障等不可抗力因素，存在少量场次取消的情况，会进行退票退款
        </p>
        <p>3.由于影院系统不稳定等因素，存在出票失败的情况，会进行退款</p>
        <p>4.购票成功后，会收到取票码</p>
        <p>5.下单即代表你同意我们的用户服务协议</p>
      </div>
    </div>
    <!-- 手机号码部分 -->
    <div class="telephone" v-if="orderData">
      <div class="title"><span>手机号</span></div>
      <div class="phone">
        <span
          >{{ orderData.userId.phone.slice(0, 3) }}****{{
            orderData.userId.phone.slice(7, 11)
          }}</span
        >
      </div>
    </div>
    <!-- 提示部分 -->
    <div class="tip">
      <p>提示：手机号用于生成订单，并以短信方式将取票码发送到手机上</p>
    </div>
    <!-- 提交部分 -->
    <div class="submit" v-if="orderData">
      <div class="total-prive">
        <span>￥</span>
        <span>{{ orderData.totalPrice.toFixed(2) }}</span>
      </div>
      <div class="submit-btn" @click="confirmPay">
        <span>确定支付</span>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  name: "OrderSubmit",
  data() {
    return {
      orderData: "", //排片数据
      orderId: "", //订单id
      countDownM: 14, //定时分钟
      countDownS: 59, //定时秒钟
      // countDownM: 0, //定时分钟    测试用
      // countDownS: 3, //定时秒钟    测试用
      timer: "", //setinterval接收值
    };
  },
  components: {
    TopBar,
  },
  computed: {
    countDownMM() {
      return this.num(this.countDownM);
    },
    countDownSS() {
      return this.num(this.countDownS);
    },
  },
  methods: {
    // 点击顶部返回按钮触发
    backIconClick() {
      this.$toast({
        type: "success",
        message: "订单取消成功",
      });
      this.$router.back();
    },
    // 顶部计时部分
    // 单数补零操作
    num(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    // 定时操作
    add() {
      this.timer = window.setInterval(() => {
        if (this.countDownS === 0 && this.countDownM !== 0) {
          this.countDownS = 59;
          this.countDownM -= 1;
        } else if (this.countDownS === 0 && this.countDownM === 0) {
          window.clearInterval(this.timer);
          // 这里加定时结束后要做的事
          this.$router.back();
          this.$toast({
            type: "fail",
            message: "订单支付异常",
          });
        } else {
          this.countDownS -= 1;
        }
      }, 1000);
    },
    // 获取订单数据
    async getOrderData() {
      const { data } = await this.$http.get(
        `/getOrderDataFromSubmit/${this.orderId}`
      );
      // console.log(data);
      this.orderData = JSON.parse(JSON.stringify(data.orderData));
      console.log("订单数据", this.orderData);
    },
    // 点击确认支付触发
    confirmPay() {
      this.$router.push({
        path: "/orderPay",
        query: {
          orderId: this.orderId,
        },
      });
    },
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.getOrderData();
    this.timer && clearInterval(this.timer);
    // 开始计时器
    this.add();
  },
  beforeDestroy() {
    // 在页面销毁前清除定时器,因为定时器有两种情况要清除，一种是刚进页面，一种是手动离开页面
    this.timer && clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
// 最外部盒子
.order-submit {
  display: flex;
  flex-direction: column;
  text-align: justify;
  height: 100vh;
  width: 100vw;
  background-color: #f1f1f1;
}
// 电影详情部分
.movie {
  padding: 0.7692rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 1.1538rem;
  background-color: #779db0;
  .movie-image {
    width: 33%;
    img {
      width: 9.2308rem;
      border-radius: 0.7692rem;
    }
  }
  .movie-detail {
    height: 100%;
    width: 62%;
    .movie-name {
      font-size: 1.5385rem;
      margin-bottom: 0.7692rem;
    }
    .movie-type {
      margin-bottom: 0.3846rem;
      span:nth-child(1) {
        margin-right: 0.3846rem;
      }
    }
    .movie-price {
      margin-bottom: 0.3846rem;
      span:nth-child(1) {
        margin-right: 0.7692rem;
      }
    }
    .movie-date {
      margin-bottom: 0.3846rem;
      span:nth-child(1) {
        margin-right: 0.7692rem;
      }
    }
    .cinema-name {
      width: 80%;
      margin-bottom: 0.3846rem;
    }
    .hall-name {
      width: 80%;
      margin-bottom: 0.3846rem;
    }
    .positon {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .positon-content {
        width: 30%;
        flex-wrap: wrap;
      }
    }
  }
}
// 禁止信息部分
.forbid-info {
  background-color: #779db0;
  .box {
    color: #fff;
    border-radius: 0.7692rem 0.7692rem 0 0;
    font-size: 1.1538rem;
    padding: 1.1538rem;
    background-color: #6b8c9d;
    display: flex;
    div {
      margin-right: 0.7692rem;
    }
  }
}
// 购买须知部分
.pay-info {
  padding: 0.7692rem;
  background-color: #fff;
  .pay-title {
    margin-bottom: 0.7692rem;
    padding-bottom: 0.3846rem;
    border-bottom: 0.0769rem solid #ccc;
  }
  .pay-content {
    color: rgb(169, 169, 169);
    text-align: justify;
    font-size: 1.0769rem;
    line-height: 1.6;
  }
}
// 手机号码部分
.telephone {
  padding: 0.7692rem;
  border-top: 0.7692rem solid #f1f1f1;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 1.2308rem;
  border-bottom: 0.0769rem solid #ccc;
}
// 提示部分
.tip {
  padding: 0.7692rem;
  background-color: #fff;
  font-size: 0.9231rem;
  line-height: 1.1;
  color: rgb(255, 44, 44);
}
// 提交部分
.submit {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.7692rem 1.5385rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2308rem;
  .total-prive {
    font-weight: 700;
    color: #ef5148;
    span:nth-child(2) {
      font-size: 2.3077rem;
    }
  }
  .submit-btn {
    color: #fff;
    border-radius: 0.3846rem;
    padding: 1.1538rem 2.3077rem;
    background-color: #ff9900;
  }
}
</style>