<template>
  <div class="goodsadd">
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- 商品ID -->
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>

              <!-- 商品图片 -->
              <el-form-item label="商品图片">
                <span>
                  <el-image style="width: 100px; height: 100px; border-radius: 4px" :src="imgApi + props.row.imgUrl" ></el-image>
                </span>
              </el-form-item>

              <!-- 商品名称 -->
              <el-form-item label="商品名称">
                <span>{{ props.row.goodsname }}</span>
              </el-form-item>

              <!-- 商品分类 -->
              <el-form-item label="商品分类">
                <span>{{ props.row.goodscategory }}</span>
              </el-form-item>

              <!-- 商品特色 -->
              <el-form-item label="商品特色">
                <span>{{ props.row.goodsfeature | filterFeature}}</span>
              </el-form-item>

              <!-- 是否促销 -->
              <el-form-item label="是否促销">
                <span>{{ props.row.isPromotion }}</span>
              </el-form-item>

              <!-- 商品规格 -->
              <el-form-item label="商品规格">
                <span>{{ props.row.standard | filterStandard}}</span>
              </el-form-item>

              <!-- 商品描述 -->
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsdesc }}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="goodsname"></el-table-column>
        <el-table-column label="描述" prop="goodsdesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
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
//引入商品管理接口  
import { goodslist,goodsdel } from "@/api/goods";

export default {
  data() {
    return {
      //表格数据
      tableData: [
        /* {
          id: "12987122",
          goodsname: "好滋好味鸡蛋仔",
          goodsdesc: "江浙小吃、小吃零食"
        } */
      ],
      imgApi:'http://127.0.0.1:3000/upload/goods/', //图片服务器端地址
      //分页
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      total: 0, //总条数
      dialogFormVisible: false //模态框显示隐藏
    
    };
  },
  methods: {
    //编辑
    handleEdit(index, row) {
      
      //存入会话缓存
      sessionStorage.setItem('goodslist',JSON.stringify(row));
      //跳转到商品编辑页面
      this.$router.push('/home/goodsedit');
    },
  
    //删除
    async handleDelete(index, row) {
      let { id } = row;
      let {code,msg} = await goodsdel({id});

      if (code === 0) {
        this.getData(); //刷新数据
      }
    },
    //每页多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData(); //获取数据
    },
    //点击其他页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData(); //获取数据
    },
    //获取商品数据
    async getData() {
      let obj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      let { total, data } = await goodslist(obj);

      //分页bug 每页删除完之后数据为空,不回到上一页
      if (!data.length && this.currentPage !== 1) {
        this.currentPage -= 1;
        this.getData();
      }

      if (data.length > 0) {
        this.tableData = data;
        this.total = total;
      }
    }
  },
  created() {
    this.getData(); //获取数据
  },
  filters:{
    //过滤商品特色
    filterFeature(val){
      return JSON.parse(val).join(' / ')
    },
    //过滤商品规格
    filterStandard(val){
      return JSON.parse(val).map(v => `${v.goodsstandard} ${v.packingexpense} ${v.goodsPrice}`).join(' / ')
    }
  }
};
</script>

<style lang="less" >
.goodsadd {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>