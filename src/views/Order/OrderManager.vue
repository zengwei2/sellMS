<template>
  <div class="ordermanager">
    <el-card class="box-card">
      <!-- 搜索 -->
      <div class="searchBox">
        <!-- 订单号 -->
        <p>
          订单号
          <el-input v-model="searchVal.orderNo" size="small" placeholder="请输入订单号"></el-input>
        </p>
        <!-- 收货人 -->
        <p>
          收货人
          <el-input v-model="searchVal.consignee" size="small" placeholder="请输入收货人"></el-input>
        </p>
        <!-- 手机号 -->
        <p>
          手机号
          <el-input v-model="searchVal.phone" size="small" placeholder="请输入手机号"></el-input>
        </p>
        <!-- 订单状态 -->
        <p class="select">
          订单状态
          <el-select v-model="searchVal.orderState" size="small" placeholder="请选择订单状态">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="未受理" value="未受理"></el-option>
            <el-option label="已成功" value="已成功"></el-option>
          </el-select>
        </p>
        <!-- 选择时间 -->
        <p class="datatime">
          选择时间
          <el-date-picker
            v-model="searchVal.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            value-format="yyyy/MM/dd HH:mm:ss"
          ></el-date-picker>
        </p>
        <p>
          <el-button type="primary" size="small" @click.native="searchRes">查询</el-button>
          <el-button type="primary" size="small" @click.native="clear">清空</el-button>
        </p>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" width="100"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="160"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="160"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handelEdit(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 模态框 -->
      <!-- <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="50%">
        <el-form :model="form" label-width="100px">
          
          <el-form-item label="下单时间">
            <el-time-picker
              v-model="form.startTime"
              placeholder="任意时间点"
            ></el-time-picker>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="form.tel" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="收货人">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="配送地址">
            <el-input v-model="form.addr" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="送达时间">
            <el-time-picker
              v-model="form.endTime"
               :picker-options="{
                minTime: form.startTime
              }"
              placeholder="任意时间点"
            ></el-time-picker>
          </el-form-item>

          <el-form-item label="用户备注">
            <el-input v-model="form.remark" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="订单金额">
            <el-input v-model="form.orderMoney" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="订单状态">
            <el-input v-model="form.status" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmModel">确 定</el-button>
        </div>
      </el-dialog> -->

      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment';
import {orderlist} from '@/api/order';  //订单管理接口


export default {
  data() {
    return {
      // 搜索框的值
      searchVal: {
        orderNo: "", //搜索订单号
        consignee: "", //搜索收货人
        phone: "", //搜索手机号
        orderState: "", //搜索订单状态
        date: [] //选择时间
      },

      //表格数据
      tableData: [
        /* {
          orderNo: "14214314",
          orderTime: "2019/10/26 19:00:00",
          phone: "15073192333",
          consignee: "小貂蝉",
          deliverAddress: "成都市武侯区天府新谷5栋6楼",
          deliveryTime: "19:20:00",
          remarks: "微辣",
          orderAmount: "100",
          orderState : "已受理"
        } */
      ],
      //模态框数据
      form: {   
        startTime:new Date('2019/10/22 19:00:00'), //下单时间
        tel: 0,  //手机号
        name: "", //收货人
        addr:'', //配送地址
        endTime:new Date('2019/10/22 19:00:00'), //送达时间
        remark: '', //用户备注
        orderMoney: 0, //订单金额
        status:'' //订单状态
      },
      //模态框显示隐藏
      dialogFormVisible: false,
      //分页
      currentPage: 1, //当前页
      pageSize:5, //每页条数
      total:0 //总条数
    };
  },
  methods: {
    //查询
    searchRes() {
      console.log('date',this.searchVal.date)
      this.getDate();  //获取数据
    },
    //清空
    clear(){
      this.searchVal = {
        orderNo: "", //搜索订单号
        consignee: "", //搜索收货人
        phone: "", //搜索手机号
        orderState: "", //搜索订单状态
        date: [] //选择时间
      }
      this.getDate()
    },
    //查看
    handleClick(row) {
      console.log(row);
    },
    // 编辑
    handelEdit(row) {
      console.log(row);
      // 将当条数据保存到会话缓存
      window.sessionStorage.setItem('orderData',JSON.stringify(row));
      // 跳转到编辑页面
      this.$router.push('/home/orderedit');  
    },
    //模态框确定
    confirmModel(){
      this.dialogFormVisible = false;
      console.log('form',this.form)
    },
   
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDate();  //获取数据
    },
    //获取当前数据
    async getDate(){
      let obj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchVal.orderNo,
        consignee: this.searchVal.consignee,
        phone: this.searchVal.phone,
        orderState: this.searchVal.orderState,
        date: JSON.stringify(this.searchVal.date)
      }
      let {data,total} = await orderlist(obj)

      this.total = total;
      data.forEach(v => {
        //时间格式化
        v.orderTime = moment(v.orderTime).format('YYYY/MM/DD hh:mm:ss')
        v.deliveryTime = moment(v.deliveryTime).format('YYYY/MM/DD hh:mm:ss')
      })
      this.tableData = data;
    }
  },
  created() {
    this.getDate(); //获取数据
  },
};
</script>

<style lang="less" scoped>
.ordermanager {
  .searchBox {
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    p {
      flex: 0 0 220px;
      margin-bottom: 20px;
      .el-input {
        width: 70%;
        margin-left: 5px;
      }
      &.select {
        flex: 0 0 280px;
      }
      .el-select {
        width: 70%;
        margin-left: 5px;
      }
      &.datatime {
        flex: 0 0 500px;
        .el-date-editor {
          margin-left: 10px;
        }
      }
    }
  }

  .el-pagination {
    margin-top: 20px;
  }
}
</style>