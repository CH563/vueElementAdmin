<template>
  <div class="wrong-wrap">
    <h2 class="wel-title">欢迎登录后台管理系统</h2>
    <p>只开发页面模版</p>
    <el-button type="primary" @click="goHome">charts</el-button>
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
        this.$router.push({ path: '/chart' });
      }
    }
  }

</script>

<style lang="scss" scoped>
.wel-title{
  font-size: 36px;
  color:#697685;
  font-weight: bold;
  margin-bottom:30px;
  letter-spacing: 3px;
  @media (max-width: 480px){
    font-size: 20px;
    letter-spacing: 0;
  }
}
.wrong-wrap{
  @media (max-width: 480px){
    padding:40px 20px 0;
  }
  p{
    @media (max-width: 480px){
      font-size: 12px;
    }
  }
}
</style>