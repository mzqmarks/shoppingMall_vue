<template>
    <div id="Register">
        <van-nav-bar
            title="用户登陆"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />

        <div class="register-panel">
            <!-- <van-cell-group> -->
                <van-field
                    v-model="username"
                    label="用户名"
                    clearable
                    right-icon="clear"
                    placeholder="请输入用户名"
                    required
                   @click-right-icon="username = ''"
                   :error-message="usernameErrorMsg"
                />

                <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                    :error-message="passwordErrorMsg"
                />

                <div class="register-button">
                    <van-button type="primary" @click="LoginAction" :loading = "openLoading" size="large">登陆</van-button>
                </div>

                
            <!-- </van-cell-group> -->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js' //引入注册接口配置文件
import {Toast} from 'vant'
export default {
    data() {
        return {
            username: '',
            password: '',
            openLoading: false, //是否开启用户的loading
            usernameErrorMsg: '' ,//当用户名错误时提示信息
            passwordErrorMsg: '' //当密码错误时提示信息

        }
    },
    
    created() {
        if(localStorage.userInfo) {
            console.log(localStorage)
            Toast.success('您已经登陆过了')
            this.$router.push('/')
        }
    },

    methods: {
        goBack(){
            this.$router.go(-1)
        },
        // 验证表单数据
        LoginAction() {
            this.checkForm() && this.axiosLoginUser()
            // if(this.checkForm()) {
            //     this.axiosRegisterUser()
            // }
        },

        axiosLoginUser(){
            this.openLoading = true
           axios({
              url: url.login,
              method: 'post',
              data: {
                  userName: this.username,
                  password: this.password
              } 
           })
           .then(response => {
               console.log(response)
               //如果返回code为200，代表注册成功，我们给用户作Toast提示
               if (response.data.code == 200 && response.data.message !='用户名不存在' &&  response.data.message) {
                     // 登录成功后把用户名localStorage进行本地存储
                   new Promise((resolve,reject) => {
                       localStorage.userInfo = {userName: this.userName}
                       setTimeout(() => {
                          resolve() 
                       },500)
                   })
                   .then(()=>{
                        Toast.success("登陆成功")
                        this.$router.push('/')
                   })
                   .catch((err)=>{
                       Toast('登录状态保存失败')
                       console.log(err)
                   })

                //    Toast.success(response.data.message)
                  
               } else {
                   console.log(response.data.message)
                   Toast.fail('登陆失败')
                //    Toast.fail(response.data.message)
                   this.openLoading = false
               }
           })
           .catch((error) => {
               console.log(error)
               this.openLoading = false
           })
        },

        checkForm() {
            let isOk = true;
            if(this.username.length < 5) {
                this.usernameErrorMsg = "用户名不能少于5位"
                isOk = false;
            } else {
                this.usernameErrorMsg = "" 
            }

            if(this.password.length < 6) {
                this.passwordErrorMsg = "密码不能少于6位"
                isOk = false;
            } else {
                this.passwordErrorMsg = ""
            }

            return isOk
        }

    }
}
</script>

<style scoped>

    #Register {
        background: #efefef;
    }
    .register-panel {
        width: 96%;
        margin: 20px auto;
        border-radius: .5rem;
        padding-bottom: 50px;
    }

    .register-button {
        padding-top: 10px;
    }
</style>




