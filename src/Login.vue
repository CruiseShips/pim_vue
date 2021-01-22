<template>
  <div>
    用户名:<input type="text" v-model="username" placeholder="请输入用户名"/>
    <br><br>
    密码： <input type="password" v-model="password" placeholder="请输入密码"/>
    <br><br>
    <button v-on:click="login">登录</button>
  </div>
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

    }
  }
};
</script>

<style scoped>

</style>
