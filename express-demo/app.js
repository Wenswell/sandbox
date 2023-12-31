// 中文官网 https://www.expressjs.com.cn/
// 调试工具 https://apifox.com/

// 每次更改后都要重启服务器

// 引入express
const express = require('express')
// 创建一个 express 的实例 app
const app = express()
// 指定端口
const port = 5345

// 引入 path 处理路径
const path = require('path')
// console.log("__dirname ",__dirname)
// console.log("__filename",__filename)

// 引入 multer 用于上传文件
const multer = require('multer') 

// 定义接收上传文件的目录
const upload = multer({
  dest: "./public/upload/temp",
})

//所有接口都允许上传
app.use(upload.any())

// 解析 POST 请求传来的 body 中的 JSON
app.use(express.json())

// 当客户端访问匹配的路径时,Express 直接返回对应的静态文件,不需要额外的路由处理
// 根路径默认导向 './public/index.html'
app.use(express.static(path.join(__dirname, 'public')));

// 默认导向router，不在app.js中写请求处理
// app.use('/db',require('./router/DbRouter'))
app.use(require('./router'))

// 全局中间件
// 固定代码：开放跨域请求
app.use(function (req, res, next) {
  // 允许来自所有域名的请求
  res.header("Access-Control-Allow-Origin", "*");
  // 允许请求带有Content-Type头
  res.header("Access-Control-Allow-Headers", "content-type");
  // 允许的HTTP方法
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  // 如果是预检请求(OPTIONS),则直接返回状态200
  if (req.method == "OPTIONS") res.sendStatus(200);
  // 不是预检请求,则继续向下执行其他路由或中间件函数
  else next();
})

// 所有请求
// 中间件执行后传递至此处处理（与中间件效果类似）
// router.all('*', function (req, res, next) {
//   console.log('all * 捕获')
//   next()
// })

// 监听端口
app.listen(port, () => {
  // 启动成功时执行
  console.log(`服务启动成功: http://localhost:${port}/`)
})
