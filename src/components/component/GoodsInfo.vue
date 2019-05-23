<template>
    <div id="goodsInfo" @click="goGoodsPage">
        <div class="goods-image">
            <img v-lazy="goodsImage" alt="" width="90%">
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter}}</div>
    </div>
</template>

<script>
// 引入Fileter toMoney方法
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods: {
            goGoodsPage() {
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
            }
        },
    }
</script>

<style scoped>
   .goods-name{
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
</style>