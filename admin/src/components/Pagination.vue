<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 30, 50, 100]"
    :page-size="pagesize"
    layout="total,  prev, pager, next, sizes"
    :total="total"
  ></el-pagination>
</template>
<script>
export default {
  name: 'pagination',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    total: {
      type: [String, Number],
      default: 60
    },
    queryList: {
      type: Function
    }
  },
  data() {
    return {
      currentPage: 1,
      pagesize: 10
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1
      this.pagesize = val
      console.log(`每页 ${val} 条`)
      this.queryList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryList()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
