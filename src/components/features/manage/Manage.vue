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
        <el-input
          placeholder="用户手机号"
          v-model="queryInfo.phoneNum"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input placeholder="邮箱" v-model="queryInfo.email" clearable>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="search"
          >搜索</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          @click="dialogFormVisible = true"
          >添加</el-button
        >
      </el-col>
    </el-row>
  </el-card>

  <el-table
    :data="tableList"
    height="600"
    border
    style="width: 100%; margin-top: 50px;"
    :row-class-name="tableRowClassName"
  >
    <el-table-column type="index" label="序号" />
    <el-table-column prop="name" label="管理员名称" />
    <el-table-column label="头像">
      <template #default="scope">
        <el-avatar v-if="scope.row.img" shape="square" :size="imgSize" :src="imgUrl + scope.row.img"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="登录账号" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="phoneNum" label="电话号" />
    <el-table-column label="封禁">
      <template #default="scope">
        <el-switch
          v-model="scope.row.ban"
          active-text="正常"
          active-value="ON"
          inactive-text="封禁"
          inactive-value="OFF"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="change(scope.row)"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="restartPassword(scope.row)" type="text" size="small">
          重置密码
        </el-button>
        <el-button @click="setRole(scope.row)" type="text" size="small">
          授权
        </el-button>
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

  <el-dialog
    :title="dialogTitle"
    v-model="dialogFormVisible"
    :before-close="handleClose"
  >
    <el-form :model="dialogForm" label-position="left" label-width="80px">
      <el-form-item label="昵称">
        <el-input
          placeholder="请输入昵称"
          v-model="dialogForm.name"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input
          placeholder="请输入账号"
          v-model="dialogForm.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          placeholder="请输入邮箱"
          v-model="dialogForm.email"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          placeholder="请输入手机号"
          v-model="dialogForm.phoneNum"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="dialogForm.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog :title="dialogRoleTitle" v-model="dialogRole">
    <el-checkbox-group v-model="roleList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

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
      dialogTitle: "",
      dialogFormVisible: false,
      dialogForm: {
        name: "",
        username: "",
        email: "",
        phoneNum: "",
        gender: 1
      },
      imgSize: 50,
      imgUrl: "",
      dialogRoleTitle: "授权",
      dialogRole: false,
      roleList: []
    };
  },
  created() {
    this.imgUrl = axios.defaults.baseURL + "file/getFile";
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
    },
    // 取消添加
    cancel() {
      this.dialogFormVisible = false;
      this.dialogForm.name = "";
      this.dialogForm.username = "";
      this.dialogForm.email = "";
      this.dialogForm.phoneNum = "";
    },
    // 弹出框关闭
    handleClose(done) {
      this.cancel();
      done();
    },
    // 添加管理员
    submit() {
      if (!this.dialogForm.name) {
        this.$message({
          message: "请输入昵称",
          type: "error"
        });
        return;
      }
      if (!this.dialogForm.username) {
        this.$message({
          message: "请输入账号",
          type: "error"
        });
        return;
      }
      if (!this.dialogForm.email) {
        this.$message({
          message: "请输入邮箱",
          type: "error"
        });
        return;
      }
      if (!this.dialogForm.phoneNum) {
        this.$message({
          message: "请输入手机号",
          type: "error"
        });
        return;
      }
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+.(.[a-zA-Z0-9_-])+/;
      if (!mailReg.test(this.dialogForm.email)) {
        this.$message({
          message: "邮箱格式不正确",
          type: "error"
        });
        return;
      }
      const phoneReg = /^1[345789]\d{9}$$/;
      if (!phoneReg.test(this.dialogForm.phoneNum)) {
        this.$message({
          message: "手机号格式不正确",
          type: "error"
        });
        return;
      }
      this.$axios
        .post("/admin/manage/addManage", this.dialogForm)
        .then(response => {
          if (response.code === 200) {
            this.cancel();
            this.search();
          } else {
            this.$message({
              message: response.msg,
              type: "error"
            });
          }
        });
    },
    // 显示男女
    tableRowClassName({ row }) {
      if (row.gender === 1) {
        return "man";
      } else if (row.gender === 2) {
        return "woman";
      }
      return "";
    },
    // 封禁&解禁用户
    change(row) {
      const id = row.id;
      if (typeof id !== "undefined") {
        this.$axios.get("/admin/manage/banAdmin?id=" + id).then(response => {
          if (response.code === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              message: response.msg,
              type: "error"
            });
          }
        });
      }
    },
    // 重置密码
    restartPassword(row) {
      const id = row.id;
      this.$confirm("您确定要重置：" + row.name + " 的密码吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios
          .get("/admin/manage/resetPassword?id=" + id)
          .then(response => {
            if (response.code === 200) {
              this.$message({
                message: "重置成功，并发送邮件通知",
                type: "success"
              });
            } else {
              this.$message({
                message: response.msg,
                type: "error"
              });
            }
          });
      });
    },
    // 授权
    setRole(row) {
      this.dialogRole = true;
    }
  }
};
</script>

<style>
.el-table .man {
  background: #f0ffff;
}

.el-table .woman {
  background: #ffc0cb;
}
</style>
