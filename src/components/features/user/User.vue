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
        <el-button @click="search" type="primary" icon="el-icon-search"></el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-table :data="tableList" :row-class-name="tableRowClassName" height="600" border style="width: 100%; margin-top: 50px;">
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column prop="name" label="昵称" width="130" />
    <el-table-column prop="photo" label="头像" width="180" />
    <el-table-column prop="email" label="邮箱" width="180" />
    <el-table-column prop="phoneNum" label="电话号" width="130" />
    <el-table-column prop="openId" label="openId" width="180" />
    <el-table-column prop="createDt" label="创建日期" width="180" />
    <el-table-column prop="spaceSize" label="空间使用" width="100" />
    <el-table-column prop="isMembers" label="是否是会员" width="100" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
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
  ></el-pagination>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      queryInfo: {
        name: "",
        phoneNum: "",
        currentPage: 1,
        total: 0,
        pageSize: 20
      },
      tableList: []
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
          this.tableList = response.data.records;
          this.queryInfo.total = response.data.total;
          this.queryInfo.currentPage = response.data.current;
        });
    },
    handleCurrentChange(val) {
      this.queryInfo.currentPage = val;
      this.getUserList();
    },
    tableRowClassName({row, rowIndex}) {
      if (row.gender === 1) {
        return "warning-row";
      } else if (row.gender === 2) {
        return "success-row";
      }
      return "";
    },
    search() {
      this.getUserList();
    }
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
