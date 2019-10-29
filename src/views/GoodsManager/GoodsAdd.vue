<template>
  <div class="goodslist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>

      <!-- 表单 -->
      <el-form ref="goodsForm" :model="goodsForm" label-width="80px" :rules="rules">
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="goodsForm.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" prop="goodscategory">
          <el-select v-model="goodsForm.goodscategory" placeholder="请选择商品分类">
            <el-option label="促销" value="促销"></el-option>
            <el-option label="咖啡" value="咖啡"></el-option>
            <el-option label="热菜" value="热菜"></el-option>
            <el-option label="凉菜" value="凉菜"></el-option>
            <el-option label="饮品" value="饮品"></el-option>
            <el-option label="火锅" value="火锅"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品特色" prop="goodsfeature">
          <el-checkbox-group v-model="goodsForm.goodsfeature">
            <el-checkbox label="新品上市" name="type"></el-checkbox>
            <el-checkbox label="第二单半价" name="type"></el-checkbox>
            <el-checkbox label="主打产品" name="type"></el-checkbox>
            <el-checkbox label="火爆产品" name="type"></el-checkbox>
            <el-checkbox label="祖传手艺" name="type"></el-checkbox>
            <el-checkbox label="源自四川" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            :action="imgApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="goodsForm.imgUrl" :src="getImgApi + goodsForm.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="是否促销" prop="isPromotion">
          <el-radio-group v-model="goodsForm.isPromotion">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="食品规格" prop="goodsstandard">
          <el-radio-group v-model="goodsForm.goodsstandard">
            <!-- <el-radio label="单规格" @click.native="isShow = false"></el-radio>
            <el-radio label="多规格" @click.native="isShow = true"></el-radio>-->
            <el-radio label="单规格" @click.native="isShow = false">单规格</el-radio>
            <el-radio label="多规格" @click.native="isShow = true">多规格</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="包装费" v-if="!isShow">
          <el-input-number type="small" v-model="goodsForm.packingexpense" :min="1" label="包装费"></el-input-number>
        </el-form-item>

        <el-form-item label="价格" v-if="!isShow">
          <el-input-number type="small" v-model="goodsForm.goodsPrice" :min="20" label="价格"></el-input-number>
        </el-form-item>

        <div id="formTable" v-else>
          <el-button type="primary" size="small" @click="addMoreStandard">添加规格</el-button>
          <el-table :data="goodsForm.standardTableData" style="width: 100%">
            <el-table-column prop="goodsstandard" label="规格"></el-table-column>
            <el-table-column prop="packingexpense" label="包装费"></el-table-column>
            <el-table-column prop="goodsPrice" label="价格"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-form-item label="商品描述" prop="goodsdesc">
          <el-input type="textarea" v-model="goodsForm.goodsdesc"></el-input>
        </el-form-item>

        <!-- 模态框 -->
        <el-dialog title="添加规格" :visible.sync="dialogFormVisible" width="35%">
          <el-form :model="modelForm" style="width:100%" size="small"  label-width="60px">

            <el-form-item label="规格" >
              <el-input v-model="modelForm.goodsstandard"></el-input>
            </el-form-item>

            <el-form-item label="包装费" >
              <el-input-number type="small" v-model="modelForm.packingexpense" :min="1" label="包装费"></el-input-number>
            </el-form-item>

            <el-form-item label="价格" >
              <el-input-number type="small" v-model="modelForm.goodsPrice" :min="20" label="价格"></el-input-number>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmModel" size="small">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 提交添加 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button @click='cancel'>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { goodsadd } from "@/api/goods"; //引入商品管理接口

