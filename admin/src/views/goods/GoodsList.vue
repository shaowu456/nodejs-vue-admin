<template>
  <div>
    <h1>库存管理</h1>
    <el-form label-position="right" inline class="search-header">
      <el-row>
        <el-button size="medium" class="goodsbtnbox" @click="query" type="primary">查询</el-button>
        <el-button size="medium" class="goodsbtnbox" @click="resetQuery">重置</el-button>
        <el-button size="medium" class="goodsbtnbox" @click="create">新建</el-button>
      </el-row>
    </el-form>
    <el-table border stripe :data="goods">
      <!-- <el-table-column prop="_id" label="ID" width="240"></el-table-column> -->
      <el-table-column prop="class.name" label="类别"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="nameCode" label="助记码"></el-table-column>
      <el-table-column prop="originPrice" label="进价"></el-table-column>
      <el-table-column prop="salesPrice" label="零售价"></el-table-column>
      <el-table-column prop="MembershipPrice" label="会员价"></el-table-column>
      <el-table-column prop="count" label="现有库存"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/goods/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [],
      parent: '',
      parentList: []
    };
  },
  methods: {
    async create() {
      // let res = await this.$http.post(`goods`, this.modelC)
      // console.log('~~~res~create', res);
    },
    async query() {
      // const res = await this.$http.get(`/findListByParent/${this.parent}`, { name: '天' });
      const goodsClass = await this.$http.get('/findGoodsByClassLikeGlasses');
      console.log('goodsClass~~', goodsClass)
      // this.goods = res.data;
    },
    async fetchParentLists() {
      const res = await this.$http.get(`/findListByParent/5dce1aa5a8a3823e706a98eb`);
      this.parentList = res.data;
    },
    resetQuery() {
      this.fetch()
    },
    async fetch() {
      const res = await this.$http.get("rest/goods");
      this.goods = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$http.delete(`rest/goods/${row._id}`);
        // const res = await this.$http.delete(`goods/${row._id}`);
        console.log("🚀 ~ file: TestList.vue res", res)
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
    // this.fetchParentLists();
  }
};
</script>
<style lang="scss" scoped>
.search-header{
  margin-bottom: 16px;
}
</style>
