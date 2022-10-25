<template>
  <div class="about">
    <h1 style="margin:0">{{id ? '编辑' : '新建'}}客户</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-tabs value="skills"
               type="border-card">
        <el-tab-pane name="bases"
                     label="基础信息">
          <el-form-item label="姓名">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="model.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="model.sex">
              <el-option v-for="item of categories"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker v-model="model.birthday"
                            value-format="yyyy-MM-dd"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions1"></el-date-picker>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input :disabled="true"
                      v-model="model.age"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="model.address"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="skills"
                     label="详情">
          <el-button size="small"
                     @click="model.skills.push({createDate:(new Date)})">
            <i class="el-icon-plus"></i> 添加
          </el-button>
          <el-row type="flex"
                  style="flex-wrap: wrap">
            <el-col :md="12"
                    v-for="(item, i) in model.skills"
                    :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="创建日期">
                <el-date-picker v-model="item.createDate"
                                value-format="yyyy-MM-dd"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1"></el-date-picker>
              </el-form-item>
              <el-form-item label="图标">
                <Up-Loadimgs :PfileList.sync="item.iconLists" :fakePfileList.sync="item.fakeIconLists"></Up-Loadimgs>
              </el-form-item>
              <div class="free_ipt_box">
                <span class="free_title">电脑验光</span>
                <ul>
                  <li></li>
                  <li>球镜</li>
                  <li>柱镜</li>
                  <li>轴向</li>
                  <!-- <li>瞳距</li> -->
                </ul>
                <ul>
                  <li>OD</li>
                  <li><el-input v-model="item.pcODqj"></el-input></li>
                  <li><el-input v-model="item.pcODzj"></el-input></li>
                  <li><el-input v-model="item.pcODzx"></el-input></li>
                  <!-- <li><el-input v-model="item.pcODtj"></el-input></li> -->
                </ul>
                <ul>
                  <li>OS</li>
                  <li><el-input v-model="item.pcOSqj"></el-input></li>
                  <li><el-input v-model="item.pcOSzj"></el-input></li>
                  <li><el-input v-model="item.pcOSzx"></el-input></li>
                </ul>
              </div>
              <div class="free_ipt_box">
                <span class="free_title">主观验光</span>
                <ul>
                  <li></li>
                  <li>球镜</li>
                  <li>柱镜</li>
                  <li>轴向</li>
                  <li>瞳距</li>
                  <li>ADD</li>
                </ul>
                <ul>
                  <li>OD</li>
                  <li><el-input v-model="item.obODqj"></el-input></li>
                  <li><el-input v-model="item.obODzj"></el-input></li>
                  <li><el-input v-model="item.obODzx"></el-input></li>
                  <li><el-input v-model="item.obODtj"></el-input></li>
                  <li><el-input v-model="item.obODadd"></el-input></li>
                </ul>
                <ul>
                  <li>OS</li>
                  <li><el-input v-model="item.obOSqj"></el-input></li>
                  <li><el-input v-model="item.obOSzj"></el-input></li>
                  <li><el-input v-model="item.obOSzx"></el-input></li>
                  <li><el-input v-model="item.obOStj"></el-input></li>
                </ul>
                <ul>
                  <li>主导眼</li>
                  <li><el-input v-model="item.obZDYqj"></el-input></li>
                  <li>双眼平衡</li>
                  <li><el-input v-model="item.obZDYzx"></el-input></li>
                  <li>瞳距</li>
                  <li><el-input v-model="item.obZDYadd"></el-input></li>
                </ul>
              </div>
              <el-form-item label="描述">
                <el-input v-model="item.description"
                          type="textarea"></el-input>
              </el-form-item>
              <el-form-item v-if="$store.state.user.isSuperadmin">
                <el-button size="small"
                           type="danger"
                           @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="history"
                     label="历史信息">
          <el-table border
                    stripe
                    :data="historyData">
            <!-- <el-table-column prop="_id" label="ID" width="240"></el-table-column> -->
            <el-table-column prop="project_name"
                             label="项目名称"></el-table-column>
            <el-table-column prop="r_eye"
                             label="右眼（R）">
              <template slot-scope="scope">
                <el-input v-if="scope.$index ===0"
                          v-model="model.histoyNakedR"
                          placeholder></el-input>
                <el-select v-if="scope.$index === 1"
                           v-model="model.wearGtypeR">
                  <el-option v-for="item in wearGtypes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-input v-if="scope.$index ===2"
                          v-model="model.visionR"
                          placeholder></el-input>
                <el-input v-if="scope.$index ===3"
                          v-model="model.correctVisionR"
                          placeholder></el-input>
                <el-input v-if="scope.$index ===4"
                          v-model="model.eyePressR"
                          placeholder></el-input>
                <el-select v-if="scope.$index === 5"
                           v-model="model.eyePositionR">
                  <el-option v-for="item in eyePositions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-select v-if="scope.$index === 6"
                           v-model="model.threedEyeR">
                  <el-option v-for="item in threedEyes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-select v-if="scope.$index === 7"
                           v-model="model.colorFeelR">
                  <el-option v-for="item in colorFeels"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-select v-if="scope.$index === 8"
                           v-model="model.eyeCheckR">
                  <el-option v-for="item in eyeChecks"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="l_eye"
                             label="左眼（L）"><template slot-scope="scope">
              <el-input v-if="scope.$index ===0"
                                        v-model="model.histoyNakedL"
                                        placeholder></el-input>
                <el-select v-if="scope.$index === 1"
                           v-model="model.wearGtypeL">
                  <el-option v-for="item in wearGtypes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-input v-if="scope.$index ===2"
                          v-model="model.visionL"
                          placeholder></el-input>
                <el-input v-if="scope.$index ===3"
                          v-model="model.correctVisionL"
                          placeholder></el-input>
                <el-input v-if="scope.$index ===4"
                          v-model="model.eyePressL"
                          placeholder></el-input>
                <el-select v-if="scope.$index === 5"
                           v-model="model.eyePositionL">
                  <el-option v-for="item in eyePositions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-select v-if="scope.$index === 6"
                           v-model="model.threedEyeL">
                  <el-option v-for="item in threedEyes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-select v-if="scope.$index === 7"
                           v-model="model.colorFeelL">
                  <el-option v-for="item in colorFeels"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-select v-if="scope.$index === 8"
                           v-model="model.eyeCheckL">
                  <el-option v-for="item in eyeChecks"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary"
                   style="margin-top:2rem"
                   native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { jsGetAgeByBirth } from '@/lib/utils'
