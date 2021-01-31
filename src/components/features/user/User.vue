<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>用户</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 查询条件 -->
  <el-card style="margin-top: 15px;">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="用户昵称" v-model="queryInfo.name" clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="手机号" v-model="queryInfo.phoneNum" clearable>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search"></el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-table height="250" border style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
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
  ></el-pagination>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      queryInfo: {
        name: "2",
        phoneNum: "333",
        currentPage: 1,
        total: 0,
        pageSize: 20
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      const queryInfo = {
        name: this.queryInfo.name,
        phoneNum: this.queryInfo.phoneNum,
        currentPage: this.queryInfo.currentPage,
        pageSize: this.queryInfo.pageSize
      }
      this.$axios
        .post("/admin/user/queryUserList", queryInfo)
        .then(response => {
          console.log(response);
        });
    },
    handleCurrentChange(val) {

    }
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
