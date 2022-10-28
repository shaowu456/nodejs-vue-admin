module.exports = options => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop() // pop()取数组最后一项
        assert(token, 401, '请提供jwt token')
        // assert(token, 401, '请先登录1')
        const { id } = jwt.verify(token, req.app.get('secret')) //校验解码  req.app 等同于 express里的app
        assert(id, 401, '无效的jwt token')
        // assert(id, 401, '请先登录2')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录3')
        await next()
    }
}