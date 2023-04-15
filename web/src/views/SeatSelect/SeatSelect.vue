<template>
  <div class="wrap">
    <!-- 顶部topBar部分 -->
    <TopBar
      bgc="#fff"
      :centerContent="planData.cinema.name"
      v-if="planData"
      @backIconClick="backIconClick"
    ></TopBar>
    <!-- 电影选座区域 -->
    <div class="seat-select" v-if="planData">
      <div class="screen">
        <div class="screen-shape">
          <img src="@/assets/image/screen.png" />
        </div>
        <div class="screen-name">
          <span>{{ planData.hall.name }}</span>
        </div>
      </div>
      <div class="seat">
        <div class="left">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        <div class="right" v-if="hackReset">
          <div class="row" v-for="(itemI, indexI) in seatIJ" :key="indexI">
            <div class="column" v-for="(itemJ, indexJ) in itemI" :key="indexJ">
              <span
                class="iconfont icon-zuowei1-copy-copy-copy"
                :class="{
                  selected: itemJ == 1,
                  forbidSelected: itemJ == 2
                }"
                @click.stop.prevent="seatSelected(indexI, indexJ)"
              ></span>
            </div>
          </div>
          <!-- 推荐虚线 -->
          <div class="position-box"></div>
        </div>
      </div>
    </div>
    <!-- 确认选座部分 -->
    <div class="confirm-seat" v-if="planData">
      <!-- 选座提示部分 -->
      <div class="select-tip">
        <div class="select-tip-item">
          <span class="iconfont icon-zuowei1-copy-copy-copy seatIcon1"></span>
          <div>可选</div>
        </div>
        <div class="select-tip-item">
          <span
            class="
              iconfont
              forbidSelected
              icon-zuowei1-copy-copy-copy
              seatIcon2
            "
          ></span>
          <div>不可选</div>
        </div>
        <div class="select-tip-item">
          <span
            class="iconfont selected icon-zuowei1-copy-copy-copy seatIcon3"
          ></span>
          <div>已选</div>
        </div>
        <div class="select-tip-item">
          <div class="recommand-area"></div>
          <div>最佳观影区</div>
        </div>
      </div>
      <!-- 确认信息部分 -->
      <div class="confirm-content">
        <!-- 电影信息部分 -->
        <div class="movie-info">
          <div class="movie-title">
            <span>{{ planData.movieId.name }}</span>
          </div>
          <div class="movie-content">
            <span>{{ planData.showDay }}</span>
            <span>{{
              planData.outDateMM + "月" + planData.outDateDD + "日"
            }}</span>
            <span>{{ planData.outTime + "-" + planData.leaveTime }}</span>
            <span>{{
              planData.movieId.language + planData.movieId.vision
            }}</span>
          </div>
        </div>
        
        <!-- 选座信息部分 -->
        <div class="seat-info-list" v-if="model.seatInfo.length">
          <div
            class="seat-info-item"
            v-for="(item, index) in model.seatInfo"
            :key="index"
          >
            <div class="seat-info-left">
              <div class="seat-info-title">
                {{ item[0] + 1 }}排{{ item[1] + 1 }}座
              </div>
              <div class="seat-info-price">￥{{ planData.sale }}</div>
            </div>
            <div
              class="seat-info-right"
              @click.prevent.stop="seatSelected(item[0], item[1])"
            >
              <van-icon name="cross" />
            </div>
          </div>
        </div>
        <!-- 自动推荐部分 -->
        <div v-else class="recommand-seat">
          <span class="recommand-title">推荐座位</span>
          <span class="recommand-count" @click="recommandBtnClick(1)">1人</span>
          <span class="recommand-count" @click="recommandBtnClick(2)">2人</span>
          <span class="recommand-count" @click="recommandBtnClick(3)">3人</span>
          <span class="recommand-count" @click="recommandBtnClick(4)">4人</span>
          <!-- <span class="recommand-count" @click="recommandBtnClick(5)">5人</span> -->
        </div>
      </div>
      <!-- 确认选座按钮 -->
      <div
        class="confirm-btn"
        :class="{ 'confirm-btn-active': model.seatInfo.length != 0 }"
        @click.stop.prevent="confirmBtnClick"
      >
        <span>确认选座</span>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  data() {
    return {
      planId: "", //排片id
      //用于添加订单的数据，就是确认选座
      model: {
        name: "", //影院名
        userId: "", //用户id
        seatInfo: [], //选中座位坐标存储
        ticketNum: 0, //购票数量
        totalPrice: 0, //购票总价格
        orderDate: "", //场次日期
        orderTime: "", //场次时间
        movieId: "",
        cinemaId: "",
        hallId: "",
      },
      planData: "", //排片数据
      seatIJ: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ], //座位数据
      hackReset: true, //座位dom显示状态
    };
  },
  components: {
    TopBar,
  },
  methods: {
    // 推荐座位点击触发
    recommandBtnClick(type) {
      const recommandRow = [2,3]
      const recommandColumn = [3,4,5,6]
      // 可选推荐座位
      let usefulSeat = []
      recommandRow.forEach(row => {
        recommandColumn.forEach(column => {
          // 座位可选时
          if(this.seatIJ[row][column] != 2){
            usefulSeat.push([row,column])
          }
        })
      })
      const usefulSeatLength = usefulSeat.length
      if(!usefulSeatLength){
        return this.$dialog.alert({
          title: "提示",
          message: "暂无推荐座位，请自行选择~",
          theme: "round-button",
        });
      }
      switch (type) {
        case 1:
          {
            // 推荐1人时
            if(usefulSeatLength) {
              const [row,column] = usefulSeat[0]
              this.seatIJ[row][column] = 1;
              this.model.seatInfo.push([row, column]);
              this.model.ticketNum += 1;
              this.hackReset = false;
              this.$nextTick(() => {
                this.hackReset = true;
              });
            }
          }
          break;
        case 2:
          {
            // 推荐2人时
            if(usefulSeatLength >= 2) {
              for(let i = 0; i < 2; i++){
                const [row,column] = usefulSeat[i]
                this.seatIJ[row][column] = 1;
                this.model.seatInfo.push([row, column]);
                this.model.ticketNum += 1;
                this.hackReset = false;
                this.$nextTick(() => {
                  this.hackReset = true;
                });
              }
            }else{
              return this.$dialog.alert({
                title: "提示",
                message: "暂无推荐座位，请自行选择~",
                theme: "round-button",
              });
            }
          }
          break;
        case 3: {
            // 推荐3人时
            if(usefulSeatLength >= 3) {
              for(let i = 0; i < 3; i++){
                const [row,column] = usefulSeat[i]
                this.seatIJ[row][column] = 1;
                this.model.seatInfo.push([row, column]);
                this.model.ticketNum += 1;
                this.hackReset = false;
                this.$nextTick(() => {
                  this.hackReset = true;
                });
              }
            }else{
              return this.$dialog.alert({
                title: "提示",
                message: "暂无推荐座位，请自行选择~",
                theme: "round-button",
              });
            }
        }
          break;
        case 4: {
          // 推荐4人时
            if(usefulSeatLength >= 4) {
              for(let i = 0; i < 4; i++){
                const [row,column] = usefulSeat[i]
                this.seatIJ[row][column] = 1;
                this.model.seatInfo.push([row, column]);
                this.model.ticketNum += 1;
                this.hackReset = false;
                this.$nextTick(() => {
                  this.hackReset = true;
                });
              }
            }else{
              return this.$dialog.alert({
                title: "提示",
                message: "暂无推荐座位，请自行选择~",
                theme: "round-button",
              });
            }
            break;
        }
        case 5: {
          // 推荐5人时
            if(usefulSeatLength >= 5) {
              for(let i = 0; i < 5; i++){
                const [row,column] = usefulSeat[i]
                this.seatIJ[row][column] = 1;
                this.model.seatInfo.push([row, column]);
                this.model.ticketNum += 1;
                this.hackReset = false;
                this.$nextTick(() => {
                  this.hackReset = true;
                });
              }
            }else{
              return this.$dialog.alert({
                title: "提示",
                message: "暂无推荐座位，请自行选择~",
                theme: "round-button",
              });
            }
          break;
        }
      }
    },
    // 顶部返回按钮点击触发
    backIconClick() {
      this.$router.back();
    },
    // 获取排片数据
    async getPlanData() {
      const {
        data: { planData },
      } = await this.$http.get(`/getPlanData/${this.planId}`);
      this.planData = JSON.parse(JSON.stringify(planData));
      // 将已经被定的座位设置为不可选
      this.planData.seatInfo.map((item) => {
        this.seatIJ[item[0]][item[1]] = 2;
      });
      // console.log("排片数据", this.planData);
    },
    // 选中座位时触发
    // 这里要注意的是，你虽然改变了数据，但是座位那里的v-for循环后的dom还是旧的，数据虽然变了但他不会重新渲染，所以我们定义一个状态变量，在我们去修改数据时，让它的dom元素从页面剔除，在vue 的生命钩子beforeUpdate或者updated中让状态变量取true让它重新渲染出来~
    seatSelected(i, j) {
      // 先判断座位是否为不可选中状态
      if (this.seatIJ[i][j] == 2) {
        return this.$dialog.alert({
          title: "提示",
          message: "该座位已被预订，请选择其他座位",
          theme: "round-button",
        });
      }
      // 判断座位选中个数是否超额(这里限额6个)
      if (this.seatIJ[i][j] == 0 && this.model.ticketNum == 6) {
        return this.$dialog.alert({
          title: "提示",
          message: "最多只能预定6个座位~",
          theme: "round-button",
        });
      }
      if (this.seatIJ[i][j] == 0) {
        this.seatIJ[i][j] = 1;
        this.model.seatInfo.push([i, j]);
        this.model.ticketNum += 1;
      } else if (this.seatIJ[i][j] == 1) {
        this.seatIJ[i][j] = 0;
        const index = this.model.seatInfo.findIndex((item) => {
          return item[0] == i && item[1] == j;
        });
        this.model.seatInfo.splice(index, 1);
        this.model.ticketNum -= 1;
      }
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    // 点击确认选座按钮触发
    async confirmBtnClick() {
      if (!this.model.seatInfo.length) {
        return this.$dialog.alert({
          title: "提示",
          message: "请先选座~",
          theme: "round-button",
        });
      }
      this.model.name = this.planData.cinema.name;
      this.model.planId = this.planId;
      this.model.movieId = this.planData.movieId._id;
      this.model.hallId = this.planData.hall._id;
      this.model.cinemaId = this.planData.cinema._id;
      this.model.totalPrice = (
        this.planData.sale * this.model.ticketNum
      ).toFixed(2);
      this.model.ticketPrice = this.planData.sale;
      this.model.orderDate = this.planData.outDate;
      this.model.orderTime = this.planData.outTime;
      // 发送请求添加订单
      const { data } = await this.$http.post(`/addOrder`, this.model);
      // console.log(data);
      if (data.status == "Ok") {
        this.$toast({
          type: "success",
          message: "锁定座位成功",
        });
        this.$router.push({
          path: "/orderSubmit",
          query: {
            orderId: data.data._id,
          },
        });
      }
    },
  },
  created() {
    this.planId = this.$route.query.planId;
    this.model.userId = window.localStorage.getItem("userId");
    this.getPlanData();
  },
};
</script>

