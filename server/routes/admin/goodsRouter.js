/**
 * @param {String} 日期 年月日 1995-01-01
 * @description 商品相关特殊路由加载
 */
 exports.init = (app,authMiddleware) => {
  // 查询上级分类为眼镜相关商品
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
 }