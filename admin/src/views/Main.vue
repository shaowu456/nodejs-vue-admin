<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '2']" :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group> -->
          <el-menu-item-group>
            <template slot="title">客户</template>
            <el-menu-item index="/customers/create">新建客户</el-menu-item>
            <el-menu-item index="/customers/list">客户列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">商品</template>
            <el-menu-item index="/goods/create">新建商品</el-menu-item>
            <el-menu-item index="/goods/list">库存管理</el-menu-item>
            <el-menu-item index="/goods/output">出库管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>系统设置</template>
          <el-menu-item-group v-if="adminShow">
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px;height:40px">
        <span>{{username}}</span>
        <el-dropdown trigger="click" style="cursor:pointer">
          <i class="el-icon-arrow-down el-icon--right" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native.prevent="leave">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      
      <el-main id="container_box" class="container_box">
         <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 40px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        username:'',
        adminShow: false
      }
    },
    computed: {
    ...mapGetters(['logininfo'])
    },
    mounted(){
      console.log('~~~',this.logininfo)
      this.username = this.logininfo._doc.address
      if(this.logininfo._doc.username === 'superadmin'){
        this.adminShow = true
      }else{
        this.adminShow = false
      }
    },
    methods: {
      leave(){
        localStorage.clear()
        this.$router.push('/login')
      }
    }
  };
</script>
<style>
.container_box {
  display: block;
  overflow: hidden;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: break-all;
}
</style>