<style lang="less" scoped>
// 外部盒子部分
.wrap {
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
}
// 电影选座区域
.seat-select {
  margin-top: 1.5385rem;
  padding: 0.7692rem;
  height: 30.7692rem;
  .screen {
    position: relative;
    // 屏幕图片部分
    .screen-shape {
      img {
        width: 100%;
      }
    }
    .screen-name {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      font-size: 1.0769rem;
      color: #a7a9ae;
    }
  }
  .seat {
    display: flex;
    justify-content: space-between;
    .left {
      padding: 0.7692rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: #b6b6b6;
      border-radius: 20px;
      width: 5%;
      div {
        color: #fff;
        padding: 1.1538rem 0;
      }
    }
    .right {
      position: relative;
      padding: 0.7692rem 0;
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .row {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        z-index: 2;
        .column {
          span {
            font-size: 1.8462rem;
            color: rgb(255, 255, 255);
          }
        }
      }
      .position-box{
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        position: absolute;
        width: 40%;
        height: 30%;
        border: 1px #e12e2e dashed;
        border-radius: 10px;
      }
    }
  }
}
// 确认选座部分
.confirm-seat {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.7692rem;
  // 选座提示部分
  .select-tip {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.3077rem;
    .select-tip-item {
      color: #a7a9ae;
      display: flex;
      align-items: center;
      margin: 0 0.7692rem;
      span {
        color: #fff;
        font-size: 1.3846rem;
        margin-right: 0.3846rem;
      }
      .recommand-area {
        width: 18px;
        height: 18px;
        border: 1px #e12e2e dashed;
        border-radius: 5px;
        margin-right: 5px;
      }
    }
  }
  // 确认信息部分
  .confirm-content {
    width: 90vw;
    text-align: left;
    background-color: #fff;
    margin: 0.7692rem auto;
    border-radius: 10px;
    padding: 0.7692rem;
    // 电影信息部分
    .movie-info {
      margin: 0.7692rem 0;
      .movie-title {
        font-size: 1.2308rem;
        margin-bottom: 0.7692rem;
      }
      .movie-content {
        color: #a7a9ae;
        span {
          margin-right: 0.7692rem;
        }
      }
    }
    // 推荐座位部分
    .recommand-seat{
      height: 30px;
      line-height: 30px;
      .recommand-title {
        margin-right: 5px;
      }
      .recommand-count {
        margin: 0 5px;
        background: #f1f1f1;
        box-sizing: border-box;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
      }
    }
    // 选座信息部分
    .seat-info-list {
      width: 100%;
      display: flex;
      overflow: scroll;
      .seat-info-item {
        flex-shrink: 0;
        width: 30%;
        margin-right: 5%;
        padding: 0.7692rem;
        border-radius: 0.3846rem;
        background-color: rgb(233, 233, 233);
        color: rgb(162, 162, 162);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .seat-info-left {
          width: 100%;
          .seat-info-title {
            margin-bottom: 0.3846rem;
          }
        }
      }
    }
  }
  // 确认选座按钮
  .confirm-btn {
    color: #ffbb6f;
    width: 100%;
    background-color: #fe9900;
    padding: 0.7692rem;
    border-radius: 1.5385rem;
  }
}
// 已选座位样式
.selected {
  color: #6dbd00 !important;
}
// 不可选座位样式
.forbidSelected {
  color: #dd2724 !important;
}
// 确认选座按钮可选中样式
.confirm-btn-active {
  color: #fff !important;
}
</style>