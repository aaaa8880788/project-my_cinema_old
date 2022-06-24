<template>
  <div class="Movie">
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
        <el-button type="primary" size="small" @click="addMovie"
          >添加电影</el-button
        >
      </el-col>
    </div>
    <!-- 表格 -->
    <div class="movie-table">
      <el-table border :data="movieList">
        <el-table-column label="海报" width="100" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.image" style="width: 4rem" />
          </template>
        </el-table-column>
        <el-table-column
          label="电影名"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="导演"
          prop="director"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="类型"
          width="110"
          prop="type"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="上映时间"
          show-overflow-tooltip
          width="120"
          prop="time"
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
              >删除</el-button
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
    <!-- 添加或编辑电影对话框 -->
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
          :model="movieInfo"
          :rules="movieInfoFormrules"
          ref="movieInfoForm"
        >
          <el-form-item label="电影名" prop="name">
            <el-col :span="16">
              <el-input
                v-model="movieInfo.name"
                placeholder="请输入电影名"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="海报" prop="image">
            <el-col :span="16">
              <el-upload
                class="avatar-uploader"
                :action="`${uploadUrl}/image`"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterAvatarUpload"
              >
                <img
                  v-if="movieInfo.image"
                  :src="movieInfo.image"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item label="导演" prop="director">
            <el-col :span="16">
              <el-input
                v-model="movieInfo.director"
                placeholder="请输入导演昵称"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="演员" prop="performer">
            <el-col :span="16">
              <el-input
                v-model="movieInfo.performer"
                placeholder="请输入演员昵称"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="片长" prop="duration">
            <el-col :span="16">
              <el-input
                v-model="movieInfo.duration"
                placeholder="请输入填写影片时长"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="语言" prop="language">
            <el-col :span="16">
              <el-select
                v-model="movieInfo.language"
                placeholder="请选择语言"
                style="width: 100%"
              >
                <el-option
                  v-for="item in languageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-col :span="16">
              <el-select
                v-model="movieInfo.type"
                placeholder="请选择类型"
                style="width: 100%"
                multiple
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="视觉类型" prop="vision">
            <el-col :span="16">
              <el-select
                v-model="movieInfo.vision"
                placeholder="请选择视觉类型"
                style="width: 100%"
              >
                <el-option label="2D" value="2D"></el-option>
                <el-option label="3D" value="3D"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="上映时间" prop="time">
            <el-col :span="16">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="movieInfo.time"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="电影简介" prop="summary">
            <el-col :span="16">
              <el-input
                type="textarea"
                v-model="movieInfo.summary"
                :autosize="{ minRows: 4, maxRows: 10 }"
                placeholder="请填写电影简介"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="manageMovieInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let checkduration = (rule, value, callback) => {
      if (!value) {
        callback(new Error("片长信息不能为空"));
      } else {
        if (/^[1-9]{1}[0-9]+分钟$/.test(value)) {
          callback();
        } else {
          callback(new Error("格式应为xx分钟"));
        }
      }
    };
    return {
      // 语言类型
      languageOptions: [
        {
          value: "粤语",
          label: "粤语",
        },
        {
          value: "国语",
          label: "国语",
        },
        {
          value: "英语",
          label: "英语",
        },
        {
          value: "日语",
          label: "日语",
        },
        {
          value: "其它",
          label: "其它",
        },
      ],
      // 电影类型
      typeOptions: [
        {
          value: "动漫",
          label: "动漫",
        },
        {
          value: "言情",
          label: "言情",
        },
        {
          value: "科幻",
          label: "科幻",
        },
        {
          value: "喜剧",
          label: "喜剧",
        },
        {
          value: "爱情",
          label: "爱情",
        },
        {
          value: "剧情",
          label: "剧情",
        },
        {
          value: "动作",
          label: "动作",
        },
        {
          value: "冒险",
          label: "冒险",
        },
        {
          value: "青春",
          label: "青春",
        },
        {
          value: "悬疑",
          label: "悬疑",
        },
        {
          value: "恐怖",
          label: "恐怖",
        },
        {
          value: "其它",
          label: "其它",
        },
      ],
      // 对话框显示标题
      dialogTitle: "",
      // 对话框显示状态
      dialogFormVisible: false,
      // 添加或编辑电影信息
      movieInfo: {
        name: "",
        image: "",
        director: "",
        performer: "",
        duration: "",
        language: "",
        type: [],
        vision: "",
        time: "",
        summary: "",
      },
      // 电影列表信息
      movieList: [],
      // 表单验证规则
      movieInfoFormrules: {
        name: [{ required: true, message: "电影名不能为空", trigger: "blur" }],
        image: [{ required: true, message: "请上传电影海报", trigger: "blur" }],
        director: [
          { required: true, message: "导演信息不能为空", trigger: "blur" },
        ],
        performer: [
          { required: true, message: "主演信息不能为空", trigger: "blur" },
        ],
        duration: [
          { required: true, validator: checkduration, trigger: "blur" },
        ],
        language: [
          { required: true, message: "请选择语言", trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择电影类型", trigger: "change" },
        ],
        vision: [
          { required: true, message: "请选择视觉类型", trigger: "change" },
        ],
        time: [{ required: true, message: "请选择上映日期", trigger: "blur" }],
        summary: [
          { required: true, message: "电影简介信息不能为空", trigger: "blur" },
        ],
      },
      // 分页器样式
      queryInfo: {
        // 每页显示的条数
        pageSize: 3,
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
    // 获取电影列表
    async getMovieList() {
      let res;
      if (!this.searchContent) {
        // 如果搜索框内容为空
        const { data } = await this.$http.get("/rest/movies", {
          params: {
            ...this.queryInfo,
          },
        });
        res = data;
      } else {
        const { data } = await this.$http.get(
          `/rest/movies/${this.searchContent}`,
          {
            params: {
              ...this.queryInfo,
            },
          }
        );
        res = data;
      }
      // console.log(res);
      if (res.data) {
        this.movieList = JSON.parse(JSON.stringify(res.data));
      }
      if (res.total) {
        this.queryInfo.total = JSON.parse(JSON.stringify(res.total));
      }
    },
    // 添加电影
    addMovie() {
      // 清空电影列表
      this.movieInfo = {
        type: [],
      };
      this.dialogTitle = "添加电影";
      this.dialogFormVisible = true;
    },
    // 确定对话框
    manageMovieInfo() {
      this.$refs.movieInfoForm.validate(async (valid) => {
        // 表单验证不通过
        if (!valid) {
          return this.$message.error("请合法输入必填信息");
        }

        // 数据处理
        // 类型的值是个数组，将里面的值转字符串用、分隔
        this.movieInfo.type = this.movieInfo.type.join("、");
        // console.log(this.movieInfo);

        // 表单验证通过,发送网络请求,先判断时添加电影还是编辑电影
        let data;
        if (this.dialogTitle === "添加电影") {
          data = await this.$http.post("/rest/movies", this.movieInfo);
        } else {
          data = await this.$http.put(
            `/rest/movies/${this.movieInfo._id}`,
            this.movieInfo
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
        if (this.dialogTitle === "添加电影") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
        if (this.dialogTitle === "编辑电影") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
        this.getMovieList();
        this.dialogFormVisible = false;
      });
    },
    // 取消对话框
    cancel() {
      // console.log(this.movieInfo);
      this.dialogFormVisible = false;
    },
    // 上传完图片处理函数
    afterAvatarUpload(res) {
      // this.movieInfo.image = res.url;
      // 这里用$set的原因是因为添加电影时,movieInfo清空，里面没有image属性，而你这里又给这个属性直接赋值，会造成vue响应不了
      this.$set(this.movieInfo, "image", res.url);
    },
    // 编辑电影
    handleEdit(row) {
      this.dialogTitle = "编辑电影";
      // 这里拿到的row直接赋值是浅拷贝，JSON赋值是深拷贝
      // 如果浅拷贝，Bug：点击编辑出现对话框修改数据，点击取消列表数据会变
      // 但其实并没发请求，刷新后又变回原样
      // 数据处理
      // 因为获取数据时将类型的数据进行了数字转字符串处理，这里要转回来
      let data = JSON.parse(JSON.stringify(row));
      // console.log(data);
      data.type = data.type[0].split("、");
      this.movieInfo = data;
      this.dialogFormVisible = true;
      // console.log(this.movieInfo);
    },
    // 删除电影
    async handleDelete(row) {
      const confirmResult = await this.$confirm(
        `是否确定要删除电影:${row.name}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "confirm") {
        // 删除成功，发送删除数据请求
        const data = await this.$http.delete(`/rest/movies/${row._id}`);
        // 删除后，更新列表
        this.getMovieList();
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
      this.getMovieList();
    },
    // 搜索框搜索
    async handleSearch() {
      this.getMovieList();
    },
  },
  created() {
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
  width: 120px;
  height: 160px;
  line-height: 160px;
}
.avatar {
  width: 120px;
  height: 160px;
}
</style>