<template>
  <div>
    <img src="../../assets/logo/logo.png" width="70" style="margin-top: 5px;" />
    <span>PIM 系统管理</span>
  </div>
  <div>
    <el-avatar shape="square" :size="imgSize" :src="img"></el-avatar>

    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-button size="mini">{{ name }}</el-button>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>修改头像</el-dropdown-item>
          <el-dropdown-item @click="logout" v-loading.fullscreen.lock="fullscreenLoading">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
  data() {
    return {
      fullscreenLoading: false,
      img: "",
      imgSize: 50,
      name: ""
    };
  },
  created() {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    this.img = axios.defaults.baseURL + "file/getFile" + user.img;
    this.name = user.name;
  },
  methods: {
    logout() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        window.sessionStorage.clear();
        this.$router.push("/login");
      }, 1000);
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
}
div span {
  margin-left: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
