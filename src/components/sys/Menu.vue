<template>
  <!-- 菜单 -->
  <el-menu active-text-color="#409FFF" unique-opened router>
    <el-menu-item index="/index">
      <i class="el-icon-house"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-submenu index="2">
      <template #title>
        <i class="el-icon-user"></i>
        <span>用户</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user">
          <i class="el-icon-user-solid"></i>
          <template #title>用户信息</template>
        </el-menu-item>
        <el-menu-item index="/bank">
          <i class="el-icon-lock"></i>
          <template #title>用户账户仓库</template>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/manage">
      <i class="el-icon-s-custom"></i>
      <template #title>管理员</template>
    </el-menu-item>
    <el-menu-item index="/notice">
      <i class="el-icon-message"></i>
      <template #title>消息管理</template>
    </el-menu-item>
    <el-menu-item index="/sys">
      <i class="el-icon-setting"></i>
      <template #title>系统配置</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Menu"
};
</script>

<style scoped>
.el-aside {
  text-align: left;
}

.el-aside .el-menu{
  border-right: none;
}
</style>
