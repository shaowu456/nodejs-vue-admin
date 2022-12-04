<template>
  <el-dialog title="出库商品" :visible.sync="visible" width="500px" class="output-dialog">
    <el-form :model="form">
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.name" placeholder="请输入助记码" autocomplete=" 吧off"></el-input> -->
        <el-select v-model="form.refGood" filterable :filter-method="filterMethod">
          <el-option v-for="item in goods" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input-number v-model="form.num" controls-position="right" :max="9999"></el-input-number>
      </el-form-item>
      <el-form-item label="剩余库存" :label-width="formLabelWidth">
        35
      </el-form-item>
      <el-form-item label="金额（元）" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete=" 吧off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      visible: false,
      formLabelWidth: '120px',
      form: {
        refGood: "",
        num: "",
        price: "",
      },
      datatotal: 0,
      items: [],
      goods: []
    };
  },
  computed: {
    ...mapGetters(['logininfo'])
    },
  methods: {
    open() {
      this.visible = true;
    },
    async filterMethod(val) {
      console.log('~~~val', val)
      let res = []
      val ? res = (await this.$http.get(`/findGoodsByNamecode/${val}`)).data : []
      // const res = await this.$http.get("rest/goods");
      this.goods = res;
    },
    async confirm(){
      this.form.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
      this.form.source = this.logininfo._doc.address;
      await this.$http.post('rest/outputs', this.form)
      // this.$router.push('/goods/output')
      this.$message({
        type: 'success',
        message: '出库成功'
      })
      this.$emit('outputSuccess','')
      this.visible = false
    }
  },
  async mounted() {
    // this.fetch();
    const res = await this.$http.get("rest/goods");
    this.goods = res.data;
  },
};
</script>
<style lang="scss" scoped>
.output-dialog ::v-deep .el-input {
  width: 180px;
}
</style>

