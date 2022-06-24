<template>
  <div class="order-pay">
    <!-- 顶部栏部分 -->
    <TopBar
      bgc="#ff852e"
      centerContent="支付订单"
      cor="#FFF"
      @backIconClick="backIconClick"
    >
    </TopBar>
    <div class="header">
      <div class="pay-time">
        <div class="title">支付剩余时间</div>
        <div class="time-icon">
          <van-icon name="clock-o" />
        </div>
        <div class="time">
          <van-count-down
            :time="time"
            format="mm:ss"
            style="font-size: 1.5385rem"
            @finish="countDownFinish"
          >
          </van-count-down>
        </div>
      </div>
      <div class="pay-detail">
        <div class="pay-detail-icon">
          <span><van-icon name="shop" /></span>
        </div>
        <div class="pay-detail-info">
          <div class="price" v-if="orderData">
            ￥{{ orderData.totalPrice.toFixed(2) }}
          </div>
          <div class="orderId">
            <span>订单编号：</span>
            <span v-if="orderData">{{ orderData.orderNum }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-type">
      <div class="pay-logo" @click="payTypeClick(1)">
        <div class="left">
          <span class="iconfont icon-weixinzhifu"></span>
          <span>微信支付</span>
          <div class="recomment">
            推荐
            <div class="triangle"></div>
          </div>
        </div>
        <div class="right">
          <span :class="{ 'selected-active': currentIndex == 1 }"
            ><van-icon name="success"
          /></span>
        </div>
      </div>
      <div class="pay-logo" @click="payTypeClick(2)">
        <div class="left">
          <span class="iconfont icon-zhifu-_zhifubaozhifu"></span>
          <span>支付宝支付</span>
        </div>
        <div class="right">
          <span :class="{ 'selected-active': currentIndex == 2 }"
            ><van-icon name="success"
          /></span>
        </div>
      </div>
      <div class="pay-logo" @click="payTypeClick(3)">
        <div class="left">
          <span class="iconfont icon-yunshanfu"></span>
          <span>云闪付</span>
        </div>
        <div class="right">
          <span :class="{ 'selected-active': currentIndex == 3 }"
            ><van-icon name="success"
          /></span>
        </div>
      </div>
    </div>
    <!-- 底部特惠购票部分 -->
    <div class="confirm-pay" @click="toPay">
      <span>立即支付</span>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  name: "order-pay",
  data() {
    return {
      // time: 3 * 1000,    //3秒测试用
      time: 14 * 60 * 1000,
      // 当前选中支付索引值
      currentIndex: 1,
      orderData: "",
      orderId: "",
    };
  },
  components: {
    TopBar,
  },
  methods: {
    // 顶部导航栏返回按钮触发
    backIconClick() {
      this.$toast({
        type: "success",
        message: "订单取消成功",
      });
      this.$router.go(-2);
    },
    // 支付类型点击触发
    payTypeClick(i) {
      this.currentIndex = i;
    },
    // 获取订单数据
    async getOrderData() {
      const { data } = await this.$http.get(
        `/getOrderDataFromPay/${this.orderId}`
      );
      // console.log(data);
      this.orderData = JSON.parse(JSON.stringify(data.orderData));
      console.log("订单数据", this.orderData);
    },
    // 点击立即支付触发
    async toPay() {
      let message;
      if (this.currentIndex == 1) {
        message = "微信";
      }
      if (this.currentIndex == 2) {
        message = "支付宝";
      }
      if (this.currentIndex == 3) {
        message = "云闪付";
      }
      const result = await this.$dialog
        .confirm({
          message: `您的${message}将支付${this.orderData.totalPrice}元`,
          confirmButtonColor: "#1989fa",
        })
        .catch((err) => err);
      if (result == "cancel") return;
      this.orderData.payType = this.currentIndex;
      // console.log(this.orderData);
      const { data } = await this.$http.put(
        `/payOrder/${this.orderId}`,
        this.orderData
      );
      if (data.status == "Ok") {
        this.$dialog.alert({
          title: "提示",
          message: `支付成功，您的取票码为:${data.ticketCode}`,
          theme: "round-button",
        });
        this.$router.replace("/home");
      }
    },
    // 倒计时结束触发
    countDownFinish() {
      this.$toast({
        type: "fail",
        message: "订单支付异常",
      });
      this.$router.go(-2);
    },
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.getOrderData();
  },
};
</script>

<style lang="less" scoped>
// 外部盒子
.order-pay {
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
}
.header {
  height: 35%;
  background-color: #fff;
  padding: 0 1.5385rem;
  .pay-time {
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2.3077rem;
    letter-spacing: 1.5385rem;
    .title {
      margin-bottom: 0.7692rem;
      font-size: 1.5385rem;
    }
    .time {
      margin-top: 0.7692rem;
    }
    border-bottom: 0.2308rem dashed #ccc;
  }
  .pay-detail {
    text-align: left;
    height: 45%;
    display: flex;
    align-items: center;
    .pay-detail-icon {
      width: 25%;
      font-size: 4.6154rem;
      color: #fff;
      span {
        background-color: #ff852e;
        border-radius: 0.3846rem;
      }
    }
    .pay-detail-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        font-weight: 700;
        color: #ef5148;
        font-size: 1.6923rem;
        margin-bottom: 0.7692rem;
      }
      .orderId {
        font-size: 1.2308rem;
        color: rgb(147, 146, 146);
      }
    }
  }
}
.pay-type {
  margin-top: 10px;
  padding: 0.7692rem 1.5385rem;
  background-color: #fff;
  .pay-logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.1538rem 0;
    border-bottom: 1px solid rgb(221, 221, 221);
    .left {
      display: flex;
      align-items: center;
      span:nth-child(1) {
        font-size: 2rem;
        margin-right: 1.5385rem;
      }
      span:nth-child(2) {
        font-size: 1.3846rem;
        margin-right: 1.5385rem;
      }
      .recomment {
        color: #fff;
        background-color: #ff852e;
        padding: 0.2308rem;
        position: relative;
        font-size: 0.9231rem;
        .triangle {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: -0.6923rem;
          width: 0;
          height: 0;
          border-right: 0.7692rem solid #ff852e;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
      }
    }
    .right {
      span {
        color: #fff;
        // font-size: 1.5385rem;
        font-size: 1.2308rem;
        padding: 0.3077rem;
        border: 0.0769rem solid #ccc;
        border-radius: 100%;
      }
    }
  }
  // 微信支付图标
  .icon-weixinzhifu {
    color: #00c800;
  }
  // 支付宝支付图标
  .icon-zhifu-_zhifubaozhifu {
    color: #02a9f1;
  }
  // 云闪付图标
  .icon-yunshanfu {
    color: #db261d;
  }
  // 选中打勾图表高亮
  .selected-active {
    background-color: #ff852e !important;
    border: transparent !important;
  }
}
// 底部立即支付
// 底部TabBar
.confirm-pay {
  border-radius: 0.7692rem 0.7692rem 0 0;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  height: 4.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 90%;
    color: #ffffff;
    font-size: 1.5385rem;
    padding: 0.7692rem 0;
    border-radius: 1.5385rem;
    background-color: #ff852e;
  }
}
</style>