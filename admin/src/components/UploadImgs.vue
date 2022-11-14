<template>
  <div class="my_upload">
    <el-upload
    :class="{notSuperadmin:!$store.state.user.isSuperadmin}"
      :action="uploadUrl"
      :headers="getAuthHeader()"
      list-type="picture-card"
      :before-upload="beforeUploadPicture"
      :on-preview="handlePictureCardPreview"
      :on-progress="uploadProgress"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :file-list="fileList"
      :show-file-list="true"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'upload',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    total: {
      type: [String, Number],
      default: 60
    },
    PfileList: {
      type: Array,
      default:()=>{
        return []
      }
    },
    fakePfileList: {
      type: Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
      fileList: this.PfileList,
      fakeFileList:  [],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadComplete: true // 图片上传完成状态
    }
  },
  watch:{
    PfileList(val){
      this.fileList = val
    },
    fileList(val) {
      this.$emit('update:PfileList', val)
    },
    fakePfileList(val){
      this.fakeFileList = val
    },
    fakeFileList(val) {
      this.$emit('update:fakePfileList', val)
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片前调用方法
    beforeUploadPicture(file) {
      if(file.size > 2*1024*1024){
        this.$message.error("上传图片不能大于2M");
        return false;
      }
    },
    // 上传图片时调用
    // eslint-disable-next-line no-unused-vars
    uploadProgress(event,file, fileList){
      this.uploadComplete = false;
    },
    // 上传图片成功
    uploadSuccess(res, file, fileList) {
      this.fakeFileList = []
      fileList.map(item=>{
        let url = ''
        item.response?url = item.response.url:url = item.url
        this.fakeFileList.push({
          name:item.name,
          url
        })
      })
      this.uploadComplete = true;
    },
    // 上传图片出错
    // eslint-disable-next-line no-unused-vars
    uploadError(err, file, fileList) {
      this.$message.error("上传出错");
    },
    // 移除图片
    // eslint-disable-next-line no-unused-vars
    handleRemove(file, fileList) {
      this.fakeFileList = []
      fileList.map(item=>{
        let url = ''
        item.response?url = item.response.url:url = item.url
        this.fakeFileList.push({
          name:item.name,
          url
        })
      })
    },
    handleRemove2(){
      return false
    }
  }
}
</script>
<style>
.my_upload .el-upload-list--picture-card .el-upload-list__item{
  width: 108px !important;
  height: 108px !important;
}
.my_upload  .el-upload--picture-card{
  width: 108px !important;
  height: 108px !important; 
  line-height: 120px !important;
}
.notSuperadmin .el-upload-list__item-delete{
  display: none !important;
}
</style>
