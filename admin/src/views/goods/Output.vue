<template>
  <div>
    <el-form label-position="right" inline style="margin-bottom:16px">
      <el-row>
        <el-button size="medium" class="goodsbtnbox" @click="openDialog" type="primary">出库</el-button>
        <el-button style="margin-right:16px" size="medium" class="goodsbtnbox" @click="initTable">刷新</el-button>
        <template v-if="isSuperAdmin">
          <span style="color:#606266;font-size: 13px;">来源：</span>
          <el-select style="margin-right:16px;" v-model="source" placeholder="请选择" @change="sourceChange">
            <el-option
              v-for="item in sources"
              :key="item.username"
              :label="item.address"
              :value="item.address">
            </el-option>
          </el-select>
        </template>
        <span style="color:#606266;font-size: 13px;">时间：</span>
        <el-select style="margin-right:16px;" v-model="time" placeholder="请选择" @change="timeChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span style="color:#606266;font-size: 13px;">{{startTime}} 至 {{endTime}}</span>
        <div class="sum-label">
          <span style="margin-right:16px">数量：{{sum.num}}</span>
          <span>金额：{{sum.price}}</span>
        </div>
      </el-row>
    </el-form>
    <el-table border stripe :data="items" :default-sort="{prop: 'time', order: 'descending'}">
      <!-- <el-table-column prop="_id" label="ID" width="240"></el-table-column> -->
      <el-table-column min-width="20" label="序号">
        <template slot-scope="scop">
          {{scop.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="name" sortable label="商品名称" min-width="50"></el-table-column>
      <!-- <el-table-column prop="phone" label="单价" min-width="60"></el-table-column> -->
      <el-table-column prop="num" sortable label="数量" min-width="30"></el-table-column>
      <el-table-column prop="price" sortable label="合计金额" min-width="50"></el-table-column>
      <el-table-column prop="time" sortable label="出库时间" min-width="100">
        <template slot-scope="scop">
          {{formatTime(scop.row.time)}}
        </template>
      </el-table-column>
      <el-table-column prop="leftCount" sortable label="剩余库存" min-width="50"></el-table-column>
      <el-table-column prop="source" sortable label="来源" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="_id" label="单号" min-width="120" show-overflow-tooltip></el-table-column>
    </el-table>
    <output-dialog ref="output-dialog" @outputSuccess="initTable"></output-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OutputDialog from "./OutputDialog";
import { getDateRange } from '@/lib/utils'
import dayjs from 'dayjs'
var list = getDateRange((new Date),0,true)
console.log("获取今天日期范围：开始日期:"+list[0]+";结束日期:"+list[1],list);

const timeEnum ={
  'today': [new Date(dayjs().format('YYYY-MM-DD') + ' 00:00:00').getTime(), new Date(dayjs().format('YYYY-MM-DD') + ' 23:59:59').getTime()],
  'last3day': [new Date().getTime() - 3600 * 1000 * 24 * 3, new Date().getTime()],
  'lastWeek': [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date().getTime()],
  'last30day': [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date().getTime()],
}

export default {
  components: {
    OutputDialog
  },
  data() {
    return {
      datatotal: 0,
      items: [],
      time: 'today',
      options: [
        {
          label: '今天',
          value: 'today'
        },
        {
          label: '最近3天',
          value: 'last3day'
        },
        {
          label: '最近7天',
          value: 'lastWeek'
        },
        {
          label: '最近30天',
          value: 'last30day'
        }
        // {
        //   label: '全部',
        //   value: 'all'
        // }
      ],
      source: '全部',
      sources: [{username:'hsw', address:'xxxx'}],
      startTime: '',
      endTime: '',
      sum: {
        num: 0,
        price: 0
      }
    };
  },
  computed: {
    ...mapGetters(['logininfo'])
  },
  methods: {
    timeChange(val) {
      this.fetch(timeEnum[val]);
    },
    sourceChange() {
      this.fetch(timeEnum[this.time]);
    },
    initTable() {
      this.time = 'today';
      this.fetch(timeEnum['today']);
    },
    openDialog() {
      this.$refs['output-dialog'].open();
    },
    async fetch([startTime, endTime]) {
      this.startTime = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss');
      this.endTime = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
      const res = await this.$http.post(`findOutputs`, {
        source: this.source,
        startTime,
        endTime,
      });
      this.items = res.data;
      this.sum.num = this.items.reduce((pre,cur)=>{
        return Number(cur.num) + pre
      },0)
      this.sum.price = this.items.reduce((pre,cur)=>{
        return Number(cur.price) + pre
      },0)
    },
    formatTime(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss'); 
    }
  },
  async mounted () {
    this.initTable()
    this.source = this.logininfo._doc.address === '超级管理员'? '光明眼镜': this.logininfo._doc.address;
    this.sources = [{username:'all', address:'全部'}].concat((await this.$http.get("rest/admin_users")).data);
    this.sources = this.sources.filter(item=> !['admin', 'superadmin'].includes(item.username))
    // this.items = res.data;
  },
};
</script>
<style lang="scss">
.sum-label {
  float: right;
  color:#606266;
  font-size: 14px;
  line-height: 40px;
}
</style>

