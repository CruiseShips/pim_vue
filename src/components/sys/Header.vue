<template>
  <div>
    <img src="../../assets/logo/logo.png" width="70" style="margin-top: 5px;">
    <span>PIM 系统管理</span>
  </div>
  <el-button @click="logout" type="info" v-loading.fullscreen.lock="fullscreenLoading">退出</el-button>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      fullscreenLoading: false
    }
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
</style>
