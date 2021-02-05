<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>管理员</el-breadcrumb-item>
    <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 查询条件 -->
  <el-card style="margin-top: 15px;">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-input placeholder="用户昵称" v-model="queryInfo.name" clearable>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="用户账号" v-model="queryInfo.username" clearable>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="用户手机号" v-model="queryInfo.phoneNum" clearable>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="邮箱" v-model="queryInfo.email" clearable>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="5">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus" @click="dialogFormVisible = true">添加</el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-table
    :data="tableList"
    height="600"
    border
    style="width: 100%; margin-top: 50px;"
  >
    <el-table-column type="index" label="序号" />
    <el-table-column prop="name" label="管理员名称" />
    <el-table-column prop="img" label="头像" />
    <el-table-column prop="username" label="登录账号" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="phoneNum" label="电话号" />
    <el-table-column prop="gender" label="性别" />
    <el-table-column prop="ban" label="封禁" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    background
    layout="total, sizes, prev, pager, next"
    :total="queryInfo.total"
    :page-sizes="[20, 50, 100]"
    :page-size="queryInfo.pageSize"
    v-model:currentPage="queryInfo.currentPage"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  ></el-pagination>

  <el-dialog title="收货地址" v-model="dialogFormVisible">
    <el-form :model="dialogForm">
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      queryInfo: {
        username: "",
        email: "",
        phoneNum: "",
        name: "",
        currentPage: 1,
        total: 0,
        pageSize: 20
      },
      tableList: [],
      dialogFormVisible: false,
      dialogForm: {}
    };
  },
  created() {
    this.getManageList();
  },
  methods: {
    search() {
      this.getManageList();
    },
    getManageList() {
      const queryInfo = {
        username: this.queryInfo.username,
        email: this.queryInfo.email,
        phoneNum: this.queryInfo.phoneNum,
        name: this.queryInfo.name,
        currentPage: this.queryInfo.currentPage,
        pageSize: this.queryInfo.pageSize
      };
      this.$axios
        .post("/admin/manage/getManageList", queryInfo)
        .then(response => {
          this.tableList = response.data.records;
          this.queryInfo.total = response.data.total;
        });
    },
    handleCurrentChange(val) {
      this.queryInfo.currentPage = val;
      this.getManageList();
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val;
    }
  }
};
</script>

<style scoped>

</style>