import UpLoadimgs from '@/components/UploadImgs.vue'
export default {
  props: {
    id: {}
  },
  components:{
    UpLoadimgs
  },
  data () {
    return {
      wearGtypeR: '',
      wearGtypeL: '',
      wearGtypes: [
        {
          label: "未佩戴",
          value: "未佩戴",
        },
        {
          label: "框架眼镜",
          value: "框架眼镜",
        },
        {
          label: "隐形眼镜",
          value: "隐形眼镜",
        },
        {
          label: "夜戴角膜塑性镜",
          value: "夜戴角膜塑性镜",
        },
        {
          label: "未知",
          value: "未知",
        },
      ],
      eyePositionR: '',
      eyePositionL: '',
      eyePositions: [
        {
          label: "正常",
          value: "正常"
        },
        {
          label: "内斜视",
          value: "内斜视"
        },
        {
          label: "外斜视",
          value: "外斜视"
        },
        {
          label: "上下斜视",
          value: "上下斜视"
        }
      ],
      threedEyeR: '',
      threedEyeL: '',
      threedEyes: [
        {
          label: "无",
          value: "无"
        },
        {
          label: "有",
          value: "有"
        }
      ],
      colorFeelR: '',
      colorFeelL: '',
      colorFeels: [
        {
          label: "正常",
          value: "正常"
        },
        {
          label: "异常",
          value: "异常"
        }
      ],
      eyeCheckR: '',
      eyeCheckL: '',
      eyeChecks: [
        {
          label: "正常",
          value: "正常"
        },
        {
          label: "内翻",
          value: "内翻"
        },
        {
          label: "倒睫",
          value: "倒睫"
        }
      ],
      categories: [
        {
          label: "男",
          value: "男"
        },
        {
          label: "女",
          value: "女"
        }
      ],
      historyData: [
        {
          project_name: '裸眼视力',
          r_eye: '',
          l_eye: ''
        }, {
          project_name: '是否戴镜',
          r_eye: '',
          l_eye: ''
        }, {
          project_name: '戴镜视力',
          r_eye: '',
          l_eye: ''
        }, {
          project_name: '矫正视力',
          r_eye: '',
          l_eye: ''
        }, {
          project_name: '眼压',
          r_eye: '',
          l_eye: ''
        }, {
          project_name: '眼位',
          r_eye: '',
          l_eye: ''
        }, {
          project_name: '立体视',
          r_eye: '',
          l_eye: ''
        }, {
          project_name: '色觉',
          r_eye: '',
          l_eye: ''
        }, {
          project_name: '眼睑',
          r_eye: '',
          l_eye: ''
        }
      ],
      items: [],
      model: {
        name: "",
        avatar: "",
        skills: []
      },
      createDate: '',
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick (picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  watch: {
    'model.birthday' (val) {
      this.model.age = jsGetAgeByBirth(val)
    }
  },
  methods: {
    async save () {
      // eslint-disable-next-line no-unused-vars
      let res;
      let params = Object.assign({}, this.model)
      !params.name&&(params.name = '')
      !params.phone&&(params.phone = '')
      if (this.id) {
        params.skills.forEach(item => {
          item.fakeIconLists&&(item.iconLists = item.fakeIconLists)
        });
        // params.iconLists = params.fakeIconLists
        res = await this.$http.put(`rest/customers/${this.id}`, params);
      } else {
        res = await this.$http.post("rest/customers", params);
      }
      this.$router.push("/customers/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch () {
      const res = await this.$http.get(`rest/customers/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    afterUpload (res) {
      // console.log(res)
      // this.model.avater = res.url
      this.$set(this.model, "avatar", res.url); //显示赋值
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async fetchItems () {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created () {
    window.vue = this
    this.fetchItems();
    this.id && this.fetch();
  }
};
</script>
<style>
ul li{
  list-style: none;
}
.free_ipt_box li{display: inline-block;width: 70px;margin-right: 10px}
.free_ipt_box ul li:first-of-type{width: 50px;color: red;text-align: right}
.free_ipt_box .free_title{margin-left: 30px}
.about .el-select{
  width: 100% !important
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 278px;
  line-height: 278px;
  text-align: center;
}
.avatar {
  width: 278px;
  height: 278px;
  display: block;
}
</style>