const express = require('express')

const app = express()

// app.set表示在 该express 实例上添加个属性
app.set('secret', '333555abc')

// 处理跨域
app.use(require('cors')())
// 处理json 比如req.body
app.use(express.json())
//托管静态文件 admin 目录  可以通过admin路径来访问
app.use('/admin/', express.static(__dirname + '/admin'))
//托管静态文件 uploads目录下为静态文件夹，可以通过uploads路径来访问
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, ()=>{
  console.log("http://localhost:3000")
});