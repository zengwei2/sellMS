<template>
  <div class="shoptotal">
    <el-card class="box-card">
      <!-- 顶部搜索 -->
      <div class="search-box">
        <p class="datatime">
          时间范围
          <el-date-picker
            v-model="searchVal.searchDateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          ></el-date-picker>
        </p>
        <p>
          <el-button type="primary" size="small">查询</el-button>
        </p>
      </div>
      <!-- 底部商品统计折线图-->
      <div id="main" style="width:100%;height:450px"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts

export default {
  data() {
    return {
      //时间搜索
      searchVal: {
        searchDateTime: []
      }
    };
  },
  methods: {
    /* 画折线图 */
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "商品统计图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main"); //将其画到id为main的div里
    });
  }
};
</script>

<style lang="less" scoped>
.shoptotal {
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