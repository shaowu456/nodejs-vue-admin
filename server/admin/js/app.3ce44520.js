(function(e){function t(t){for(var r,o,u=t[0],s=t[1],c=t[2],l=0,d=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==i[u]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},i={app:0},a=[];function u(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-04f5ef44":"e360bf0d","chunk-0dfd2e99":"f7193d81","chunk-21862b35":"0af5b7d3","chunk-2d0ba0ff":"8190eae0","chunk-2d0c4fe8":"3b3bb66e","chunk-2d0e1386":"b7afed20","chunk-2d210a29":"f6470e33","chunk-2d21da53":"b421654d","chunk-2d22d5f7":"f7b6820f","chunk-73df69ae":"271155a3","chunk-bb0596c6":"0cb88563"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-04f5ef44":1,"chunk-0dfd2e99":1,"chunk-21862b35":1,"chunk-73df69ae":1,"chunk-bb0596c6":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-04f5ef44":"ebf259f5","chunk-0dfd2e99":"0daa29b6","chunk-21862b35":"9320ad64","chunk-2d0ba0ff":"31d6cfe0","chunk-2d0c4fe8":"31d6cfe0","chunk-2d0e1386":"31d6cfe0","chunk-2d210a29":"31d6cfe0","chunk-2d21da53":"31d6cfe0","chunk-2d22d5f7":"31d6cfe0","chunk-73df69ae":"d7d29bf5","chunk-bb0596c6":"9320ad64"}[e]+".css",i=s.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var c=a[u],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===r||l===i))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){c=d[u],l=c.getAttribute("data-href");if(l===r||l===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],f.parentNode.removeChild(f),n(a)},f.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=i[e]=[t,n]}));t.push(r[2]=a);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=u(e);var d=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}i[e]=void 0}};var f=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/admin/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var f=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},"0f9a":function(e,t,n){"use strict";n.r(t);n("d3b7");var r=n("ba6a"),o=function(e){return r["a"].post("login",e)},i={name:"",avatar:"",introduction:"",roles:["admin"],logininfo:"33",userinfo:{},locationId:"",routerName:[],isSuperadmin:"",captchaCreate:""},a={firstLetter:function(e){return e.userName.substr(0,1)}},u={SET_LOGININFO:function(e,t){e.logininfo=t},SET_SUPERADMIN:function(e,t){e.isSuperadmin=t}},s={login:function(e,t){var n=e.commit;return new Promise((function(e,r){o(t).then((function(t){console.log("~~~login",t);var r=t.data;n("SET_LOGININFO",r);var o=r._doc.username;n("SET_SUPERADMIN",!("superadmin"!==o)),console.log(i),console.log(r),e(t)})).catch((function(e){r(e)}))}))},isSuperadmin:function(){}};t["default"]={namespaced:!1,getters:a,state:i,mutations:u,actions:s,modules:{}}},"22de":function(e,t,n){"use strict";var r=n("8319"),o=n.n(r);o.a},4712:function(e,t,n){"use strict";var r=n("e2fc"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("caad"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],a=(n("034f"),n("2877")),u={},s=Object(a["a"])(u,o,i,!1,null,null,null),c=s.exports,l=n("5c96"),d=n.n(l);n("0fae");r["default"].use(d.a);var f=n("a18c"),p=(n("13d5"),n("d3b7"),n("ac1f"),n("5319"),n("ddb0"),n("2f62")),m={roles:function(e){return e.user.roles},logininfo:function(e){return e.user.logininfo},partitionBywarehouse:function(e){return e.basedata.partitionBywarehouse}},h=m,b=function(e){localStorage.state&&e.replaceState(JSON.parse(localStorage.state)),e.subscribe((function(e,t){localStorage.state=JSON.stringify(t)}))};r["default"].use(p["a"]);var g=n("c653"),v=g.keys().reduce((function(e,t){var n=t.replace(/^\.\/(.*)\.\w+$/,"$1"),r=g(t);return e[n]=r.default,e}),{}),k=new p["a"].Store({modules:v,getters:h,plugins:[b]}),y=k,_=n("ba6a");r["default"].prototype.$http=_["a"],r["default"].config.productionTip=!1,r["default"].mixin({computed:{uploadUrl:function(){return this.$http.defaults.baseURL+"/upload"},isSuperAdmin:function(){return["admin","superadmin"].includes(this.$store.state.user.logininfo._doc.username)}},mounted:function(){},methods:{getAuthHeader:function(){return{Authorization:"Bearer ".concat(localStorage.token||"")}}}}),new r["default"]({router:f["a"],store:y,render:function(e){return e(c)}}).$mount("#app")},"80ae":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"my_upload"},[n("el-upload",{class:{notSuperadmin:!e.$store.state.user.isSuperadmin},attrs:{action:e.uploadUrl,headers:e.getAuthHeader(),"list-type":"picture-card","before-upload":e.beforeUploadPicture,"on-preview":e.handlePictureCardPreview,"on-progress":e.uploadProgress,"on-remove":e.handleRemove,"on-success":e.uploadSuccess,"on-error":e.uploadError,"file-list":e.fileList,"show-file-list":!0}},[n("i",{staticClass:"el-icon-plus"})]),n("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)},o=[],i=(n("d81d"),n("b0c0"),n("a9e3"),{name:"upload",props:{value:{type:[String,Number],default:""},total:{type:[String,Number],default:60},PfileList:{type:Array,default:function(){return[]}},fakePfileList:{type:Array,default:function(){return[]}}},data:function(){return{fileList:this.PfileList,fakeFileList:[],dialogImageUrl:"",dialogVisible:!1,uploadComplete:!0}},watch:{PfileList:function(e){this.fileList=e},fileList:function(e){this.$emit("update:PfileList",e)},fakePfileList:function(e){this.fakeFileList=e},fakeFileList:function(e){this.$emit("update:fakePfileList",e)}},methods:{handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},beforeUploadPicture:function(e){if(e.size>2097152)return this.$message.error("上传图片不能大于2M"),!1},uploadProgress:function(e,t,n){this.uploadComplete=!1},uploadSuccess:function(e,t,n){var r=this;this.fakeFileList=[],n.map((function(e){var t="";t=e.response?e.response.url:e.url,r.fakeFileList.push({name:e.name,url:t})})),this.uploadComplete=!0},uploadError:function(e,t,n){this.$message.error("上传出错")},handleRemove:function(e,t){var n=this;this.fakeFileList=[],t.map((function(e){var t="";t=e.response?e.response.url:e.url,n.fakeFileList.push({name:e.name,url:t})}))},handleRemove2:function(){return!1}}}),a=i,u=(n("4712"),n("2877")),s=Object(u["a"])(a,r,o,!1,null,null,null);t["a"]=s.exports},8319:function(e,t,n){},"85ec":function(e,t,n){},a18c:function(e,t,n){"use strict";n("d3b7");var r=n("2b0e"),o=n("8c4f"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticStyle:{height:"100vh"}},[n("el-aside",{staticStyle:{"background-color":"rgb(238, 241, 246)"},attrs:{width:"200px"}},[n("el-menu",{attrs:{router:"","default-openeds":["1","2"],"default-active":e.$route.path}},[n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-message"}),e._v("内容管理")]),e.isSuperAdmin?n("el-menu-item-group",[n("template",{slot:"title"},[e._v("分类")]),n("el-menu-item",{attrs:{index:"/categories/create"}},[e._v("新建分类")]),n("el-menu-item",{attrs:{index:"/categories/list"}},[e._v("分类列表")])],2):e._e(),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("客户")]),n("el-menu-item",{attrs:{index:"/customers/create"}},[e._v("新建客户")]),n("el-menu-item",{attrs:{index:"/customers/list"}},[e._v("客户列表")])],2),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("商品")]),n("el-menu-item",{attrs:{index:"/goods/create"}},[e._v("新建商品")]),n("el-menu-item",{attrs:{index:"/goods/list"}},[e._v("库存管理")]),n("el-menu-item",{attrs:{index:"/goods/output"}},[e._v("出库管理")])],2)],2),e.isSuperAdmin?n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-message"}),e._v("系统设置")]),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("管理员")]),n("el-menu-item",{attrs:{index:"/admin_users/create"}},[e._v("新建管理员")]),n("el-menu-item",{attrs:{index:"/admin_users/list"}},[e._v("管理员列表")])],2)],2):e._e()],1)],1),n("el-container",[n("el-header",{staticStyle:{"text-align":"right","font-size":"12px",height:"40px"}},[n("span",[e._v(e._s(e.username))]),n("el-dropdown",{staticStyle:{cursor:"pointer"},attrs:{trigger:"click"}},[n("i",{staticClass:"el-icon-arrow-down el-icon--right",staticStyle:{"margin-right":"15px"}}),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{nativeOn:{click:function(t){return t.preventDefault(),e.leave(t)}}},[e._v("退出")])],1)],1)],1),n("el-main",{staticClass:"container_box",attrs:{id:"container_box"}},[n("router-view",{key:e.$route.path})],1)],1)],1)},a=[],u=(n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("2fa7")),s=n("2f62");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach((function(t){Object(u["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d={data:function(){return{username:"",adminShow:!1}},computed:l({},Object(s["b"])(["logininfo"])),mounted:function(){console.log("~~~",this.logininfo),this.username=this.logininfo._doc.address,"superadmin"===this.logininfo._doc.username?this.adminShow=!0:this.adminShow=!1},methods:{leave:function(){localStorage.clear(),this.$router.push("/login")}}},f=d,p=(n("22de"),n("b4fe"),n("2877")),m=Object(p["a"])(f,i,a,!1,null,null,null),h=m.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("el-card",{staticClass:"login-card",attrs:{header:"请先登录"}},[n("el-form",{nativeOn:{submit:function(t){return t.preventDefault(),e.login(t)}}},[n("el-form-item",{attrs:{label:"用户名"}},[n("el-input",{model:{value:e.model.username,callback:function(t){e.$set(e.model,"username",t)},expression:"model.username"}})],1),n("el-form-item",{attrs:{label:"密码"}},[n("el-input",{attrs:{type:"password"},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password",t)},expression:"model.password"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("登录")])],1)],1)],1)],1)},g=[],v=(n("96cf"),n("89ba")),k={data:function(){return{model:{}}},methods:{login:function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("login",this.model);case 2:t=e.sent,localStorage.token=t.data.token,this.$router.push("/categories/list"),this.$message({type:"success",message:"登录成功"});case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}},y=k,_=(n("d6db"),Object(p["a"])(y,b,g,!1,null,null,null)),w=_.exports,S=n("80ae");r["default"].use(o["a"]);var O=[{path:"/login",name:"login",component:w,meta:{isPublic:!0}},{path:"/upload",name:"upload",component:S["a"],meta:{isPublic:!0}},{path:"/",name:"test",component:h,redirect:"/items/list",children:[{path:"/categories/create",component:function(){return n.e("chunk-2d210a29").then(n.bind(null,"b973"))}},{path:"/categories/edit/:id",component:function(){return n.e("chunk-2d210a29").then(n.bind(null,"b973"))},props:!0},{path:"/categories/list",component:function(){return n.e("chunk-2d0ba0ff").then(n.bind(null,"3639"))}},{path:"/items/create",component:function(){return n.e("chunk-21862b35").then(n.bind(null,"950f"))}},{path:"/items/edit/:id",component:function(){return n.e("chunk-21862b35").then(n.bind(null,"950f"))},props:!0},{path:"/items/list",component:function(){return n.e("chunk-2d22d5f7").then(n.bind(null,"f6e6"))}},{path:"/customers/create",component:function(){return n.e("chunk-04f5ef44").then(n.bind(null,"40f0"))}},{path:"/customers/edit/:id",component:function(){return n.e("chunk-04f5ef44").then(n.bind(null,"40f0"))},props:!0},{path:"/customers/list",component:function(){return n.e("chunk-2d0c4fe8").then(n.bind(null,"3cce"))}},{path:"/goods/list",component:function(){return n.e("chunk-0dfd2e99").then(n.bind(null,"384b"))}},{path:"/goods/create",component:function(){return n.e("chunk-bb0596c6").then(n.bind(null,"0811"))}},{path:"/goods/edit/:id",component:function(){return n.e("chunk-bb0596c6").then(n.bind(null,"0811"))},props:!0},{path:"/goods/output",component:function(){return n.e("chunk-73df69ae").then(n.bind(null,"4261"))}},{path:"/admin_users/create",component:function(){return n.e("chunk-2d0e1386").then(n.bind(null,"7a06"))}},{path:"/admin_users/edit/:id",component:function(){return n.e("chunk-2d0e1386").then(n.bind(null,"7a06"))},props:!0},{path:"/admin_users/list",component:function(){return n.e("chunk-2d21da53").then(n.bind(null,"d1d4"))}}]}],P=new o["a"]({routes:O});P.beforeEach((function(e,t,n){if(console.log("~~to,from~",e,t),!e.meta.isPublic&&!localStorage.token)return n("/login");n()}));t["a"]=P},b4fe:function(e,t,n){"use strict";var r=n("ba74"),o=n.n(r);o.a},ba6a:function(e,t,n){"use strict";n("d3b7");var r=n("bc3a"),o=n.n(r),i=n("2b0e"),a=n("a18c"),u=o.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"/admin/"}).VUE_APP_API_URL||"/admin/api"});u.interceptors.request.use((function(e){return localStorage.token&&(e.headers.Authorization="Bearer "+localStorage.token),e}),(function(e){return Promise.reject(e)})),u.interceptors.response.use((function(e){return e}),(function(e){return e.response.data.message&&(i["default"].prototype.$message({type:"error",message:e.response.data.message}),401===e.response.status&&a["a"].push("/login")),Promise.reject(e)})),t["a"]=u},ba74:function(e,t,n){},c653:function(e,t,n){var r={"./user.js":"0f9a"};function o(e){var t=i(e);return n(t)}function i(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id="c653"},d6db:function(e,t,n){"use strict";var r=n("e67a"),o=n.n(r);o.a},e2fc:function(e,t,n){},e67a:function(e,t,n){}});
//# sourceMappingURL=app.3ce44520.js.map