export default {
  data() {
    return {
      imgApi:'http://127.0.0.1:3000/goods/upload/',  //上传图片api接口
      getImgApi: 'http://127.0.0.1:3000/upload/goods/', //渲染图片地址
      //表单数据
      goodsForm: {
        goodsname: "", // 商品名称
        goodscategory: "", // 商品分类
        goodsfeature: [], // 商品特色
        imgUrl: "", // 商品图片
        isPromotion: "", // 是否促销
        goodsstandard: "单规格", // 食品规格
        packingexpense: 5, // 包装费
        goodsPrice: 20, // 价格
        standardTableData: [  //多规格
          {
            goodsstandard: "默认",
            packingexpense: 5,
            goodsPrice: 20
          }
        ],
        goodsdesc: "" // 商品描述
      },
      //规格切换
      isShow: false,
      //表单验证
      rules: {
        // 商品名称
        goodsname: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        // 商品分类
        goodscategory: [
          { required: true, message: "请输入商品分类", trigger: "change" }
        ],
        // 商品特色
        goodsfeature: [
          {
            required: true,
            message: "请选择至少1个商品特色",
            trigger: "change"
          }
        ],
        // 是否促销
        isPromotion: [
          { required: true, message: "请选择是否促销", trigger: "change" }
        ],
        // 食品规格
        goodsstandard: [
          { required: true, message: "请选择食品规格", trigger: "change" }
        ]
      },
      // 模态框显示或隐藏
      dialogFormVisible: false,
      //模态框表单
      modelForm: {
        goodsstandard: "",
        packingexpense: 0,
        goodsPrice: 20
      }
    };
  },
  methods: {
    /* 上传图片 */

    // 文件上传成功时的钩子
    handleAvatarSuccess(res, file) {
      //上传成功之后渲染到页面
      this.goodsForm.imgUrl = res.imgUrl;  
    },
    //上传文件之前的钩子
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isPNG || isJPG) && isLt2M;
    },
    //表格删除
    handleDelete(index, row) {
      console.log(index, row);
      this.goodsForm.standardTableData.splice(index,1);  //删除第n条数据
    },
    //添加多规格
    addMoreStandard() {
      this.dialogFormVisible = true;
    },
    //确认模态框
    confirmModel(){
      //关闭模态框
      this.dialogFormVisible = false;
      // 获取模态框里表单的值
      let {goodsstandard, packingexpense, goodsPrice} = this.modelForm;
      //将其赋给表格
      this.goodsForm.standardTableData.unshift({goodsstandard, packingexpense, goodsPrice})
      console.log('modelForm',this.goodsForm.standardTableData)
      //清空模态框里的数据
      this.modelForm = {
         goodsstandard: "",
         packingexpense: 0,
         goodsPrice: 20
      }
    },

    //提交表单 -- 获取表单的值
    onSubmit() {
      //表单验证
      this.$refs.goodsForm.validate(async valid => {
        if (valid) {
          let {goodsname,goodscategory,goodsfeature,imgUrl,isPromotion,goodsdesc,goodsstandard,packingexpense,goodsPrice,standardTableData} = this.goodsForm;
          let obj = {
            goodsname,
            goodscategory,
            goodsfeature: JSON.stringify(goodsfeature),
            imgUrl,
            isPromotion,
            goodsdesc,
            standard: goodsstandard === '单规格' ? JSON.stringify([{goodsstandard,packingexpense,goodsPrice}]) : JSON.stringify(standardTableData)
          }

          let {code,msg} = await goodsadd(obj)

          if(code === 0){
            //跳转到商品列表页面
            this.$router.push('/home/goodslist');  
          }

          console.log('obj',code)
        } else {
          console.log("error submit!!");
          return false; //阻止表单跳转
        }
      });
    },
    //取消
    cancel(){
      //将表单数据情况
      this.goodsForm = {
        goodsname: "", // 商品名称
        goodscategory: "", // 商品分类
        goodsfeature: [], // 商品特色
        imgUrl: "", // 商品图片
        isPromotion: "", // 是否促销
        goodsstandard: "单规格", // 食品规格
        packingexpense: 5, // 包装费
        goodsPrice: 20, // 价格
        standardTableData: [  //多规格
          {
            goodsstandard: "默认",
            packingexpense: 5,
            goodsPrice: 20
          }
        ],
        goodsdesc: "" // 商品描述
      }
    }
  }
};
</script>

<style lang="less" >
.goodslist {
  .el-form {
    width: 50%;
    // 上传图片
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    //表格
    #formTable {
      text-align: center;
      margin: 30px 0;
      .el-table-column {
        width: 25%;
      }
    }
  }
  .active {
    display: none;
  }
}
</style>