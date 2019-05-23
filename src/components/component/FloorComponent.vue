<template>
    <div id="floorComponent">
    <!-- 楼层部分 -->
        <div class="floor">
            <div class="floorTit">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <div class="floor-one">
                     <a href="#">
                         <img :src="floorData0.image" width="100%" alt="">
                     </a>
                </div>
                <div class="floorRight">
                    <div class="right1">
                        <a href="#">
                            <img :src="floorData1.image" width="100%" alt="">
                        </a>
                    </div>
                    <div class="right2">
                         <a href="#">
                            <img :src="floorData2.image" width="100%" alt="">
                         </a>
                    </div>
                </div>
            </div>
            <div class="floorRule">
                <div v-for="(item,index) in floorData.slice(3)" :key="index">
                     <a href="#">
                        <img :src="item.image" width="100%" alt="">
                     </a>
                </div>
            </div>  
        </div>
    </div>
</template>
<script>
    export default {
        props:['floorData','floorTitle'],
        data(){
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        catch:{

        },
        watch: {
            floorData:function(val){
                // console.log(this.floorData);
                this.floorData0 = this.floorData[0]
                this.floorData1 = this.floorData[1]
                this.floorData2 = this.floorData[2]
            }
        }
    }
</script>
<style scoped>
    .floor-anomaly {
        display: flex;
        flex-wrap: nowrap;
    }
    .floor-anomaly>div  {
        flex: 1;
    }
    .floorTit {
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 14px;
        font-weight: bold;
        color: #ff4639;
        text-align: center;
    }

    .floor-one {
        box-sizing: border-box;
        border-right: 1px solid #ddd;
    }

    .floorRight .right1 {
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
    }
    .floorRule {
        display: flex;
        flex-wrap: wrap;
    }
    .floorRule>div {
        width: 50%;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
    }

    .floorRule div:nth-child(odd) {
        border-right: 1px solid #ddd;
    }
</style>
