<template>
    <div id="shopingMall">
        <div class="searchBox">
             <van-row>
                <van-col span="3" class="location">
                     <i class="iconfont icon-icon-test"></i>
                </van-col>
                <van-col span="16" class="searchIn">
                   <input type="text" placeholder="查找">
                </van-col>
                <van-col span="5" class="obj">
                   <!-- <van-button type="default">查找</van-button> -->
                  <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
       
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="typeBar">
            <div  v-for="(cate,index) in category" :key="index" >
                    <img v-lazy="cate.image" width="90%" />
                    <span>{{cate.mallCategoryName}}</span> 
            </div>
        </div>
        <div class="adBanner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" alt="">
        </div>
        <!-- 商品推荐 -->
        <div class="recommend-area">
            <p class="recommend-title">商品推荐</p>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                                <img :src="item.image" width="80%" />
                                <div>{{item.goodsName}}</div>
                                <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
     
        <FloorComponent :floorData="floor1" :floorTitle="floorName.floor1"></FloorComponent>
        <FloorComponent :floorData="floor2" :floorTitle="floorName.floor2"></FloorComponent>
        <FloorComponent :floorData="floor3" :floorTitle="floorName.floor3"></FloorComponent>
        <!-- 热卖商品区域 -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row>
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                           <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'//引入axios
// 引入vue-awesome-swiper 插件
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from'vue-awesome-swiper'
// 引入FloorComponent 组件
import FloorComponent from '../component/FloorComponent'
// 引入热卖商品组件
import goodsInfo from '@/components/component/GoodsInfo'

// 引入toMoney方法
import {toMoney} from '@/filter/moneyFilter.js'
// 引入axios 接口配置文件
import url from '@/serviceAPI.config.js'

export default {
  name:'shopingMall',
  components: {
      swiper,
      swiperSlide,
      FloorComponent,
      goodsInfo
    //   布局与FloorComponent一样，就直接传参后省略注释
    //   FloorComponent2,
    //   FloorComponent3
  },
  data () {
    return {
      msg:'这是 shopingMall Page',
      bannerPicArray:[],
      category:[],//首页分类
      adBanner:[],//首页广告banner
      // 推荐商品
      recommendGoods:[],
      floor1:[],
      floor2:[],
      floor3:[],
      floorName:{},
      hotGoods: [],//热卖商品
      swiperOption:{
       slidesPerView:2,
       slidesPerGroup:2
      }
    }
  },
  filters: {
      moneyFilter(money) {
          return toMoney(money)
      }
  },
    created(){
        axios({
            // url:'https://www.easy-mock.com/mock/5c04ed3105e43a1957ae8c2b/example/shoping',
            url:url.getShoppingMallInfo,
            method: 'get',
        })
        .then(response =>{
            // console.log(response);
            if(response.status == 200){
                this.category = response.data.data.category;
                this.adBanner = response.data.data.advertesPicture;//首页广告
                this.bannerPicArray = response.data.data.slides;//轮播图
                this.recommendGoods = response.data.data.recommend;//推荐商品
                // 获取楼层1的数据
                this.floor1 = response.data.data.floor1;
                this.floor1_0 =this.floor1[0];
                this.floor1_1 =this.floor1[1];
                this.floor1_2 =this.floor1[2];
                // console.log(this.floor1)
                // 获取楼层名称
                this.floorName= response.data.data.floorName;
                // 获取楼层2和楼层3的数据
                this.floor2 = response.data.data.floor2;
                this.floor3 = response.data.data.floor3;
                // 获取热卖商品数据
                this.hotGoods = response.data.data.hotGoods;

                
            }
            // console.log(this.floorName)
        })
        .catch(error=>{

        })
    }
}
</script>
<style scoped>
/* .obj {
    border-right: 1px solid red
} */

.searchBox {
    height: 2.2rem;
    background: #e5017d;
    line-height: 2.2rem;
}

.location {
   text-align: center; 
    color: #fff;
}

.location i {
    font-size: 1.2rem;
}
.searchIn input {
    width: 90%;
    padding-left: 2px;
    height: 1.6rem;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    color: #fff;
    background: #e5017d;
}
.swiper-area {
    width: 20rem;
    clear: both;
}
.swiper-area img {
    width: 20rem;
}
.typeBar{
    display: flex;
    flex-wrap: nowrap;
    margin: 0 .3rem .3rem;
    font-size: 14px;
    border-radius: .3rem;
    background: #fff;
    /* justify-content: space-around; */
}

.typeBar div {
    /* width: 19.5%; */
    flex: 1 1;
    padding: .3rem;
    font-size: 12px;
    text-align: center;
}

.adBanner {
    background: #efefef;
}

.recommend-area {
    background: #fff;
}

.recommend-title {
    padding: .3rem;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #ff4639;
    font-weight: bold;
}

.recommend-body {
    border-bottom: 1px solid #eee;
}

.recommend-item {
    border-right: 1px solid #eee;
    width: 99%;
    font-size: 14px;
    text-align: center;
}
.hot-area {
    text-align: center;
    font-size: 14px;
    line-height: 1.4rem;
}
.hot-goods {
    margin-bottom: 50px;
}
</style>
