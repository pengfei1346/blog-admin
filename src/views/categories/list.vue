<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="describe"
        label="描述"/>

      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="修改时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleModify(scope.row)">修改</el-button>
          <el-button size="small" type="warning" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="pn"
                :limit.sync="size"
                @pagination="getCategories"/>

    <el-dialog
      title="修改"
      :visible.sync="isShowModify"
      width="500px">

      <el-form :model="notes" :rules="rules"
               ref="notes"
               label-width="100px">
        <el-form-item label="标题" prop="name">
          <el-input v-model="notes.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input type="textarea"
                    :rows="5"
                    v-model="notes.describe"
                    resize="none"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelModify">取 消</el-button>
        <el-button type="primary" @click="confirmModify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/paganation'

  export default {
    components: {
      Pagination
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        total: 0,
        pn: 1,
        size: 10,
        //
        isShowModify: false,
        notes: {
          name: '',
          describe: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getCategories()
    },
    methods: {
      async getCategories() {
        this.listLoading = true
        let params = {
          pn: this.pn,
          size: this.size
        }
        const data = await this.$fetch.api_categories.getCategories(params)
        this.list = data.data
        // this.total = data.total
        this.listLoading = false
      },
      handleModify(tab) {
        this.notes = Object.assign({},tab)
        this.isShowModify = true
      },
      async confirmModify () {
        let form = {
          ...this.notes
        }
        const data = await this.$fetch.api_categories.modifyCategories(form)
        if (data.code === 200) {
          this.$message.success(data.msg)
        } else if (data.code === 400) {
          this.$message.error(data.msg)
        }
      },
      cancelModify () {
        this.isShowModify = false
        this.notes = {}
      },
      handleDelete(tab) {
        console.log(tab);
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const data = await this.$fetch.api_categories.deleteCategories({_id: tab._id})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getCategories()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>
