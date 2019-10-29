<template>
  <div class="modifypassword">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>修改密码</h3>
      </div>
      <el-form
        :model="modifyPwdFrom"
        status-icon
        :rules="rules2"
        ref="modifyPwdFrom"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="originPwd">
          <el-input type="password" v-model="modifyPwdFrom.originPwd" auto-complete="off" placeholder="请输入原密码"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPwd">
          <el-input
            type="password"
            v-model="modifyPwdFrom.newPwd"
            auto-complete="off"
            placeholder="请输入数字和英文，长度3-6的密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="modifyPwdFrom.checkPwd" auto-complete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('modifyPwdFrom')">确定</el-button>
          <el-button @click="resetForm('modifyPwdFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//自定义验证密码
import { passwordReg } from "../../utils/reg";
// 引入本地缓存
import local from '@/utils/local';
//修改密码接口
import { modifyPwd,checkoldpwd,passwordedit } from "@/api/account";

export default {
  data() {
    //自定义验证原密码
    var validateOriginPwd = async (rule, value, callback) => {
      let {code,msg} = await checkoldpwd({oldPwd:value});

      if (value === "") {
        callback(new Error("请输入原密码"));
      } else if( code !== '00'){
        callback(new Error(msg))
      }else{
        callback()
      }
    };

    //自定义验证新密码
    var validatenewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else if (!rule.passwordReg.test(value)) {
        callback(new Error("密码至少包含 数字和英文，长度3-6"));
      } else {

        if (this.modifyPwdFrom.checkPwd !== '') {  //如果再次输入框不为空
            this.$refs.modifyPwdFrom.validateField('checkPwd'); //则验证两次密码是否一致
          }
        callback();
      }
    };

    //自定义验证确认密码
    var checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.modifyPwdFrom.newPwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      modifyPwdFrom: {
        originPwd: "", //原密码
        newPwd: "", //新密码
        checkPwd: "" //确认密码
      },
      //验证规则
      rules2: {
        originPwd: [{ validator: validateOriginPwd, trigger: "blur" }],
        newPwd: [
          {
            validator: validatenewPass,
            passwordReg: passwordReg(),
            trigger: "blur"
          }
        ],
        checkPwd: [{ validator: checkPwd, trigger: "blur" }]
      },
      data:[]  //缓存数据
    };
  },
  methods: {
    //确定修改密码表单
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          
          let {code,msg} = await passwordedit({newPwd:this.modifyPwdFrom.newPwd});  //修改密码接口

          if(code === 0){
            //删除缓存里的token
            // window.localStorage.removeItem('token');
            local.remove('token')

            //回到登录页面
            this.$router.push('/login'); 
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    //获取缓存里的账号信息
    let data = JSON.parse(sessionStorage.getItem('account'))
    this.data = data;
  }
};
</script>

<style lang="less" scoped>
.modifypassword {
  .el-card {
    h3 {
      font-weight: bold;
    }
    .el-input {
      width: 280px;
    }
  }
}
</style>