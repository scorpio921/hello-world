<template>
  <div id="app">
    <el-tabs  @tab-click="handleBtnUserClick">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {
    handleBtnUserClick() {
      this.$router.push("/user");
    },
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  box-sizing: border-box;
  padding: 40px;
}
</style>
