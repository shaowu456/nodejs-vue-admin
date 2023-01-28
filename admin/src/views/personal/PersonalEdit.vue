<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建' }}个性化</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
      </el-form-item> -->
      <!-- action这里 要写全路径地址 el用的自带的ajax请求  $http.defaults.baseURL就是前面的前缀 -->
      <el-form-item label="图标">
        <!-- <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/uploadForPersonal'" :headers="getAuthHeader()"
          :show-file-list="false" :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <Up-Loadimgs :PfileList.sync="model.iconLists" :fakePfileList.sync="model.fakeIconLists"></Up-Loadimgs>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="model.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import UpLoadimgs from '@/components/UploadImgs.vue'
import { mapGetters } from 'vuex'
export default {
  components:{
    UpLoadimgs
  },
  props: {
    id: {}
  },
  computed: {
    ...mapGetters(['logininfo'])
  },
  data() {
    return {
      model: {},
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
        res = await this.$http.put(`rest/personals/${this.id}`, this.model)
        // res = await this.$http.put(`personals/${this.id}`, this.model)
      } else {
        this.model.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        res = await this.$http.post('rest/personals', this.model)
        // res = await this.$http.post(`personals`, this.model)
      }
      this.$router.push('/personal/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/personals/${this.id}`)
      // const res = await this.$http.get(`items/${this.id}`)
      this.model = res.data
      this.model.iconLists = this.model.fakeIconLists
    },
  },
  created() {
    this.model.source = this.logininfo._doc.address === '超级管理员'? '光明眼镜': this.logininfo._doc.address;
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
