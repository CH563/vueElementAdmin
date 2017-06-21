<template>
  <div class="wrong-wrap">
    <img src="../../assets/404.png">
    <p>很抱歉！你访问的页面不存在</p>
    <el-button type="primary" @click="goHome">返回首页</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      goHome: function(){
        this.$router.push({ path: '/' });
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>