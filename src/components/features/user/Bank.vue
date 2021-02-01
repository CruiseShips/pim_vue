<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>用户</el-breadcrumb-item>
    <el-breadcrumb-item>用户账号仓库</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 查询条件 -->
  <el-card style="margin-top: 15px;">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button @click="search" type="primary" icon="el-icon-search"></el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "Bank"
  ,
  data() {
    return {
      queryInfo: {
        username: "",
        currentPage: 1,
        total: 0,
        pageSize: 2
      }
    }
  },
  created() {
    this.getBankList();
  },
  methods: {
    getBankList() {
      const queryInfo = {
        username: this.queryInfo.username,
        currentPage: this.queryInfo.currentPage,
        pageSize: this.queryInfo.pageSize
      }
      this.$axios
          .post("/admin/bank/queryBankList", queryInfo )
          .then(response => {
            console.log(response);
          });
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
</style>