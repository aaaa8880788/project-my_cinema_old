<template>
  <div class="Plan">
    <!--搜索-->
    <div class="top">
      <el-col :span="15">
        <el-input
          placeholder="请输入电影名"
          class="input-with-select"
          style="width: 100%"
          v-model="searchContent"
          clearable
          @input="handleSearch"
        >
          <el-button slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" size="small" @click="addPlan"
          >安排电影</el-button
        >
      </el-col>
    </div>
    <!-- 表格 -->
    <div class="plan-table">
      <el-table border :data="planList">
        <el-table-column
          label="电影名"
          width="150"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="影院名"
          width="150"
          prop="cinema.name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="放映大厅"
          width="120"
          show-overflow-tooltip
          prop="hall.name"
        ></el-table-column>
        <el-table-column
          label="放映日期"
          width="120"
          show-overflow-tooltip
          prop="outDate"
        ></el-table-column>
        <el-table-column
          label="放映时间"
          show-overflow-tooltip
          width="80"
          prop="outTime"
        ></el-table-column>
        <el-table-column
          label="售价(元)"
          show-overflow-tooltip
          prop="sale"
        ></el-table-column>
        <el-table-column align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >撤销</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage"
      :page-size="queryInfo.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="queryInfo.total"
      style="margin-top: 20px"
    >
    </el-pagination>
    <!-- 添加或编辑排片对话框 -->
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        v-if="dialogFormVisible"
        :showClose="false"
        :close-on-click-modal="false"
        top="5vh"
      >
        <el-form
          label-width="80px"
          :model="planInfo"
          :rules="planInfoFormrules"
          ref="planInfoForm"
        >
          <el-form-item label="电影名" prop="name">
            <el-col :span="16">
              <el-select
                v-model="planInfo.name"
                clearable
                placeholder="请选择电影名"
                style="width: 100%"
                @change="getInDateData"
              >
                <el-option
                  v-for="item in movieList"
                  :key="item._id"
                  :value="item.name"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="影院名" prop="cinema">
            <el-col :span="16">
              <el-select
                v-model="planInfo.cinema"
                clearable
                placeholder="请选择影院名"
                style="width: 100%"
                @change="getHallList"
              >
                <el-option
                  v-for="item in cinemaList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="影厅名" prop="hall">
            <el-col :span="16">
              <el-select
                v-model="planInfo.hall"
                clearable
                placeholder="请选择影厅名"
                style="width: 100%"
              >
                <el-option
                  v-for="item in hallList"
                  :key="item._id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="放映时间" prop="outTime">
            <el-col :span="16">
              <el-select
                v-model="planInfo.outTime"
                clearable
                placeholder="请选择放映时间"
                style="width: 100%"
              >
                <el-option
                  v-for="item in outTimeOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="散场时间" prop="outTime">
            <el-col :span="16">
              <el-select
                v-model="planInfo.leaveTime"
                clearable
                placeholder="请选择放映时间"
                style="width: 100%"
              >
                <el-option
                  v-for="item in leaveTimeOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="上映日期" prop="inDate">
            <el-col :span="16">
              <el-date-picker
                v-model="planInfo.inDate"
                readonly
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="放映日期" prop="outDate">
            <el-col :span="16">
              <el-date-picker
                v-model="planInfo.outDate"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                :picker-options="datePickerOptions"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="电影售价" prop="sale">
            <el-col :span="16">
              <el-input
                v-model="planInfo.sale"
                placeholder="请输入电影售价"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="managePlanInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 售价自定义校验规则
    let checkPrice = (rule, value, callback) => {
      if (!value) {
        callback(new Error("售价不能为空"));
      } else {
        if (/^(0(?!\.00)|[1-9]\d{0,6})\.\d{2}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确格式的售价"));
        }
      }
    };
    return {
      // 对话框显示标题
      dialogTitle: "",
      // 对话框显示状态
      dialogFormVisible: false,
      // 添加或编辑排片信息
      planInfo: {
        name: "",
        movieId: "",
        cinema: "",
        hall: "",
        inDate: "",
        outDate: "",
        outTime: "",
        leaveTime: "",
        sale: "",
      },
      // 排片列表数据
      planList: [],
      // 影院列表数据
      cinemaList: [],
      // 电影列表数据
      movieList: [],
      // 影厅列表数据
      hallList: [],
      // 放映时间选项
      outTimeOptions: [
        { label: "08:05", value: "08:05" },
        { label: "12:05", value: "12:05" },
        { label: "16:05", value: "16:05" },
        { label: "20:05", value: "20:05" },
      ],
      // 散场时间选项
      leaveTimeOptions: [
        { label: "11:05", value: "11:05" },
        { label: "12:05", value: "12:05" },
        { label: "15:05", value: "15:05" },
        { label: "16:05", value: "16:05" },
        { label: "23:05", value: "23:05" },
        { label: "00:05", value: "00:05" },
      ],
      // 放映日期设置时间只能往后选，之前的禁用
      datePickerOptions: {
        disabledDate: this.disabledDate,
      },
      // 表单验证规则
      planInfoFormrules: {
        name: [
          { required: true, message: "电影名不能为空", trigger: "change" },
        ],
        cinema: [
          { required: true, message: "影院名不能为空", trigger: "change" },
        ],
        hall: [
          { required: true, message: "影厅名不能为空", trigger: "change" },
        ],
        outDate: [
          { required: true, message: "放映日期不能为空", trigger: "change" },
        ],
        outTime: [
          { required: true, message: "放映时间不能为空", trigger: "change" },
        ],
        sale: [{ required: true, validator: checkPrice, trigger: "blur" }],
      },
      // 分页器样式
      queryInfo: {
        // 每页显示的条数
        pageSize: 7,
        // 当前页数
        currentPage: 1,
        // 总页数
        total: 0,
      },
      // 搜索框内容
      searchContent: "",
    };
  },
  methods: {
    //限制可选日期
    disabledDate(time) {
      let curDate = new Date().getTime();
      const two = 2 * 24 * 60 * 60 * 1000;
      const twoDays = curDate + two;
      return time.getTime() < Date.now() || time.getTime() > twoDays; //小于当前的禁止，大于2天前的禁止
    },
    // 获取影院列表
    async getCinemaList() {
      const { data } = await this.$http.get("/rest/cinemas");
      this.cinemaList = data.allData;
      // console.log("影院列表", this.cinemaList);
    },
    // 获取电影列表
    async getMovieList() {
      const { data } = await this.$http.get("/rest/movies");
      this.movieList = data.allData;
      // console.log("电影列表数据", this.movieList);
    },
    // 获取选中的电影数据，从而取出对应电影上映时间数据
    async getInDateData(val) {
      // console.log(val);
      // 选中按钮点击清除按钮时，val为空
      if (!val) {
        return (this.planInfo.inDate = "");
      }
      const data = this.movieList.filter((item) => item.name == val);
      // console.log(data);
      this.planInfo.inDate = data[0].time;
      this.planInfo.movieId = data[0]._id;
    },
    // 获取选中的影院数据，从而取出影厅数据
    async getHallList(val) {
      if (!val) {
        // 在点击清空的时候，val为空，清空数据
        this.planInfo.hall = "";
        this.hallList = [];
      } else {
        const data = this.cinemaList.filter((item) => item._id == val);
        this.hallList = data[0].children;
      }
    },
    // 获取排片列表
    async getPlanList() {
      let res;
      if (!this.searchContent) {
        // 如果搜索框内容为空
        const { data } = await this.$http.get("/rest/plans", {
          params: {
            ...this.queryInfo,
          },
        });
        res = data;
        // console.log(res);
      } else {
        // 如果搜索框内容不为空
        const { data } = await this.$http.get(
          `/rest/plans/${this.searchContent}`,
          {
            params: {
              ...this.queryInfo,
            },
          }
        );
        res = data;
        // console.log(res);
      }
      // console.log(res);
      if (res.data) {
        this.planList = JSON.parse(JSON.stringify(res.data));
      }
      if (res.total) {
        this.queryInfo.total = JSON.parse(JSON.stringify(res.total));
      }
      console.log("排片列表数据", this.planList);
    },
    // 添加排片
    addPlan() {
      // 清空排片列表
      this.planInfo = {};
      this.dialogTitle = "添加排片";
      this.dialogFormVisible = true;
    },
    // 确定对话框
    managePlanInfo() {
      this.$refs.planInfoForm.validate(async (valid) => {
        // 表单验证不通过
        if (!valid) {
          return this.$message.error("请合法输入必填信息");
        }
        // 表单验证通过,发送网络请求,先判断时添加排片还是编辑排片
        let data;

        if (this.dialogTitle === "添加排片") {
          data = await this.$http.post("/rest/plans", this.planInfo);
        } else {
          data = await this.$http.put(
            `/rest/plans/${this.planInfo._id}`,
            this.planInfo
          );
        }
        // 后端数据验证不通过
        if (!data.data.status) {
          return this.$message({
            message: data.data.message,
            type: "error",
          });
        }
        // 后端数据验证通过
        if (this.dialogTitle === "添加排片") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
        if (this.dialogTitle === "编辑排片") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.getPlanList();
        this.dialogFormVisible = false;
        // 清空planInfo数据
        this.planInfo = {};
      });
    },
    // 取消对话框
    cancel() {
      // console.log(this.planInfo);
      this.dialogFormVisible = false;
      // 清空planInfo数据
      this.planInfo = {};
    },
    // 编辑排片
    handleEdit(row) {
      this.dialogTitle = "编辑排片";
      // 这里拿到的row直接赋值是浅拷贝，JSON赋值是深拷贝
      // 如果浅拷贝，Bug：点击编辑出现对话框修改数据，点击取消列表数据会变
      // 但其实并没发请求，刷新后又变回原样
      this.planInfo = JSON.parse(JSON.stringify(row));
      this.planInfo.cinema = this.planInfo.cinema._id;
      // 这里因为影厅数据是从hallList里面取的，而hallList的数据是根据cinema选择器选中后触发getHallList函数取到值来决定，这里直接赋值不会触发该函数，所以要手动触发
      this.getHallList(this.planInfo.cinema);
      this.planInfo.hall = this.planInfo.hall._id;
      this.planInfo.movieId = this.planInfo.movieId._id;
      // console.log(this.planInfo);
      this.dialogFormVisible = true;
    },
    // 撤销电影
    async handleDelete(row) {
      const confirmResult = await this.$confirm(
        `是否确定要撤销电影:${row.name}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const data = await this.$http.delete(`/rest/plans/${row._id}`);
        // 删除后，更新列表
        this.getPlanList();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      } else {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    // 分页器当前页面变动时触发
    handleCurrentChange(val) {
      this.queryInfo.currentPage = val;
      this.getPlanList();
    },
    // 搜索框搜索
    async handleSearch() {
      this.getPlanList();
    },
  },
  created() {
    // 获取排片列表
    this.getPlanList();
    // 获取影院列表
    this.getCinemaList();
    // 获取电影列表
    this.getMovieList();
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 20px;
}
// 海报图片样式
.avatar-uploader-icon {
  width: 276px;
  height: 92px;
  line-height: 92px;
}
.avatar {
  width: 276px;
  height: 92px;
}
</style>