const mongoose = require('mongoose')
const db = "mongodb://localhost/simle-db"

const glob = require('glob')
const {resolve} = require('path')

// mongoose.set('useCreateIndex', true)


exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
    // 连接数据库
    mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        // 增加数据库连接的事件监听
        mongoose.connection.on('disconnected', () => {
            console.log('***********数据库断开***********')
            if(maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
            } else {
                reject()
                throw new Error('***********数据库出现问题，程序无法搞定，请人为修理......***********')
            }
            
        })
        mongoose.connection.on('error', (err) => {

            console.log('***********数据库错误***********')
            if(maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
            } else {
                reject(err)
                throw new Error('***********数据库出现问题，程序无法搞定，请人为修理......***********')
            }
           
        })

        mongoose.connection.once('open', () => {
            console.log('数据库连接成功 MongoDB Connected successfully')
            resolve()
        })
    })

}