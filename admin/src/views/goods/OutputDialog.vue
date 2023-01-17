<template>
  <el-dialog :close-on-click-modal="false" title="出库商品" :visible.sync="visible" width="500px" class="output-dialog">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="商品名称" :label-width="formLabelWidth" prop="refGood">
        <!-- <el-input v-model="form.name" placeholder="请输入助记码" autocomplete=" 吧off"></el-input> -->
        <el-select placeholder="请输入助记码" v-model="form.refGood" @change="changeGood" filterable :filter-method="filterMethod">
          <el-option v-for="item in goods" :key="item._id" :label="item.name" :value="item._id">
            <span style="float: left; margin-right: 40px;">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nameCode }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input-number v-model="form.num" controls-position="right" :step="1" step-strictly :min="1" :max="9999"></el-input-number>
      </el-form-item>
      <el-form-item label="剩余库存" :label-width="formLabelWidth">
        {{ form.leftCount }}
      </el-form-item>
      <el-form-item label="金额（元）" :label-width="formLabelWidth" prop="price">
        <el-input class="input-price" @keyup.enter.native="confirm()" v-model="form.price" autocomplete="off"></el-input>
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
        name: '',
        num: 1,
        leftCount: 0,
        price: "",
      },
      datatotal: 0,
      items: [],
      goods: [],
      rules: {
        refGood: [
          { required: true, message: '请选择商品', trigger: 'change' },
        ],
        price: [
          { required: true, message: '请输入金额（元）', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {
    ...mapGetters(['logininfo'])
  },
  watch: {
    visible(val) {
      !val && this.$refs['form'].resetFields();
    }
  },
  methods: {
    open() {
      this.visible = true;
    },
    async filterMethod(val) {
      console.log('~~~val', val)
      let res = []
      // val ? res = (await this.$http.get(`/findGoodsByNamecode/${val}`)).data : []
      val ? res = (await this.$http.post(`findGoodsByNamecode`, {
        source: this.form.source,
        nameCode: val,
      })).data : [];
      // const res = await this.$http.get("rest/goods");
      this.goods = res;
    },
    changeGood(val) {
      let item = this.goods.find(item=>item._id===val)
      console.log('~~~',item)
      this.form.name = item.name
      this.form.leftCount = item.count
    },
    async confirm(){
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.form.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
          // this.form.source = this.logininfo._doc.address;
          // await this.$http.post('rest/outputs', this.form)
          await this.$http.post('output', this.form)
          // this.$router.push('/goods/output')
          this.$message({
            type: 'success',
            message: '出库成功'
          })
          this.$emit('outputSuccess','')
          this.visible = false
        } else {
          return false;
        }
      });

    }
  },
  async mounted() {
    // this.fetch();
    // const res = await this.$http.get("rest/goods");
    // this.goods = res.data;
    this.form.source = this.logininfo._doc.address === '超级管理员'? '光明眼镜': this.logininfo._doc.address;
  },
};
</script>
<style lang="scss" scoped>
.output-dialog ::v-deep .input-price {
  width: 240px;
}
.output-dialog ::v-deep .el-select {
  width: 240px;
}
.output-dialog ::v-deep .is-controls-right {
  width: 240px;
}
</style>

