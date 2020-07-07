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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="coverImgUrl" min-width="100">
        <template slot-scope="scope">
          <img :src="scope.row.coverImgUrl" style="width: 100%;height: 60px;">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="author"
        label="作者"/>
      <el-table-column
        align="center"
        prop="abstract"
        label="摘要"/>
      <el-table-column
        align="center"
        prop="tags"
        label="tags"/>
      <el-table-column
        align="center"
        prop="heatNum"
        label="heatNum"/>
      <el-table-column
        align="center"
        prop="browseNum"
        label="browseNum"/>
      <el-table-column
        align="center"
        prop="replyNum"
        label="replyNum"/>

      <el-table-column align="center" prop="created_at" label="createdAt" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="updatedAt" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="操作" width="200">
        <template slot-scope="scope">
          <el-button>修改</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0"
                :total="total"
                :page.sync="pn"
                :limit.sync="size"
                @pagination="getArticleList"/>
  </div>
</template>

<script>
  import Pagination from '@/components/paganation'
  // For ES6 module
  import Message from 'vue-m-message'

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
        listLoading: false,
        total: 0,
        pn: 1,
        size: 10
      }
    },
    created() {
      // console.log(Message.error('asdadsasd'))
      this.getArticleList()
    },
    methods: {
      async getArticleList() {
        this.listLoading = true
        let params = {
          pn: this.pn,
          size: this.size
        }
        const data = await this.$fetch.api_article.getArticleList(params)
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      }
    }
  }
</script>
