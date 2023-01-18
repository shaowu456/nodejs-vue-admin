<template>
  <div>
    <el-form label-position="right" inline class="search-header">
      <el-row>
        <!-- <el-button size="medium" class="goodsbtnbox" @click="createClass" type="primary">新建分类</el-button> -->
        <el-button size="medium" class="goodsbtnbox" @click="createGood" type="primary">新建商品</el-button>
        <el-button size="medium" class="goodsbtnbox" @click="resetQuery">重置</el-button>
        <!-- <el-button v-if="isSuperAdmin" size="medium" class="goodsbtnbox" @click="importXlsx">导入</el-button> -->
        <!-- <el-button size="medium" class="goodsbtnbox" @click="create">新建</el-button> -->
        <span style="color:#606266;font-size: 13px;margin-left: 16px;">来源：</span>
        <el-select v-model="source"  @change="fetch()">
          <el-option
            v-for="item in sources"
            :key="item.username"
            :label="item.address"
            :value="item.address">
          </el-option>
        </el-select>
      </el-row>
    </el-form>
    <div class="content-box">
      <div class="left-pane">
        <el-tree ref="tree" :highlight-current="true" current-node-key="all" @node-click="nodeClick" :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
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
          <el-table-column width="60" label="序号">
            <template slot-scope="scop">
              {{scop.$index+1}}
            </template>
          </el-table-column>
          <el-table-column prop="class.name" label="类别"></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="nameCode" label="助记码"></el-table-column>
          <el-table-column prop="originPrice" label="进价"></el-table-column>
          <el-table-column prop="salesPrice" label="零售价"></el-table-column>
          <el-table-column prop="MembershipPrice" label="会员价"></el-table-column>
          <el-table-column prop="count" label="现有库存"></el-table-column>
          <el-table-column prop="source" label="来源"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180" v-if=" isSuperAdmin || source==logininfo._doc.address">
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
import { mapGetters } from 'vuex'
export default {
  data() {
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
      // 所选分类的 id
      class: 'all', 
      source: '全部',
      sources: [],
      isAdmin: false
    };
  },
  computed: {
    ...mapGetters(['logininfo'])
  },
  async created() {
    const goodsClass = await this.$http.get('/findGoodsByClassLikeGlasses');
    this.data[0].children = goodsClass.data.map(item=>{
      return {
        id: item._id,
        label: item.name
      }
    })
    console.log('isSuperAdmin')
    this.resetQuery();
  },
  methods: {
    createClass() {

    },
    createGood() {
      this.$router.push('/goods/create')
    },
    sourceChange(val) {
      console.log(val)
    },
    async nodeClick(value,node,tree) {
      console.log(value,node,tree)
      this.class = value.id;
      // const res = await this.$http.get(`/findGoodsByClass/${value.id}`);
      // console.log("goodsClass~~", res);
      // this.goods = res.data;
      this.fetch()
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
        // 光明眼镜 佳镜眼镜(城南) 佳镜眼镜(后坝)
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
            "source": this.source
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
    async resetQuery() {
      this.$refs.tree.setCurrentKey('all')
      this.source = this.logininfo._doc.address === '超级管理员'? '光明眼镜': this.logininfo._doc.address;
      // this.sources = [{username:'all', address:'全部'}].concat((await this.$http.get("rest/admin_users")).data);
      this.sources = (await this.$http.get("rest/admin_users")).data;
      this.sources = this.sources.filter(item=> !['admin', 'superadmin'].includes(item.username))
      this.fetch();
    },
    async fetch() {
      // const res = await this.$http.get("rest/goods");
      const res = await this.$http.post(`findGoods`, {
        source: this.source,
        itemClass: this.class,
      });
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
    height: 500px;
    border: 1px solid #e4e4e4;
  }
  .right-pane{
    width: calc(100% - 260px);
  }
}
</style>
