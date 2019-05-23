<template>
    <div class="CategoryList">
        <div class="navbar-div">
            <van-nav-bar title="类别列表"/>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex == index}" v-for="(item,index) in category" :key="index">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySun">
                        <van-tabs v-model="active" @click="onclickCategorySub">
                            <van-tab  v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list 
                                v-model="loading"
                                :finished = "finished"
                                @load = "onload"
                            >
                                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodList" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" alt="" width="100%" :onerror="errorImg">
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data () {
            return {
                category: [],//大类信息
                categoryIndex: 0,//大类页面索引,用于点击样式
                categorySub:[],//二级分类信息
                active: 0,
                page: 1, //商品列表分页
                goodList: [],//商品列表
                categorySubId: '', //商品二级分类Id
                loading: false, //上拉加载
                finished: false, //上拉加载数据是否没有了
                isRefresh: false, //下拉刷新
                errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"'
            }
        },
        created() {
            this.getCategory()
        },
        // 只有在mounted才能获取到Dom
        mounted() {
            let winHeight = document.documentElement.clientHeight
            document.getElementById('leftNav').style.height = winHeight -46-50 + 'px'
            document.getElementById('list-div').style.height = winHeight -90-50 + 'px'
        },
        methods: {
            // 获取大类Id
           getCategory() {
               axios({
                   url: url.getCategoryList,
                   method: 'get'
               })
               .then(response => {
                //    console.log( '获取大类信息：')
                   console.log(response)
                   if(response.data.code == 200 && response.data.message) {
                       this.category = response.data.message
                       this.getCategorySubByCategoryId(this.category[0].ID)
                   } else {
                       Toast('网络不稳定，数据获取失败')
                   }
               })
               .catch(error =>{
                   console.log(error)
               })
           },

           clickCategory(index,categoryId){
               this.categoryIndex = index
               //    初始化数据
                this.page = 1
                this.goodList = []
                this.finished = false
                this.getCategorySubByCategoryId(categoryId)
            //    this.active = 0
                
           },

            //根据大类Id 获取小类类别列表
            getCategorySubByCategoryId(categoryId){
                axios({
                    url: url.getCategorySubList,
                    method: 'post',
                    data: {categoryId: categoryId}
                })
                .then(response => {
                    // console.log( '根据大类Id 获取小类信息：')
                    console.log(response)
                    if (response.data.code == 200 && response.data.message) {
                        this.categorySub = response.data.message
                        this.active = 0
                        this.categorySubId = this.categorySub[0].ID
                        this.onload()
                    }
                })
                .catch(error => {
                    console.log(error)
                }) 
            },
            // 上拉加载方法
            onload(){
                // 异步更新数据
                setTimeout(()=>{
                    this.categorySubId = this.categorySubId ? this.categorySubId:this.categorySub[0].ID
                    this.getGoodList()
                },500)
            },
            // 下拉刷新
            onRefresh(){
                setTimeout(()=> {
                    this.isRefresh = false
                    this.goodList =  []
                    //每次下拉刷新之后都让上拉刷新可以执行
                    this.page = 1
                    this.finished = false 
                    this.onload()
                },500)
            },

            
            // 编写商品列表的获取方法
            getGoodList(){
                axios({
                    url: url.getGoodsListByCategorySubID,
                    method: 'post',
                    data: { 
                        categorySubId:this.categorySubId,
                        page:this.page
                    }
                })
                .then(response =>{
                    // console.log('编写商品列表的获取方法')
                    console.log(response)
                    if(response.data.code == 200 && response.data.message.length) {
                        this.page ++
                        this.goodList = this.goodList.concat(response.data.message)
                        console.log(this.goodList)
                    } else {
                        this.finished = true
                        
                    }
                    this.loading = false 
                    // console.log(this.finished)
                })
                .catch(error => {
                    console.log(error)
                })
            },
            // 点击二级分类获取商品信息
            onclickCategorySub(index,title) {
                // console.log(111)
                this.categorySubId = this.categorySub[index].ID
                console.log('this.categorySubId:' + this.categorySubId)
                // 初始化数据
                this.goodList = []
                this.finished = false
                this.page = 1
                this.onload()
            },
            // 编程式导航——跳转商品详情页
            goGoodsInfo(id){
                this.$router.push({name:'Goods',params:{goodsId:id}})
            }
        },
        // 价格过滤
        filters: {
            moneyFilter(money){
                return toMoney(money)
            }
        }
    }
</script>

<style scoped>
    #leftNav {
        background: #efefef;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom:1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActive{
        background-color: #fff;
    }

    
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>
