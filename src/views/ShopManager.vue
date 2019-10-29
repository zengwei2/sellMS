<template>
  <div class="shopmanager">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>店铺管理</h3>
      </div>
      <div class="card-content">
        <el-form
          style="width:80%"
          :rules="rules"
          size="small"
          ref="form"
          :model="form"
          label-width="120px"
          :disabled="isDisabled"
        >
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="shopname" style="width:60%">
            <el-input v-model="form.shopname"></el-input>
          </el-form-item>

          <!-- 详细地址 -->
          <el-form-item label="详细地址" prop="address"  style="width:60%">
            <el-input v-model="form.address"></el-input>
          </el-form-item>

          <!-- 联系电话 -->
          <el-form-item label="联系电话" prop="phone"  style="width:60%">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>

          <!-- 店铺简介 -->
          <el-form-item label="店铺简介" prop="shopdesc"  style="width:60%">
            <el-input v-model="form.shopdesc"></el-input>
          </el-form-item>

          <!-- 店铺标语 -->
          <el-form-item label="店铺标语" prop="slogan"  style="width:60%">
            <el-input v-model="form.slogan"></el-input>
          </el-form-item>

          <!-- 店铺分类 -->
          <el-form-item label="店铺分类" prop="category"  style="width:60%">
            <el-select v-model="form.category" placeholder="请选择商品分类">
              <el-option label="热销" value="热销"></el-option>
              <el-option label="咖啡" value="咖啡"></el-option>
              <el-option label="热菜" value="热菜"></el-option>
              <el-option label="凉菜" value="凉菜"></el-option>
              <el-option label="饮品" value="饮品"></el-option>
              <el-option label="火锅" value="火锅"></el-option>
            </el-select>
          </el-form-item>

          <!-- 店铺特点 -->
          <el-form-item label="店铺特点" prop="feature"  style="width:60%">
            <el-checkbox-group v-model="form.feature">
              <el-checkbox label="品牌包装" name="type"></el-checkbox>
              <el-checkbox label="蜂鸟专送" name="type"></el-checkbox>
              <el-checkbox label="外卖保" name="type"></el-checkbox>
              <el-checkbox label="准时达" name="type"></el-checkbox>
              <el-checkbox label="开发票" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 配送费 -->
          <el-form-item label="配送费"  style="width:60%">
            <el-input-number type="small" v-model="form.packingexpense" :min="1" label="配送费"></el-input-number>
          </el-form-item>

          <!-- 起送价 -->
          <el-form-item label="起送价"  style="width:60%">
            <el-input-number type="small" v-model="form.minprice" :min="20" label="起送价"></el-input-number>
          </el-form-item>

          <!-- 营业时间 -->
          <el-form-item label="营业时间" prop="date"  style="width:60%">
            <el-time-picker
              is-range
              v-model="form.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format='yyyy/MM/dd HH:mm:ss'
            ></el-time-picker>
          </el-form-item>

          <!-- 店铺头像 -->
          <el-form-item label="店铺头像"  style="width:60%">
            <el-upload
              class="avatar-uploader"
              :action="imgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.shopAvatar" :src="getImgApi + form.shopAvatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 商业许可证 -->
          <el-form-item label="商业许可证"  style="width:60%">
            <el-upload
              class="avatar-uploader"
              :action="imgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.businessLicenseImg" :src="getImgApi + form.businessLicenseImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 餐饮服务许可证 -->
          <el-form-item label="餐饮服务许可证"  style="width:60%">
            <el-upload
              class="avatar-uploader"
              :action="imgApi"
              :show-file-list="false"
              :on-success="handleAvatarSuccess3"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.cateringServiceLicenseImg" :src="getImgApi + form.cateringServiceLicenseImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 活动优惠 -->
          <el-form-item label="活动优惠"  style="width:60%">
            <el-select v-model="form.discount" @change="showModel" placeholder="请选择活动分类">
              <el-option label="满减优惠" value="满减优惠"></el-option>
              <el-option label="特惠大酬宾" value="特惠大酬宾"></el-option>
              <el-option label="新用户立减" value="新用户立减"></el-option>
              <el-option label="进店领券" value="进店领券"></el-option>
            </el-select>
          </el-form-item>

          <!-- 活动优惠表格 -->
          <el-table
            ref="singleTable"
            :data="form.tableData"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column property="title" label="活动标题" width="120"></el-table-column>
            <el-table-column property="name" label="活动名称" width="120"></el-table-column>
            <el-table-column property="detail" label="活动详情" width="200"></el-table-column>
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
        </el-form>
         <!-- 修改保存 -->
        <el-button class="edit" type="primary" size='small' @click='editForm'>修改</el-button>
        <el-button type="success" size='small' @click="onSubmit">保存</el-button>

        <!-- 对话框 编辑表格 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form
          :model="activeModel"
          status-icon
          ref="activeModel"
          label-width="120px"
          class="demo-ruleForm"
          size="small"       
        >
          <el-form-item label="请输入活动详情">
            <el-input type="text" v-model="activeModel.detail"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button type="success" size="small" @click="getFrom()">保 存</el-button>
        </span>
      </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
// 时间格式化插件
import moment from 'moment'; 
// 引入电话正则表达式
import {telReg} from '@/utils/reg';
//引入店铺管理接口
import {shopinfo,shopedit} from '@/api/shop';
 

