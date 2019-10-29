<template>
  <div class="ordertotal">
    <el-card class="box-card">
      <!-- 顶部搜索 -->
      <div class="search-box">
        <p class="datatime">
          时间范围
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            value-format='yyyy/MM/dd HH:mm:ss'
          ></el-date-picker>
        </p>
        <p>
          <el-button type="primary" size="small" @click="searchVal">查询</el-button>
        </p>
      </div>
      <!-- 底部商品统计折线图-->
      <div id="main" style="width:100%;height:450px"></div>
    </el-card>
  </div>
</template>

<script>
//引入echarts
import echarts from "echarts"; 
// 引入moment格式化时间插件
import moment from 'moment';
//引入订单接口
import { ordertotal } from '@/api/order';

export default {
  data() {
    return {   
      date: '' //时间搜索
    };
  },
  methods: {
    /* 画折线图 */
    drawPie(xVal,yVal) {
      // 初始化echarts
      let myChart = echarts.init(document.getElementById("main"));
      // 配置option
      let option = {
        title: {
          text: "订单统计图"
        },
        xAxis: {
          type: "category",
          data: xVal
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: yVal,
            type: "line"
          }
        ]
      };
      // 3. 生成报表
      myChart.setOption(option);
    },
    //搜索
    searchVal(){
      console.log(this.date)
      this.getData();  //调用获取数据
    },
    //获取数据
    async getData(){
      let obj = {
        date:JSON.stringify(this.date)
      }
      let { data } = await ordertotal(obj);
      //格式化时间
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format('YY/MM/DD');
      })
      let obj2 = {}
      //去重，将相同时间的订单金额相加
      data.forEach(v => {
        //如果是第一次出现orderTime
        if(!obj2[v.orderTime]){
          obj2[v.orderTime] = v.orderAmount;
        }else{ //不是第一次出现就相加
          obj2[v.orderTime] += v.orderAmount;
        }
      })
      let xVal = []; //x轴的值
      let yVal = []; //y轴的值

      //再将其加入到变量数组
      for(var key in obj2){
        xVal.push(key)
        yVal.push(obj2[key])
      }

      this.drawPie(xVal,yVal); //调用
    }
  },
  mounted() {
    this.getData()    
  }
};
</script>

<style lang="less" scoped>
.ordertotal {
  .search-box {
    margin-bottom: 50px;
    display: flex;
    flex-wrap: nowrap;
    p.datatime {
      .el-range-editor {
        margin-left: 10px;
        margin-right: 15px;
      }
    }
  }
}
</style>