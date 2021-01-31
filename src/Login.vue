<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%;background: #505458;border: none"
          v-on:click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;

      if (!username) {
        this.$message({
          message: "请输入账号",
          type: "error"
        });
        return;
      }
      if (!password) {
        this.$message({
          message: "请输入密码",
          type: "error"
        });
        return;
      }

      this.$axios.post("/admin/login", { username, password}).then(response => {
          if (response.data.code === 200) {
            let token = response.data.data;
            // 将 Token 存入到全局缓存中
            window.sessionStorage.setItem("token", token);
            // 跳转到页面
            this.$router.replace({ path: "/appIndex" });
          } else {
            // 提示报错信息
            this.$message({
              message: response.data.msg,
              type: "error"
            });
          }
        })
        .catch(failResponse => {
          console.log(failResponse);
          this.$message({
            message: "系统错误",
            type: "error"
          });
        });
    }
  }
};
</script>

<style>
#poster {
  background: url("./assets/img/eva.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
