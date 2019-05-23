<template>
    <div id="Main">
        <div class="main-div">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="qr">商品列表</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            nowPath: ''//当前路径
        }
    },
    created() {
        this.changeTabBarActive();
    },
    updated() {
        this.changeTabBarActive();
    },
   
    methods: {
       
        changeTabBarActive(){
            this.nowPath=this.$route.path
            console.log(this.nowPath)
            if(this.nowPath=='/cart'){
                this.active=2;
            }
        },

        changeTabbar(active){
            // console.log(active)
            switch(active){
                case 0:
                    this.$router.push({name: 'ShoppingMall'})
                    break;
                case 1:
                    this.$router.push({name: 'CategoryList'})
                    break;
                case 2:
                    this.$router.push({name: 'Cart'})
                    break;
                case 3:
                    break;
            }
        }
    }
}
</script>
