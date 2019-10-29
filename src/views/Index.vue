<template>
  <div class="home-index">
    <!-- 顶部数据 -->
    <el-row :gutter="20" class="el-row-top">
      <el-col :span="6">
        <el-card class="box-card">
          <div class="grid-content bg">
            <i class="iconfont icon-dingdan1 c-pink"></i>
            <div class="content">
              <p class="title">总订单</p>
              <p class="num">102,400</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="grid-content bg">
            <i class="iconfont icon-xianshangxiaoshou c-green"></i>
            <div class="content">
              <p class="title">总订单</p>
              <p class="num">102,400</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="grid-content bg">
            <i class="iconfont icon-74wodedingdan c-blue"></i>
            <div class="content">
              <p class="title">总订单</p>
              <p class="num">102,400</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="grid-content bg">
            <i class="iconfont icon-xiaoshou c-purple"></i>
            <div class="content">
              <p class="title">总订单</p>
              <p class="num">102,400</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 底部数据统计 -->
    <el-row class="el-row-bottom">
      <el-col :span="24">
        <el-card class="box-card">
          <div id="main" style="width:100%;height:400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
// 首页报表接口
import { indexcharts } from '@/api/order';

export default {
  data() {
    return {
      /* charts: "",
      opinion: ["总订单", "总营销额", "今日订单数", "今日销售额", ],
      opinionData: [
        { value: 335, name: "总订单" },
        { value: 310, name: "总营销额" },
        { value: 234, name: "今日订单数" },
        { value: 135, name: "今日销售额" },

      ] */
    };
  },
  methods: {
    /* 画折线图 */
    drawPie(date,amount,orderNum) {
      this.charts = echarts.init(document.getElementById('main'));
      this.charts.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["总订单", "总营销额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: '{value} 元'
          }
        },
        series: [
          {
            name: "总订单",
            type: "line",
            stack: "总量",
            data: orderNum
          },
          {
            name: "总营销额",
            type: "line",
            stack: "总量",
            data: amount
          }
        ]
      });
    },
    //获取数据
    async getData(){
      let { data,date } = await indexcharts();
      if(date.length > 0){
        this.drawPie(date,data.amount,data.orderNum)
      }
      console.log('data',data);
      console.log('date',date)
    }
  },
  //调用
  mounted() {
    // 获取数据
    this.getData()

  }
};
</script>

<style lang="less" scoped>
.home-index {
  .el-row-top {
    margin-bottom: 30px;
    .el-col {
      border-radius: 4px;
    }
  }
  .bg {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    i {
      font-size: 50px;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .title {
        color: #ccc;
        font-size: 18px;
        font-weight: 500;
      }
      .num {
        font-weight: 700;
      }
    }
    .c-pink {
      color: pink;
    }
    .c-green {
      color: lightgreen;
    }
    .c-blue {
      color: blue;
    }
    .c-purple {
      color: purple;
    }
  }
}
</style>