export default {
  data() {
    //自定义验证手机号
    let validatorTel = (rule,value,callback) =>{
      if(value === ''){
        callback(new Error('请输入电话号码'))
      }else if(!rule.telReg.test(value)){
        callback(new Error('请输入正确的手机号码'))
      }else{
        callback()
      }
    }

    return {
      imgApi: 'http://127.0.0.1:3000/shop/upload',
      getImgApi:'http://127.0.0.1:3000/upload/shop/',
      // 表单数据
      form: {
        shopname: "", //商品名称
        address: "", // 详细地址
        phone: "", // 联系电话
        shopdesc: "", // 店铺简介
        slogan: "", // 店铺标语
        category: "", // 店铺分类
        feature: [], // 店铺特点
        packingexpense: 1, // 配送费
        minprice: 20, // 起送价
        date: '', // 营业时间   
        shopAvatar: "", // 店铺头像
        businessLicenseImg: "", // 商业许可证
        cateringServiceLicenseImg:'', //餐饮服务许可证
        discount: "", // 活动优惠
        // 活动优惠表格
        tableData: [
          /* {
            title: "减",
            name: "满减优惠",
            detail: "满30减5 满60减8"
          } */
        ]
      },
      //表单验证
      rules: {
        // 商品名称
        shopname: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        // 详细地址
        address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
        // 联系电话
        phone: [{ required:true, validator: validatorTel, telReg: telReg(), trigger: "blur" }],
        // 店铺简介
        shopdesc: [{ required: true, message: "请输入店铺简介", trigger: "blur" }],
        // 店铺标语
        slogan: [{ required: true, message: "请输入店铺标语", trigger: "blur" }],
        // 店铺分类
        category: [{ required: true, message: "请选择店铺分类", trigger: "change" }],
        // 店铺特点
        feature: [{ required: true, message: "请选择至少1个商品特点", trigger: "change" }],
        // 营业时间
        date: [{ required: true, message: "请输入营业时间", trigger: "change" }],
      },
      isDisabled: true, //表单是否禁用
      dialogVisible: false, //对话框是否显示隐藏
      //对话框 活动优惠
      activeModel: {
        title:'',  //活动标题
        name:'',  //活动名称
        detail: "" //活动详情
      },
    };
  },
  methods: {
    /* 上传图片 */

    //店铺头像  文件上传成功时的钩子
    handleAvatarSuccess1(res, file) {
      this.form.shopAvatar = res.imgUrl;  //将其赋给表单
    },
    //商业许可证 文件上传成功时的钩子
    handleAvatarSuccess2(res, file) {
      this.form.businessLicenseImg = res.imgUrl;  //将其赋给表单
    },
    //餐饮服务许可证 文件上传成功时的钩子
    handleAvatarSuccess3(res, file) {
      this.form.cateringServiceLicenseImg = res.imgUrl;  //将其赋给表单
    },
    //上传文件之前的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },  
    //表格删除
    handleDelete(index, row) {
      //删除指定行
      this.form.tableData.splice(index,1)
    },
    // 显示模态框
    showModel(){
      this.dialogVisible = true;
      let discount = this.form.discount;
      this.activeModel.name = discount;  //将其赋给模态框的name
      switch(discount){
        case '满减优惠':
          this.activeModel.title = '减';
          break;
        case '特惠大酬宾':
          this.activeModel.title = '特';
          break;
        case '新用户立减':
          this.activeModel.title = '新';
          break;
        case '进店领券':
          this.activeModel.title = '领'
      }
    },
    //关闭对话框
    handleClose(done) {
      this.dialogVisible = false;
    },
    //模态框保存
    getFrom(){
      this.dialogVisible = false;
      this.form.tableData.unshift(this.activeModel)
      this.activeModel = {
          title:'',  //活动标题
          name:'',  //活动名称
          detail: "" //活动详情
      }
    },
    //表单修改
    editForm(){
      this.isDisabled = false;
    },
    // 表单保存
    onSubmit() {
      //表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.isDisabled = true;
          let obj = {
            shopname: this.form.shopname,
            address: this.form.address,
            phone: this.form.phone,
            shopdesc: this.form.shopdesc,
            slogan: this.form.slogan,
            category: this.form.category,
            feature: JSON.stringify(this.form.feature),
            packingexpense: this.form.packingexpense,
            minprice: this.form.minprice,
            date: JSON.stringify(this.form.date),
            shopAvatar: this.form.shopAvatar,
            businessLicenseImg: this.form.businessLicenseImg,
            cateringServiceLicenseImg: this.form.cateringServiceLicenseImg,
            tableData: JSON.stringify(this.form.tableData)
          }
          let {code} = await shopedit(obj)
        } else {
          console.log("error submit!!");
          return false; //阻止表单跳转
        }
      });
    },
    //查询店铺信息
    async getShopInfo(){
      let {data} = await shopinfo();

      //将其赋给表单
      this.form = {
        shopname: data.shopname,
        address: data.address,
        phone: data.phone,
        shopdesc: data.shopdesc,
        slogan: data.slogan,
        category: data.category,
        feature: JSON.parse(data.feature),
        packingexpense: data.packingexpense,
        minprice: data.minprice,
        date: JSON.parse(data.date),
        shopAvatar: data.shopAvatar,
        businessLicenseImg: data.businessLicenseImg,
        cateringServiceLicenseImg: data.cateringServiceLicenseImg,
        tableData: JSON.parse(data.tableData),
      }
    }

  },
  created() {
      this.getShopInfo()
  },

};
</script>

<style lang="less" >
.shopmanager {
  .card-content {
    .el-form {
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
      .form-button {
        margin-top: 20px;
      }
    }
    .edit{
      margin-left: 40px;
      margin-top: 20px;
    }
  }
}
</style>