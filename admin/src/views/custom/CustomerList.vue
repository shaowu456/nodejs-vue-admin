<template>
  <div>
    <el-form label-position="right"
             inline>
      <el-row>
        <el-form-item label="姓名">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="model.phone"></el-input>
        </el-form-item>
        <el-button size="medium"
                   class="goodsbtnbox"
                   @click="query"
                   type="primary">查询</el-button>
        <el-button size="medium"
                   class="goodsbtnbox"
                   @click="resetQuery">重置</el-button>
        <el-button size="medium"
                   class="goodsbtnbox"
                   @click="filterQuery">过滤</el-button>
      </el-row>
    </el-form>
    <el-table border stripe @row-click="rowClik"
              :data="items">
      <!-- <el-table-column prop="_id" label="ID" width="240"></el-table-column> -->
      <el-table-column prop="name"
                       label="客户名称"
                       min-width="50"></el-table-column>
      <el-table-column prop="phone"
                       label="手机号码"
                       min-width="60"></el-table-column>
      <el-table-column prop="sex"
                       label="性别"
                       min-width="30"></el-table-column>
      <el-table-column prop="age"
                       label="年龄"
                       min-width="50"></el-table-column>
      <el-table-column prop="name"
                       min-width="50"
                       label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar"
               alt=""
               style="height:4rem">
        </template>
      </el-table-column>
      <el-table-column prop="address"
                       label="地址"
                       min-width="100"
                       show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" v-if="$store.state.user.isSuperadmin"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click.stop="$router.push(`/customers/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text"
                     size="small"
                      @click.stop="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <My-Pagination :querList="fetch"
                     ref="paginations"
                     :total="datatotal"
                     style="float:right"></My-Pagination>
    </el-row>
  </div>
</template>

<script>
import MyPagination from '@/components/Pagination'
export default {
  components: {
    MyPagination
  },
  data () {
    return {
      model: {
        name: '',
        phone: ''
      },
      datatotal: 0,
      items: []
    };
  },
  methods: {
    rowClik(row){
      this.$router.push(`/customers/edit/${row._id}`)
    },
    async query () {
      this.fetch()
    },
    resetQuery () {
      this.model = {
        name: '',
        phone: ''
      }
      this.fetch()
    },
    async fetch () {
      // const res = await this.$http.get("rest/customers");
      const res = await this.$http.post(`findCustomers`, {
         name: this.model.name, 
         phone: this.model.phone,
         pageIndex: this.$refs.paginations.currentPage, // 当前页
         pageSize: this.$refs.paginations.pagesize // 每页大小
         });
      this.items = res.data.items;
      this.datatotal = res.data.count
    },
    async filterQuery() {
      const res = await this.$http.post(`findFilterCustomers`, {
         name: this.model.name, 
         phone: this.model.phone,
         pageIndex: this.$refs.paginations.currentPage, // 当前页
         pageSize: this.$refs.paginations.pagesize // 每页大小
         });
      this.items = res.data.items;
      this.datatotal = res.data.count
    },
    remove (row) {
      this.$confirm(`是否确定要删除客户"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$http.delete(`rest/customers/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  mounted () {
    this.fetch();
  }
};
</script>

