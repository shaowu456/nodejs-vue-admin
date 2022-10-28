### 需求
1. 前后端分离
2. 登录以及权限验证
3. 列表以及详情的增删改查
4. 上传文件的处理
### 环境与依赖

1. nodejs express mongoose 服务端
2. vue cli 3 前端
3. MongoDB 数据库
### 实践流程
#### 准备

1. 安装 vue-cli nodejs express mongoose
2. 下载并安装MongoDB
#### 项目初始化

1. 前端 vue cli 环境 `vue create admin` `vue add element` `vue add router`
2. 服务端 `mkdir server` `npm init -y` `npm i express@next mongoose cors` `npm i -g nodemon`
- 入口文件index.js，使用express启用服务器、处理cors跨域、处理req.json、注册并连接数据库，注册服务端路由
- script 启动项改用 `"serve": "nodemon index.js",` 用于服务端 热更新
####  增删改查 列表页

1. 分类列表页，新增分类，删除分类，编辑分类
2. 创建 分类 实例（跨域理解为分类表） mdb 实例 model 
```javascript
// 建立 目录 模型
const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({  
  name: { type: String },
  // mongoose.SchemaTypes.ObjectId 表示他是数据库里的ObjectId，特指mdb的；  ref 表示其关联的模型，方便回溯查找
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

//模型导出
module.exports = mongoose.model('Category', schema)
```

3. 关于 分类 的服务端路由
```javascript
module.exports = app => {
  const express = require('express')
  const router = express.Router()

  // 新增分类
  const Category = require('../../models/Category')
  router.post('/categories', async(req, res)=>{
    // req.body 要想使用的话，要加上中间件 express.json()
    const model = await Category.create(req.body)
    console.log('~~~~~~~~~~~~~~~~~~~~')
    console.log(req.body)
    res.send(model)
  })
  // 修改分类
  router.put('/categories/:id', async(req, res)=>{
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除分类
  router.delete('/categories/:id', async(req, res)=>{
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
   // 获取分类列表
  router.get('/categories', async(req, res)=>{
    // 这里加上.populate('parent') 就能关联查出其parentId的category
    const items = await Category.find().populate('parent').limit(10)
    res.send(items)
  })
  // 获取某个分类的详情
  router.get('/categories/:id', async(req, res)=>{
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
  // express 使用并处理这些router
  app.use('/admin/api', router)
}
```

4. 联表操作 无限级分类
#### 封装资源路由
使用中间件封装资源路由，使其具有高度复用性

1. 前端与服务端约定好 路由path 的名字
2. 服务端根据参数去拿对应的 mdb model 再执行 增删改查

`server\middleware\resource.js`

#### 静态资源上传

1. 服务端使用 `multer`解析 前端的 Form Data > file(binary)
2. 使用 `multer`将上传的资源存放在 静态目录
3. 接口返回 静态文件的url 给前端
4. 前端拿着 静态文件的url 做展示
5. bin
#### 登录校验

1. 管理员账号管理(bcrypt)
2. 登录接口(jwt, jsonwebtoken)
```
// 服务端
1.根据用户名找用户
2.校验密码
3.返回token

// 前端
4.请求拦截器 请求头都要加上token
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
  config.headers.Authorization = 'Bearer ' + localStorage.token
......

5.服务端获取并验证token
async(req, res, next) => {
  // 提取 Bearer 后面的
  const token = String(req.headers.authorization || '').split(' ').pop()
  assert(token, 401, '请提供token')
  const { id } = jwt.verify(token, app.get('secret'))
  assert(id, 401, '无效的token')
  req.user = await AdminUser.findById(id)
  assert(req.user, 401, '请先登录')
  await next()
}
6.前端响应拦截器处理错误信息执行报错，跳转到登录页...
```

3. 服务端封装登录的中间件（因为需要给几乎每一个接口都加入这个校验）
4. 客户端路由限制 (beforeEach, meta)
- 路由字典加入meta
- 路由前置守卫做判断
5. 上传文件的登录校验（el-upload, headers）
- 因为el-upload 是自己封装的 ajax 不在我们封装的axios里, 所以默认没带我们加上的token
- el-upload组件 有个header属性可以给它单独赋值，这里我们mixin下获取token的方法

学习笔记随记，node-vue-admin
_1 分类路由，没封装
_2 权限校验，没封装为中间件
1.cd server 
2.npm init -y 初始化服务端项目
3.npm i express@next mongoose cors  一次性装这三个包
4.npm i -g nodemon 用于服务端服务器热更新
5.scripts命令修改 加入`"serve": "nodemon index.js",`
6.npm i inflection 该包可将小写复数英文改成大写英文单数 categories => Category
7.npm i http-assert 后台比较流行的 中断程序抛出错误，错误码，错误信息
```
npm i http-assert 后台比较流行的 中断程序抛出错误，错误码，错误信息
assert(user, 422, '用户不存在')
+
// 错误处理函数
app.use(async (err,req,res,next)=>{
  res.status(err.statusCode).send({
    message: err.message
  })
})
代替
if(!user) {
  return res.status(422).send({
    message: '用户不存在'
  })
}
```
### 演示部分
```javascript
parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
以及
populate('parent') 加了之后 会关联查询其相应的所有信息， 不加只会查出这个ID
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/705758/1666164378520-ab830c49-e38a-4d14-ac04-2768164dec0d.png#clientId=u48751f64-b0bc-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=333&id=ub5971c7d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=333&originWidth=1220&originalType=binary&ratio=1&rotation=0&showTitle=false&size=146853&status=error&style=none&taskId=ubf43b590-9e1e-4dfd-82ee-ca386e10328&title=&width=1220)

