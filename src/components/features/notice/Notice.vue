<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="系统消息" name="sys">
      <SysNotice></SysNotice>
    </el-tab-pane>
    <el-tab-pane label="用户消息" name="user">
      <UserNotice></UserNotice>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SysNotice from "@/components/features/notice/SysNotice";
import UserNotice from "@/components/features/notice/UserNotice";

export default {
  name: "Notice",
  components: {
    SysNotice,
    UserNotice
  },
  data() {
    return {
      activeName: "sys"
    };
  }
};
</script>

<style>

</style>
