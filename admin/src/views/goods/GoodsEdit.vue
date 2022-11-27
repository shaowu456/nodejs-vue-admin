<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}商品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="model.class">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="助记码">
        <el-input v-model="model.nameCode"></el-input>
      </el-form-item>
      <el-form-item label="进价">
        <el-input v-model="model.originPrice"></el-input>
      </el-form-item>
      <el-form-item label="零售价">
        <el-input v-model="model.salesPrice"></el-input>
      </el-form-item>
      <el-form-item label="会员价">
        <el-input v-model="model.MembershipPrice"></el-input>
      </el-form-item>
      <el-form-item label="现有库存">
        <el-input v-model="model.count"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    }
  },
  methods: {
    async afterUpload(res) {
      console.log('afterUpload~~~', res)
      // 显示赋值
      this.$set(this.model, 'icon', res.url)
      // this.model.icon = res.url
    },
    async save() {
      // eslint-disable-next-line no-unused-vars
      let res
      if (this.id) {
        res = await this.$http.put(`rest/goods/${this.id}`, this.model)
        // res = await this.$http.put(`items/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/goods', this.model)
        // res = await this.$http.post(`items`, this.model)
      }
      this.$router.push('/goods/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/goods/${this.id}`)
      // const res = await this.$http.get(`items/${this.id}`)
      this.model = res.data
    },
    async fetchParents() {
      const goodsClass = await this.$http.get('/findGoodsByClassLikeGlasses');
      // const res = await this.$http.get(`categories`)
      this.parents = goodsClass.data
    },
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
