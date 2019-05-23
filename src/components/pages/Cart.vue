<template>
    <div id="cart">
        <div class="navbar-div">
            <van-nav-bar
                title="购物车"
                left-text="返回"
                left-arrow
                @click-left = "onClickLeft"
            ></van-nav-bar>
        </div>
        <div class="btn-box">
            <van-button size="small" type="danger" @click="clearCart">清空购物车</van-button>
        </div>
        <!-- 显示购物车中的商品 -->
        <div class="cart-list">
            <div class="row" v-for="(item,index) in cartInfo" :key="index">
                <div class="goodsImg">
                    <img :src="item.image" alt="" width="100%">
                </div>
                <div class="goods-text">
                    <div class="goods-name">{{item.NAME}}</div>
                    <div class="control">
                        <van-stepper v-model="item.count" />
                    </div>
                    
                </div>
                <div class="goods-price">
                    <div> ￥{{item.price | moneyFilter}}</div>
                    <div>x{{item.count}}</div>
                    <div class="allPrice">
                        ￥{{item.price * item.count | moneyFilter}}
                    </div>
                   
                </div>

                
            </div>

            <div class="totalMoney">
                商品总价：<span class="totalMoney_text"> ￥{{totalMoney | moneyFilter}} </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                // 购物车内商品信息
                cartInfo: [], 
                // 如果购物车是空的，isEmpty为false,否则为true
                isEmpty:false
            }
        },
        created() {
                this.getCartInfo()
            },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            
            // 得到购物车的商品
            getCartInfo() {
                if(localStorage.cartInfo) {
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                console.log('this.cartInfo:' + JSON.stringify(this.cartInfo))
                this.isEmpty = this.cartInfo.length > 0 ? true : false
            },

            // 清空购物车
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo = []
            }
        },
        filters: {
            moneyFilter(money){
                return toMoney(money)
            }
        },
        computed: {
            totalMoney(){
                let allMoney = 0
                this.cartInfo.forEach((item,index) => {
                    allMoney += item.price * item.count
                });
                // 把最新的数量保存到localStorage
                localStorage.cartInfo = JSON.stringify(this.cartInfo)

                return allMoney

            }
        }
    }
</script>

<style scoped>
    .btn-box {
        height: 2rem;
        line-height: 2rem;
        background-color: #fff;
        border-bottom: 1px solid #e4e7ed;
        padding: 5px;
        text-align: right;
    }

    .cart-list {
        background: #fff;
    }
    .row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0.5rem;
        font-size: 0.85rem;
        border-bottom: 1px solid #e4e7ed;
    }
    .goodsImg {
        flex: 6;
    }
    .goods-text {
        flex: 14;
        padding-left: 10px;
    }
    .control {
        padding-top: 10px;
        /* text-align: right; */
    }
    .goods-price {
        flex: 4;
        text-align: right
    }
    .totalMoney {
        padding: 10px;
        text-align: right;
    }

     .totalMoney .totalMoney_text {
         color: #f44;
         font-weight: bold;
     }
    
</style>