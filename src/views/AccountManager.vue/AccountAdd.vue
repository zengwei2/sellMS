<template>
  <div class="accountadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>添加账号</h3>
      </div>
      <el-form
        :model="accountAddFrom"
        status-icon
        :rules="rules"
        ref="accountAddFrom"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="account" >
          <el-input type="text" v-model="accountAddFrom.account" placeholder="请输入账号"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="pwd" >
          <el-input type="password" v-model="accountAddFrom.pwd" placeholder="请输入数字和英文，长度3-6的密码"></el-input>
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item label="用户组" prop="usergroup" >
          <el-select v-model="accountAddFrom.usergroup" placeholder="请选择用户组">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>

        <!-- 添加/重置 -->
        <el-form-item class="form-button">
          <el-button type="primary" @click="submitForm('accountAddFrom')">添加</el-button>
          <el-button @click="resetForm('accountAddFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { passwordReg } from "../../utils/reg"; //引入密码正则表达式
import { accountAdd, chackAccount } from "@/api/account"; //引入添加账号post请求

export default {
  data() {
    //自定义验证账号
    let validatorAccount = async (rule, value, callback) => {
      //检查账号是否重复
      let { code, msg } = await chackAccount({ acc: value });

      //账号是否为空
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (code === 2001) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };

    //自定义验证密码
    let validatorPassword = (rule, value, callback) => {
      if (value === "") {
        //密码为空
        callback(new Error("请输入密码"));
      } else if (!rule.passwordReg.test(value)) {
        //密码不符合正则表达式
        callback(new Error("请输入至少包含 数字和英文，长度3-6的密码"));
      } else {
        callback();
      }
    };

    //自定义验证下拉框
    let validatorusergroup = (rule, value, callback) => {
      //用户组是否为空
      if (value === "") {
        callback(new Error("请选择用户组"));
      } else {
        callback();
      }
    };

    return {
      accountAddFrom: {
        account: "",
        pwd: "",
        usergroup: ""
      },
      rules: {
        account: [{ required:true, validator: validatorAccount, trigger: "blur" }],
        pwd: [
          {
            required:true,
            validator: validatorPassword,
            passwordReg: passwordReg(),
            trigger: "blur"
          }
        ],
        usergroup: [{ required:true,validator: validatorusergroup, trigger: "change" }]
      }
    };
  },
  methods: {
    //添加账号
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证通过
          // 获取表单值
          let params = {
            acc: this.accountAddFrom.account,
            pwd: this.accountAddFrom.pwd,
            usergroup: this.accountAddFrom.usergroup
          };
          // 发送post请求
          let { code, msg } = await accountAdd(params);
          if (code === 0) {
            //注册成功
            this.$router.push("/home/accountlist");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.accountadd {
  .el-card {
    h3 {
      font-weight: bold;
    }
    .el-input {
      width: 280px;
    }
    .el-select {
      width: 280px;
    }
    .el-button {
      width: 100px;
    }
  }
}
</style>