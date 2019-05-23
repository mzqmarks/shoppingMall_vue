const Koa = require('koa')
const app = new Koa()

// 引入connect
const mongoose = require('mongoose')
const {connect, initSchemas} = require('./database/init.js')
const bodyParser = require('koa-bodyparser') //koa post 提交数据的中间件
const cors = require('koa2-cors') //处理跨域的中间件
const Router = require('koa-router')

app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
// 装载子路由
let router = new Router()

router.use('/user', user.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
    
    await connect() 
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({userName: '孙悟空7', password: '123456'})
    // oneUser.save().then(() => {
    //     console.log('插入成功')
    // })
    // let users = await User.findOne({}).exec()
    // console.log('------------------111111111')
    // console.log(users)
    // console.log('------------------2222222')
})()

app.use(async (ctx) => {
    ctx.body = '<h1>hello Koa2</h1>'
})
app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})
