<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>用户</el-breadcrumb-item>
    <el-breadcrumb-item>用户账号仓库</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 查询条件 -->
  <el-card style="margin-top: 15px;">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="用户昵称" v-model="queryInfo.username" clearable>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          @click="search"
          type="primary"
          icon="el-icon-search"
        ></el-button>
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
    <el-table-column prop="username" label="用户昵称" />
    <el-table-column prop="bankAll" label="账号仓库数量" />
    <el-table-column prop="accountAll" label="账号数量" />
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
  ></el-pagination>

  <el-drawer :title="drawerTitle" v-model="drawer" :with-header="true">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="item in activeList" :key="item.id" :title="item.name + ' (' + item.createDt + ')'" :name="item.id">
        <div>
          {{item.describe}}
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-drawer>
</template>

<script>
export default {
  name: "Bank",
  data() {
    return {
      queryInfo: {
        username: "",
        currentPage: 1,
        total: 0,
        pageSize: 20
      },
      tableList: [],
      drawer: false,
      drawerTitle: "",
      activeNames: [],
      activeList: []
    };
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
      };
      this.$axios
        .post("/admin/bank/queryBankList", queryInfo)
        .then(response => {
          this.tableList = response.data.data;
          this.queryInfo.total = response.data.count;
        });
    },
    search() {
      this.getBankList();
    },
    handleCurrentChange(val) {
      this.queryInfo.currentPage = val;
      this.getBankList();
    },
    handleClick(row) {
      this.drawer = true;
      this.drawerTitle = row.username + " 的账号仓库";
      this.$axios
        .get("/admin/bank/queryBankInfoList?userId=" + row.userId)
        .then(response => {
          if (response.data.length > 0) {
            this.activeNames = ["1"];
            this.activeList = response.data;
          }
        });
    }
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
.el-collapse {
  padding: 15px;
}
</style>
