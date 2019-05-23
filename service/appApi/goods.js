const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
const fs = require('fs')
router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('./newGoods.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value, index) =>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('成功' + saveCount)
            }).catch(error => {
                console.log(error)
            })
        })
    })
    ctx.body = "开始导入数据"
})

// 建立商品大类数据并导入数据库
router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('成功' + saveCount)
            })
            .catch( error => {
                console.log(error)
            })
        })
    })

    ctx.body = '开始导入数据。。。。。。'
})


// 建立商品子类数据并导入数据库
router.get('/insertAllCategorySub', async (ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('成功' + saveCount)
            })
            .catch(error => {
                console.log(error)
            })

        })
    })

    ctx.body = '开始导入数据。。。。。。'
})

// 获取商品详情信息接口
router.post('/getDetailGoodsInfo', async (ctx) => {
    try{
        //console.log(ctx.request.body) //{ goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7' }
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        console.log(goodsId)
        let result = await Goods.findOne({ID: goodsId}).exec()
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
})


// 获取商品大类信息
router.get('/getCategoryList', async (ctx) => {
    try {
        let Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
})

// 根据大类获取小类信息

router.post('/getCategorySubList', async (ctx) => {
    try {
        // 获取大类Id
        let categoryId = ctx.request.body.categoryId
        // console.log('categoryId:' + categoryId)
        // let categoryId = 1
        let CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
        ctx.body = {code: 200, message: result}
    } catch (err) {
        ctx.body = {code: 500, message: err}
    }

})


// 根据商品二级类别获取小类商品列表
router.post('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        // 获取商品二级类别Id
        let categorySubId = ctx.request.body.categorySubId
        //当前页数
        let page = ctx.request.body.page
        //每页显示的数量
        let num = 10
        let start = (page - 1) * num
        // let categorySubId = ctx.request.body.categorySubId
        //let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
        let Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID: categorySubId})
        .skip(start).limit(num).exec()
        ctx.body = {code: 200, message: result}
    } catch (err) {
        ctx.body = {code: 500, message: err}
    }
})

module.exports = router
