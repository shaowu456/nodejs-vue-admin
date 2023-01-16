/**
 * @param {String} 日期 年月日 1995-01-01
 * @description 商品相关特殊路由加载
 */
 exports.init = (app,authMiddleware) => {
  // 查询上级分类为眼镜相关商品 的 子分类
  app.get('/admin/api/findGoodsByClassLikeGlasses/', authMiddleware(), async (req, res) => {
    // const parentId = req.body
    const Model = require(`../../models/Category`)
    const queryOptions = {}
    // const temp = req.body
    if (Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    console.log('params', req.params)
    const items = await Model.find({ parent: '6383793145a8074c1216aa13' }).setOptions(queryOptions)  // 关联查询parent
    res.send(items)
  })
  //  查询某一分类的全部商品
  app.get('/admin/api/findGoodsByClass/:id', authMiddleware(), async (req, res) => {
    const Model = require(`../../models/Good`)
    const queryOptions = {}
    queryOptions.populate = 'class'
    console.log('params', req.params)
    const classParam = req.params.id ==='all' ? {} : {class: req.params.id}
    const items = await Model.find(classParam).setOptions(queryOptions)  // 关联查询parent
    res.send(items)
  })
  //  通过助记码查询商品
  app.get('/admin/api/findGoodsByNamecode/:id', authMiddleware(), async (req, res) => {
    const Model = require(`../../models/Good`)
    const queryOptions = {}
    queryOptions.populate = 'class'
    console.log('params', req.params)
    // $options:"$i" 不区分大小写
    const classParam = {nameCode: {$regex: req.params.id, $options:"$i"}}
    const items = await Model.find(classParam).setOptions(queryOptions)  // 关联查询parent
    res.send(items)
  })
  
  //  查询出库列表
  app.post('/admin/api/findOutputs/', authMiddleware(), async (req, res) => {
    const { startTime, endTime, source } = req.body
    const Model = require(`../../models/Output`)
    const queryOptions = {}
    queryOptions.populate = 'refGood'
    console.log('start, end', startTime, endTime)
    // const classParam = { $and: [{ createdAt: { $gt: startTime } }, { createdAt: { $lt: endTime } }] }
    let timeParam = [{ time: { $gt: startTime } }, { time: { $lt: endTime } }]
    const classParam = source === '全部' ? { $and: timeParam } : { $and: timeParam.concat({ source }) }
    // const classParam = { $and: [{ time: { $gt: startTime } }, { time: { $lt: endTime } }] }
    const items = await Model.find(classParam).setOptions(queryOptions)  // 关联查询parent
    res.send(items)
  })
  //  出库操作
  app.post('/admin/api/output/', authMiddleware(), async (req, res) => {
    const Model = require(`../../models/Output`)
    let { leftCount, num } = req.body
    req.body.leftCount = leftCount-num
    const createResult = await Model.create(req.body)
    console.log('~~~~~~~~~~~~~~~~~~~~')
    console.log(req.body)
    const goodsModel = require(`../../models/Good`)
    const updateResult = await goodsModel.findByIdAndUpdate(req.body.refGood, { count: leftCount-num })
    res.send({createResult,updateResult})
  })
  
 }