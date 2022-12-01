<template>
  <div>
    <h1>库存管理</h1>
    <el-form label-position="right" inline class="search-header">
      <el-row>
        <el-button size="medium" class="goodsbtnbox" @click="query" type="primary">查询</el-button>
        <el-button size="medium" class="goodsbtnbox" @click="resetQuery">重置</el-button>
        <el-button size="medium" class="goodsbtnbox" @click="importXlsx">导入</el-button>
        <!-- <el-button size="medium" class="goodsbtnbox" @click="create">新建</el-button> -->
      </el-row>
    </el-form>
    <div class="content-box">
      <div class="left-pane">
        <el-tree :highlight-current="true" current-node-key="all" @node-click="nodeClick" :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node }">
          <!-- <span class="custom-tree-node" slot-scope="{ node }"> -->
            <span>{{ node.label }}</span>
            <!-- {{data}} -->
            <!-- <span>
              <el-button type="text" size="mini"> Append</el-button>
              <el-button type="text" size="mini"> Delete </el-button>
            </span> -->
          </span>
        </el-tree>
      </div>
      <div class="right-pane">
        <el-table border stripe size="mini" :data="goods">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // const data = [
    //   {
    //     id: 1,
    //     label: "所有类别",
    //     children: [
    //       {
    //         id: 4,
    //         label: "一级 1-1"
    //       },
    //       {
    //         id: 5,
    //         label: "二级 1-1"
    //       },
    //       {
    //         id: 6,
    //         label: "三级 1-1"
    //       },
    //     ],
    //   }
    // ];
    return {
      data: [
        {
          id: 'all',
          label: "所有类别",
          children: [
            {
              id: 4,
              label: "一级 1-1"
            },
            {
              id: 5,
              label: "二级 1-1"
            },
            {
              id: 6,
              label: "三级 1-1"
            },
          ],
        }
      ],
      goods: [],
      parent: "",
      parentList: [],
    };
  },
  async created() {
    const goodsClass = await this.$http.get('/findGoodsByClassLikeGlasses');
    console.log('goodsClass~~~', goodsClass.data.map(item=>{
      return {
        id: item._id,
        labe: item.name
      }
    }))
    this.data[0].children = goodsClass.data.map(item=>{
      return {
        id: item._id,
        label: item.name
      }
    })
    this.fetch();
  },
  methods: {
    async nodeClick(value,node,tree) {
      console.log(value,node,tree)
      const res = await this.$http.get(`/findGoodsByClass/${value.id}`);
      console.log("goodsClass~~", res);
      this.goods = res.data;
    },
    async importXlsx() {
      let classMap = {
        '镜架': '6383798545a8074c1216aa1a',
        '镜片': '6383799145a8074c1216aa23',
        '隐形眼镜': '638379a845a8074c1216aa2c',
        '隐形眼镜药水': '63863248ab3c101a952ac07e',
        '太阳镜': '63863252ab3c101a952ac087',
        '老花镜': '6386325cab3c101a952ac090',
        '其它': '6386326fab3c101a952ac099',
      }
      await fetch('data.json').then((response) => response.json())
      .then(async (json) => {
        console.log('~~~data', json)
        for(let i of json){
          console.log(i,json)
          await this.$http.post('rest/goods', {
            "name": i.name,
            "class": classMap[i.class],
            "nameCode": i.nameCode,
            "originPrice": i.originPrice,
            "salesPrice": i.salesPrice,
            "MembershipPrice": i.MembershipPrice,
            "count": i.count,
          })
        }
      });
      
    },
    async query() {
      // const res = await this.$http.get(`/findListByParent/${this.parent}`, { name: '天' });
      const goodsClass = await this.$http.get("/findGoodsByClassLikeGlasses");
      console.log("goodsClass~~", goodsClass);
      // this.goods = res.data;
    },
    async fetchParentLists() {
      const res = await this.$http.get(
        `/findListByParent/5dce1aa5a8a3823e706a98eb`
      );
      this.parentList = res.data;
    },
    resetQuery() {
      this.fetch();
    },
    async fetch() {
      const res = await this.$http.get("rest/goods");
      this.goods = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$http.delete(`rest/goods/${row._id}`);
        // const res = await this.$http.delete(`goods/${row._id}`);
        console.log("🚀 ~ file: TestList.vue res", res);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.search-header {
  margin-bottom: 16px;
}
.content-box{
  display: flex;
  .left-pane {
    min-width: 240px;
    margin-right: 16px;
    border: 1px solid #e4e4e4;
  }
  .right-pane{
    width: calc(100% - 260px);
  }
}
</style>
