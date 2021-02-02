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
        <el-button @click="search" type="primary" icon="el-icon-search"></el-button>
      </el-col>
    </el-row>
  </el-card>

  <el-table :data="tableList" height="250" border style="width: 100%; margin-top: 50px;">
    <el-table-column type="index" label="序号" />
    <el-table-column prop="username" label="用户昵称" />
    <el-table-column prop="bankAll" label="账号仓库数量" />
    <el-table-column prop="accountAll" label="账号数量" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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

  <el-drawer
      :title="drawerTitle"
      v-model="drawer"
      :with-header="true">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </el-drawer>
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
        pageSize: 20
      },
      tableList: [],
      drawer: false,
      drawerTitle: "",
      activeNames: []
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
            this.tableList = response.data.data.data;
            this.queryInfo.total = response.data.data.count;
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
      // row.userId
    },
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
.el-collapse {
  padding: 15px;
}
</style>