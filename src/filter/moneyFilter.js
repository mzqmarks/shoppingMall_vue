export function toMoney(money = 0) {
    // 正常思路代码
    // let newMoney = money;
    // if(newMoney) {
    //     newMoney = newMoney.toFixed(2)
    // } else {
    //     newMoney = 0;
    //     newMoney = newMoney.toFixed(2)
    // }
    // return newMoney
    // 优化后代码
    return money.toFixed(2)
}