const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


const bcrypt = require('bcrypt')
// const SALT_WORK_FACTOR = 10
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
    UserId: {type: ObjectId},
    userName: {unique: true, type: String},
    password: {type: String},
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
})


// 每次存储数据时都要执行加密处理
userSchema.pre('save', function (next) {
    // let user = this
    // console.log(this)
    // console.log(bcrypt)

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        // console.log(123123)
        if(err) return next(err)
        // console.log(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})


userSchema.methods = {
    // 密码对比方法
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if(!err) resolve(isMatch)
                else reject("密码输入错误："+ err)
                console.log("密码输入错误1："+ err)
            })
        })
    }
}

// 发布模型
mongoose.model('User', userSchema)
