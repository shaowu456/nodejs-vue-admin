<template>
  <div>
    <h1>物品列表</h1>
    <el-form label-position="right" inline>
      <el-row>
        <el-button size="medium" class="goodsbtnbox" @click="query" type="primary">查询</el-button>
        <el-button size="medium" class="goodsbtnbox" @click="resetQuery">重置</el-button>
        <el-button size="medium" class="goodsbtnbox" @click="create">新建</el-button>
      </el-row>
    </el-form>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="name" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="height:4rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
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
      items: [],
      parent: '',
      parentList: []
    };
  },
  methods: {
    async create() {
      // let res = await this.$http.post(`items`, this.modelC)
      // console.log('~~~res~create', res);
    },
    async query() {
      const res = await this.$http.get(`/findListByParent/${this.parent}`, { name: '天' });
      this.items = res.data;
    },
    async fetchParentLists() {
      const res = await this.$http.get(`/findListByParent/5dce1aa5a8a3823e706a98eb`);
      this.parentList = res.data;
    },
    resetQuery() {
      this.fetch()
    },
    async fetch() {
      const res = await this.$http.get("rest/items");
      // const res = await this.$http.get("items");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$http.delete(`rest/items/${row._id}`);
        // const res = await this.$http.delete(`items/${row._id}`);
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

