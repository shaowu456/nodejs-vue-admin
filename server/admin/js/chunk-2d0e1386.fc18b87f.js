(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e1386"],{"7a06":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"about"},[s("h1",[e._v(e._s(e.id?"编辑":"新建")+"管理员")]),s("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save(t)}}},[s("el-form-item",{attrs:{label:"账号"}},[s("el-input",{model:{value:e.model.username,callback:function(t){e.$set(e.model,"username",t)},expression:"model.username"}})],1),s("el-form-item",{attrs:{label:"密码"}},[s("el-input",{attrs:{type:"password"},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password",t)},expression:"model.password"}})],1),s("el-form-item",{attrs:{label:"用户名称"}},[s("el-input",{model:{value:e.model.address,callback:function(t){e.$set(e.model,"address",t)},expression:"model.address"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("保存")])],1)],1)],1)},r=[],a=(s("96cf"),s("89ba")),i={props:{id:{}},data:function(){return{model:{}}},methods:{save:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.id){e.next=6;break}return e.next=3,this.$http.put("rest/admin_users/".concat(this.id),this.model);case 3:e.sent,e.next=9;break;case 6:return e.next=8,this.$http.post("rest/admin_users",this.model);case 8:e.sent;case 9:this.$router.push("/admin_users/list"),this.$message({type:"success",message:"保存成功"});case 11:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),fetch:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$http.get("rest/admin_users/".concat(this.id));case 2:t=e.sent,this.model=t.data;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},created:function(){this.id&&this.fetch()}},o=i,u=s("2877"),l=Object(u["a"])(o,n,r,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0e1386.fc18b87f.js.map