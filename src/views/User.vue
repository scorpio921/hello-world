<template>
  <div class="view-user">
    <h1>用户管理</h1>
    <!-- --请在此处作答-- -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="真实姓名">
        <el-input
          v-model="form.trueName"
          placeholder="请输入真实姓名关键字"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input
          v-model="form.userName"
          placeholder="请输入用户名关键字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table
      :header-cell-style="{ background: '#f5f7fa' }"
      :highlight-current-row="false"
      :row-class-name="tableRowClassName"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userName" label="用户名"> </el-table-column>
      <el-table-column prop="trueName" label="真实姓名"> </el-table-column>
      <el-table-column prop="name" label="角色" width="260">
        <template slot-scope="scope">
          {{ scope.row.roleName.join(",") }}
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="部门">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.deptName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        :show-overflow-tooltip="true"
        label="地址"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        trueName: "",
        userName: "",
      },
      tableData: [],
      allData: [],
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 ? "cell-row" : "";
    },
    getALL() {
      let sendUrl = [
          axios.get("/getUsers"),
          axios.get("/getDepts"),
          axios.get("/getRoles"),
        ],
        roleArr = [];
      //获取用户
      axios.all(sendUrl).then(
        axios.spread((resusers, resdepts, resroles) => {
          if (
            resusers.status === 200 &&
            resdepts.status === 200 &&
            resroles.status === 200
          ) {
            resusers.data.forEach((item) => {
              item.deptName = "";
              item.roleName = [];

              if (item.roleList.length > 0) {
                item.roleList.map((i, index) => {
                  return (item.roleName[index] = resroles.data[i]);
                });
              }
              //添加部门名称
              if (item.dept && resdepts.data) {
                for (let i = 0; i < resdepts.data.length; i++) {
                  if (item.dept == resdepts.data[i].id) {
                    item.deptName = resdepts.data[i].deptName;
                  }
                }
              }
            });
            this.allData = resusers.data;
            this.tableData = resusers.data;
          }
        })
      );
    },
    onSubmit() {
      this.tableData = [];

      if (this.form.userName != "" || this.form.trueName != "") {
        this.allData.map((item) => {
          if (
            (item.userName.includes(this.form.userName) &&
              this.form.trueName == "") ||
            (item.trueName.includes(this.form.trueName) &&
              this.form.userName == "") ||
            (item.userName.includes(this.form.userName) &&
              item.trueName.includes(this.form.trueName))
          ) {
            this.tableData.push(item);
          }
        });
      }
      if (this.form.userName == "" && this.form.trueName == "") {
        this.tableData = this.allData;
      }
    },
    handleSelectionChange() {},
  },

  created() {
    this.getALL();
  },
};
</script>
<style>
.el-table .cell-row {
  background-color: #f5f7fa;
}
</style>
