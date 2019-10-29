<template>
  <div class="login">
    <h1>系统登录</h1>
    <el-form
      :model="loginFrom"
      :rules="formRules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <!-- 用户名 -->
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="loginFrom.account"
          prefix-icon="iconfont icon-zhanghao"
          autocomplete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          @click.native="changePwd"
          :type="flag ? 'text' : 'password'"
          v-model="loginFrom.password"
          prefix-icon="iconfont icon-mima"
          :suffix-icon="flag ? 'iconfont icon-yanjing-zheng' : 'iconfont icon-yanjing_bi'"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <!-- 登录 -->
      <el-form-item>
        <el-button type="primary" @click="submitFrom">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {passwordReg} from "../utils/reg"; //工具函数 密码验证
import {login} from '@/api/account';  //登录接口
import local from '@/utils/local' //本地缓存
import { locale } from 'moment';

export default {
  data() {
    //自定义密码验证
    var checkPassword = (rule, value, callback) => {
     
      if(value === ''){
         callback(new Error('密码不能为空'));
      }else if(!rule.reg.test(value)){
          callback(new Error('密码至少包含 数字和英文，长度3-6'));
      }else{  //验证成功
        callback()
      }
    };
    return {
      // 绑定用户名和密码
      loginFrom: {
        account: "",
        password: ""
      },
      // 登录验证规则
      formRules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { validator: checkPassword, reg:passwordReg(), trigger: "blur" } //自定义验证密码
        ]
      },
      flag: false //切换密码显示或隐藏
    };
  },
  methods: {
    //切换密码是否显示或隐藏
    changePwd(e) {
      //判断点击的是否是显示隐藏图标
      if (e.target.className.includes("icon-yanjing")) {
        //切换字体图标和Input框的类型
        this.flag = !this.flag;
      }
    },
    //登录
    submitFrom() {
      //验证
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {  //表单验证通过
        let {account,password} = this.loginFrom;
        let obj={
          acc:account,
          pwd:password
        }
          let {code,msg,data,token} = await login(obj)
          console.log('data',data)
          if(code === 0){
            //将usergroup存入本地，导航权限需用到
            if(data[0].usergroup === '超级管理员'){
              local.set('usergroup','super')
            }else{
              local.set('usergroup','normal')
            }
            sessionStorage.setItem('account',JSON.stringify(data)); //保存到缓存中
            // window.localStorage.setItem('token',token);  //将token保存到本地缓存
            local.set('token',token) //将token保存到本地缓存
            this.$router.push('/home')
          }
        } else {
          return false; //阻止提交
        }
      });
    }
  }
};
</script>

<style lang="less" >
.login {
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .el-form {
    width: 300px;
  }
  .el-input__inner {
    background-color: #283443;
    color: #fff;
    border: 1px solid #ccc;
  }
  .el-button {
    width: 300px;
  }
}
</style>