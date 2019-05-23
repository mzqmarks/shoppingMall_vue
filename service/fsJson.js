const fs = require('fs')
fs.readFile('./goods.json', 'utf8', function(err, data) {
    let newData = JSON.parse(data);
    let pushData = [];
    let i = 0;//计数用
    newData.RECORDS.map(function (value,index){
        if(value.IMAGE1 != null) {
            i++//计数用
            console.log(value.NAME)
            pushData.push(value)
        }
        
    })
    console.log(i)
    fs.writeFile('./newGoods.json', JSON.stringify(pushData), function(err){
        if(err) console.log('文件写入失败')
        else console.log('文件操作成功')
    })
})