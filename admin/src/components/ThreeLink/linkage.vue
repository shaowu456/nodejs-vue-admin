<template>
  <div class="linkage">
    <el-select
      class="linkselect"
      v-model="sheng"
      @change="choseProvince"
      placeholder="请选择省">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      class="linkselect"
      v-model="shi"
      @change="choseCity"
      placeholder="请选择市">
      <el-option
        v-for="item in shi1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select
      class="linkselect"
      v-model="qu"
      @change="choseBlock"
      placeholder="请选择区">
      <el-option
        v-for="item in qu1"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
// import axios from 'axios'
import Map from './map.json'
export default {
  props: {
    psheng: {
      type: [String, Number],
      default: ''
    },
    pshi: {
      type: [String, Number],
      default: ''
    },
    pqu: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      province: '',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city: '',
      block: ''
    }
  },
  watch: {
    psheng(val) {
      this.sheng = '' + val
    },
    pshi(val) {
      this.shi = val
    },
    pqu(val) {
      this.qu = val
    },
    sheng(val) {
      this.$emit('update:psheng', val)
    },
    shi(val) {
      this.$emit('update:pshi', val)
    },
    qu(val) {
      this.$emit('update:pqu', val)
    }
  },
  methods: {
    // 加载china地点数据，三级
    getCityData: function() {
      var that = this
      // axios.get(this.mapJson).then(function(response) {
      //   if (response.status === 200) {
      var data = Map
      that.province = []
      that.city = []
      that.block = []
      // 省市区数据分类
      for (var item in data) {
        if (item.match(/0000$/)) { // 省
          that.province.push({id: item, value: data[item], children: []})
        } else if (item.match(/00$/)) { // 市
          that.city.push({id: item, value: data[item], children: []})
        } else { // 区
          that.block.push({id: item, value: data[item]})
        }
      }
      // 分类市级
      for (var index in that.province) {
        for (var index1 in that.city) {
          if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
            that.province[index].children.push(that.city[index1])
          }
        }
      }
      // 分类区级
      for (var item1 in that.city) {
        for (var item2 in that.block) {
          if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
            that.city[item1].children.push(that.block[item2])
          }
        }
      }
      //   } else {
      //     console.log(response.status)
      //   }
      // }).catch(function(error) { console.log(typeof +error) })
    },
    // 选省
    choseProvince: function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children
          this.shi = this.province[index2].children[0].value
          this.qu1 = this.province[index2].children[0].children
          this.qu = this.province[index2].children[0].children[0].value
          this.E = this.qu1[0].id
        }
      }
      this.outValue()
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children
          this.qu = this.city[index3].children[0].value
          this.E = this.qu1[0].id
          // console.log(this.E)
        }
      }
      this.outValue()
    },
    // 选区
    choseBlock: function(e) {
      this.E = e
      this.outValue()
      // console.log(this.E)
    },
    outValue: function() {
      let province
      this.province.some((item) => {
        if (item.id === this.sheng) {
          province = item.value
          return true
        }
      })
      let shiNO
      this.shi1.some((item) => {
        if (item.value === this.shi) {
          shiNO = item.id
          return true
        }
      })
      let quNO
      this.qu1.some((item) => {
        if (item.value === this.qu) {
          quNO = item.id
          return true
        }
      })
      return {
        sheng: province,
        shengNO: this.sheng,
        shi: this.shi,
        shiNO: shiNO,
        qu: this.qu,
        quNO: quNO
      }
    }
  },
  mounted() {
  },
  created: function() {
    window.three = this
    this.getCityData()
  }
}
</script>

<style scoped>
.linkselect{width:120px}
</style>
