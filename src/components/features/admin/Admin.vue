<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>管理员</el-breadcrumb-item>
    <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 查询条件 -->
  <el-card style="margin-top: 15px;">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="用户昵称" v-model="queryInfo.name" clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="用户账号" v-model="queryInfo.username" clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="用户手机号" v-model="queryInfo.phoneNum" clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="邮箱" v-model="queryInfo.email" clearable>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="search" type="primary" icon="el-icon-search"></el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "Admin",
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
      tableList: []
    }
  },
  created() {
    this.getAdminList();
  },
  methods: {
    search() {

    },
    getAdminList() {
      const queryInfo = {
        username: this.queryInfo.username,
        email: this.queryInfo.email,
        phoneNum: this.queryInfo.phoneNum,
        name: this.queryInfo.name,
        currentPage: this.queryInfo.currentPage,
        pageSize: this.queryInfo.pageSize
      };
      this.$axios.post("/admin/admin/getAdminList", queryInfo).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style scoped>

</style>
