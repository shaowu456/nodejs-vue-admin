<template>
  <div>
    <!-- <el-form label-position="right" inline>
      <el-row>
        <el-button size="medium" class="goodsbtnbox" @click="query" type="primary">查询</el-button>
        <el-button size="medium" class="goodsbtnbox" @click="resetQuery">重置</el-button>
      </el-row>
    </el-form> -->
    <el-table :data="items">
      <!-- <el-table-column prop="_id" label="ID" width="240"></el-table-column> -->
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="icon" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.fakeIconLists[scope.row.fakeIconLists.length-1].url" alt="" style="height:4rem">
        </template>
      </el-table-column>
      <el-table-column prop="time" sortable label="创建时间" min-width="100">
        <template slot-scope="scop">
          {{formatTime(scop.row.time)}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/personal/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
      // this.$router.push('/personal/list')
    },
    formatTime(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss'); 
    },
    async query() {
      const res = await this.$http.get(`/findListByParent/${this.parent}`, { name: '天' });
      this.items = res.data;
    },
    resetQuery() {
      this.fetch()
    },
    async fetch() {
      const res = await this.$http.get("rest/personals");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$http.delete(`rest/personals/${row._id}`);
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
  }
};
</script>

