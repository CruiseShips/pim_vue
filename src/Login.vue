<template>
  <body id="poster">
    <el-form class="login-container" label-position="left"
             label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
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

      if(!username) {
          this.$message({
						message: '请输入账号',
						type: 'error'
          });
          return;
        }
        if(!password) {
          this.$message({
						message: '请输入密码',
						type: 'error'
          });
          return;
        }

        this.$axios.post('/login', {
            username,
            password
          })
          .then(success => {
            if (success.data.code === 200) {
              console.log(success);
              let token = success.data.data;
              window.localStorage.setItem("token", token);

              this.$router.replace({path: '/index'})
            } else {
              this.$message({
                message: success.data.msg,
                type: 'error'
              });
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$message({
              message: '系统错误',
              type: 'error'
            });
          })
    }
  }
};
</script>

<style>
  #poster {
    background:url("./assets/img/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
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
