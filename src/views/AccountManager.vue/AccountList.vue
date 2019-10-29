<template>
  <div class="accountlist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号列表</h3>
      </div>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'date'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="acc" label="账号" width="120"></el-table-column>

        <el-table-column prop="usergroup" label="用户组" width="160"></el-table-column>

        <el-table-column prop="ctime" label="创建日期" width="160" sortable>
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 7, 9]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 批量删除和取消选择 -->
      <div style="margin-top: 20px">
        <el-button
          type="danger"
          size="small"
          @click="deleteChecked"
          :disabled="multipleSelection.length === 0"
        >批量删除</el-button>
        <el-button type="primary" size="small" @click="toggleSelection">取消选择</el-button>
      </div>

      <!-- 对话框 编辑表格 -->
      <el-dialog title="设置账号" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form
          :model="accountModifyFrom"
          status-icon
          ref="accountModifyFrom"
          label-width="100px"
          class="demo-ruleForm"
          size="small"
          
        >
          <el-form-item label="账号" prop="acc">
            <el-input type="text" v-model="accountModifyFrom.acc" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item label="用户组" prop="usergroup">
            <el-select v-model="accountModifyFrom.usergroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button type="success" size="small" @click="getFrom()">保 存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
//引入moment时间格式化插件
import moment from "moment";
//账号管理接口
import { getAccountList,delAccount,batchDelAccount,updateAccount,chackAccount } from "@/api/account";

export default {
  data() {
    return {
      tableData: [
        /* {
          account: "a1",
          usergroup: "超级管理员",
          ctime: "2019/10/10"
        } */
      ],
      multipleSelection: [], //存放选中的行
      // 分页
      currentPage: 1, //当前页数
      total: 0, // 总条数
      pageSize: 5, //每页条数
      dialogVisible: false, //对话框是否显示隐藏
      //对话框 账号表单
      accountModifyFrom: {
        id: 0,
        acc: "",
        usergroup: ""
      }
    };
  },
  methods: {
    //选中状态 获取选中的行
    handleSelectionChange(rows) {
      //将选中的id值赋给空数组
      this.multipleSelection = rows.map(row => row.id);
    },
    // 编辑
    handleEdit(index, row) {
      //显示对话框
      this.dialogVisible = true;

      //获取账号 用户组 日期
      let { id, acc, usergroup } = row;

      //数据回填 -- 将当前点击的值回填到对话框
      this.accountModifyFrom.id = id;
      this.accountModifyFrom.acc = acc;
      this.accountModifyFrom.usergroup = usergroup;
    },
    // 删除
    handleDelete(index, { id }) {
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await delAccount({ id });
          if (code === 0) {
            this.getData(); //刷新页面
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /* 分页 */
    //每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      //获取账户列表
      this.getData();
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      //获取账户列表
      this.getData();
    },
    //批量删除
    deleteChecked() {
      this.$confirm("是否删除这些用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await batchDelAccount({
            ids: JSON.stringify(this.multipleSelection)
          });
          if (code === 0) {
            this.getData(); //刷新数据
          } else {
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //取消选择
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection();
    },
    //关闭对话框
    handleClose(done) {
      this.dialogVisible = false;
    },
    //确认对话框 保存对话框的表单值
    getFrom() {
      this.$refs.accountModifyFrom.validate(async valid => {
        if (valid) {
          this.dialogVisible = false; //关闭对话框
          let { code, msg } = await updateAccount(this.accountModifyFrom);

          if (code === 0) {
            this.getData(); //刷新页面
          }
        } else {
          return false;
        }
      });
    },
    //发送ajax获取账户列表
    async getData() {
      let obj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      let { total, data } = await getAccountList(obj);
      //做判断  分页bug 当某页数据删除完时的bug
      if (data.length === 0 && this.currentPage !== 1) {
        //判断获取到的数据为空并且当前页不为第1页
        this.currentPage -= 1; //回到上一页
        this.getData(); //再调用数据
      }

      //时间格式化
      // data.forEach(v =>  v.ctime = this.formatTime(v.ctime) )
      data.forEach(
        v => (v.ctime = moment(v.ctime).format("YYYY-MM-DD hh:mm:ss"))
      );

      this.total = total;
      this.tableData = data;
    }
  },
  created() {
    //获取账户列表
    this.getData();
  }
};
</script>

<style lang="less" >
.accountlist {
  .el-card {
    h3 {
      font-weight: bold;
    }
    .el-select {
      width: 100%;
    }
    .el-scrollbar {
      width: 80%;
    }
    .block {
      margin: 20px 0;
      .el-input {
        width: 80%;
        input.el-input__inner[type="text"] {
          width: 120px;
        }
      }
    }
  }
}
</style>