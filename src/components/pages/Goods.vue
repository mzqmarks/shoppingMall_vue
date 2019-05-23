<template>
    <div id="Goods">
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%">
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
        <!-- 详情部分 -->
        <div class="goods-Info">
            <van-tabs swipeable  sticky>
                <van-tab title="商品详情">
                    <div class="detial" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评价">
                   <div class="goods-evaluate">暂无评论</div> 
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button size="large" @click="addGoodsToCart">加入购物车</van-button>
            </div>
             <div>
                <van-button size="large">直接购买</van-button>
            </div>
        </div>
    </div>
    
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                goodsId:'',
                // 商品详细信息数据
                goodsInfo: {}
            }
        },
        created(){
            
            this.goodsId =this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
            console.log(this.goodsId)
            this.getInfo()
        },
        methods: {
            getInfo() {
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'post',
                    data:{goodsId: this.goodsId}
                })
                .then(response => {
                   
                    if(response.data.code == 200 && response.data.message) {
                        this.goodsInfo = response.data.message
                    } else {
                        Toast('服务器错误，数据取得失败')
                    }
                     console.log(response)
                })
                .catch(error => {
                    
                    console.log('错误：' + error)
                })
            },
            onClickLeft(){
                this.$router.go(-1)
            },

            // 加入购物车方法
            addGoodsToCart(){
                // 去除购物车内商品数据
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
                // 判断购物车中是否有该商品
                // 如果没有返回undefined ,如果有返回第一个查找到的数据
                let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId) 
                console.log(isHaveGoods)
                if(!isHaveGoods) {
                    // 如果没有商品直接添加到数组中
                    // 重新组成添加到购物车的信息
                    let newGoodsInfo = {
                        goodsId: this.goodsInfo.ID,
                        NAME:this.goodsInfo.NAME,
                        price: this.goodsInfo.ORI_PRICE,
                        image: this.goodsInfo.IMAGE1,
                        count: 1
                    }
                    // 添加到购物车
                    cartInfo.push(newGoodsInfo)
                    // 操作本地数据
                    localStorage.cartInfo = JSON.stringify(cartInfo)

                    Toast.success('添加成功')

                } else {
                    Toast.success('已有本商品')
                }
                this.$router.push({name:'Cart'})

            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money)
            }
        }
    }
</script>

<style scoped>
    .detial {
        font-size: 0;
    }
    .detial img {
       float: left;
    }
    .goods-name,.goods-price {
        padding-left: 10px;
        background: #fff;
    }
    .goods-name {
        margin-bottom: 8px;
    }
    .goods-price {
        font-size: 1rem;
    }
    .goods-Info {
        padding-bottom: 50px;
    }
    .goods-evaluate {
        min-height: 200px;
        text-align: center;
        color: #333;
        padding-top: 80px;
    }

    .goods-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        background: #fff;
    }
    .goods-bottom >div {
        flex: 1;
    }
</style>