<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      model: {},
    }
  },
  methods: {
    async login(){
      const res = await this.$store.dispatch('login', this.model)
      localStorage.token = res.data.token
      this.$router.push('/goods/list')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
}
</script>

<style>
.login-container{
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
.login-card{
  position: relative;
  top: calc(50% - 263px);
  width: 25rem;
  margin: 0 auto;
}
</style>
