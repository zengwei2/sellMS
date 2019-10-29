<template>
  <div class="order-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix header">
        <span>订单编辑</span>
        <el-button
          style="float: right"
          @click="getValue"
          :type="isEdit ? 'success' : 'primary'"
          size="small"
        >{{btnChange}}</el-button>
      </div>

      <div class="content">

        <!-- 订单号 -->
        <span>
          <span class="left">订单号:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.orderNo}}</span>
          <el-input v-else size="small" v-model="orderData.orderNo" type="text"></el-input>
        </span>
        <el-divider></el-divider>

        <!-- 下单时间 -->
        <span>
          <span class="left">下单时间:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.orderTime}}</span>
          <el-date-picker
            v-else
            v-model="orderData.orderTime"
            size="small"
            type="datetime"
            placeholder="选择日期时间"
            value-format='yyyy/MM/dd HH:mm:ss'
          ></el-date-picker>
        </span>
        <el-divider></el-divider>

        <!-- 手机号 -->
        <span>
          <span class="left">手机号:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.phone}}</span>
          <el-input v-else size="small" v-model="orderData.phone" type="text"></el-input>
        </span>
        <el-divider></el-divider>

        <!-- 收货人 -->
        <span>
          <span class="left">收货人:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.consignee}}</span>
          <el-input v-else size="small" v-model="orderData.consignee" type="text"></el-input>
        </span>
        <el-divider></el-divider>

        <!-- 配送地址 -->
        <span>
          <span class="left">配送地址:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.deliverAddress}}</span>
          <el-input v-else size="small" v-model="orderData.deliverAddress" type="text"></el-input>
        </span>
        <el-divider></el-divider>

        <!-- 送达时间 -->
        <span>
          <span class="left">送达时间:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.deliveryTime}}</span>
          <el-date-picker
            v-else
            v-model="orderData.deliveryTime"
            size="small"
            type="datetime"
            placeholder="选择日期时间"
            value-format='yyyy/MM/dd HH:mm:ss'
          ></el-date-picker>
        </span>
        <el-divider></el-divider>
        
        <!-- 用户备注 -->
        <span>
          <span class="left">用户备注:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.remarks}}</span>
          <el-input v-else size="small" v-model="orderData.remarks" type="text"></el-input>
        </span>
        <el-divider></el-divider>

        <!-- 订单金额 -->
        <span>
          <span class="left">订单金额:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.orderAmount}}</span>
          <el-input v-else size="small" v-model="orderData.orderAmount" type="text"></el-input>
        </span>
        <el-divider></el-divider>

        <!-- 订单状态 -->
        <span>
          <span class="left">订单状态:</span>
          <span v-if="isEdit === false" class="contentTitle">{{orderData.orderState}}</span>
          <el-select v-else v-model="orderData.orderState" size='small' placeholder="请选择订单状态">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="未受理" value="未受理"></el-option>
            <el-option label="已成功" value="已成功"></el-option>
          </el-select>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import {orderedit} from '@/api/order'

export default {
  data() {
    return {
      orderData: {}, //数据回填
      isEdit: false //是否保存
    };
  },
  methods: {
    //保存
    async getValue() {
      this.isEdit = !this.isEdit;
      if(!this.isEdit){
          let {code,msg} = await orderedit(this.orderData)
          if(code === 0){
              //保存成功跳转到订单管理页面
              this.$router.push('/home/ordermanager') 
          }
      }
    }
  },
  computed: {
    //编辑/保存
    btnChange() {
      return this.isEdit === false ? "编辑" : "保存";
    }
  },
  created() {
    //从缓存中获取订单
    let orderData = JSON.parse(window.sessionStorage.getItem("orderData"));
    this.orderData = orderData;
    console.log("orderData", this.orderData);
  }
};
</script>

<style lang="less" scoped>
.order-edit {
  .header {
    font-weight: bold;
  }
  .content {
    font-size: 14px;
    .left {
      display: inline-block;
      width: 60px;
      text-align: right;
      margin-right: 10px;
      font-weight: bold;
      color: #409EFF;
    }
    .el-input {
      width: 300px;
    }
  }
}
</style>