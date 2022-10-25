module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const router = express.Router({
    // 表示合并url参数  不然的话 req.params.resource 是获取不到的
    mergeParams: true
  })
  // const Category = require('../../models/Category')

  // 新增分类
  router.post('/', async(req, res)=>{
    // req.body 要想使用的话，要加上中间件 express.json()
    const model = await req.Model.create(req.body)
    console.log('~~~~~~~~~~~~~~~~~~~~')
    console.log(req.body)
    res.send(model)
  })
  // 修改分类
  router.put('/:id', async(req, res)=>{
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', async(req, res)=>{
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
   // 资源列表
  router.get('/',async(req, res)=>{
    console.log(req.user)
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // req.body 要想使用的话，要加上中间件 express.json()
    // const items = await Category.find().populate('parent').limit(10)
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 获取某个分类的详情
  router.get('/:id', async(req, res)=>{
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  // 资源中间件
  const resourceMiddleware = require('../../middleware/resource')
  // 中间件解析~貌似，回头看下 todo
  // app.use('/admin/api', router)
  // rest随便取的名字，代表resetful接口，resource动态路由，合并到router里
  // app.use('/admin/api/rest/:resource', router)
  // 加一个中间件 处理函数 一般，形参最后一位使用next 就是中间件
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  const multer = require('multer')
  // dest 目标地址去哪里  __dirname 当前文件夹地址
  const upload = multer({dest: __dirname + '/../../uploads'})
  // 不属于router，不是资源
  // 需要定义一个静态文件托管，任何人都可以访问
  // file 为req的上传的字段名
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res)=>{
    // express 虽然能接收到这个请求，但是本身获取不到上传文件的数据，需要一个中间件，multer 这个中间件会 把文件数据 赋值给 req.file
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password} = req.body
    // 1.根据用户名找用户
    const AdminUser = require('../../models/AdminUser')
    // const user = await AdminUser.findOne({ username })
    // 由于模型里设置是默认不取 password 的 这里需要用 select 将其额外带出来
    const user = await AdminUser.findOne({ username }).select('+password')
    // 使用http-assert 这个包代替下面逻辑
    // if(!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    assert(user, 422, '用户不存在')
    // 2.校验密码
    // 比较明文 与 密文是否匹配
    const isValid = require('bcrypt').compareSync(password, user.password)
    // if(!isValid){
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const jwt = require('jsonwebtoken')
    // 该方法可以生成一个token，一般用户要可以从token里拿到用户信息，这里将用户信息散列后 发过去
    // 第一个参数是要加密进去的信息，第二个参数是加密的规则 app.get如果只有一个参数就是获取　express配置，多个就是表示路由
    const token = jwt.sign({
      id: user.id,
      // username: user.username
    }, app.get('secret'))
    res.send({token})
  })

  // 错误处理函数
  app.use(async (err,req,res,next)=>{
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}