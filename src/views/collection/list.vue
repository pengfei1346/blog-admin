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
      <el-table-column align="center"
                       label="ID"
                       width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="author"
        label="作者"/>
      <el-table-column
        align="center"
        prop="abstract"
        label="描述"/>
      <el-table-column
        align="center"
        prop="tags"
        label="链接"/>
      <el-table-column
        align="center"
        prop="来源"
        label="heatNum"/>
      <el-table-column
        align="center"
        prop="创建时间"
        label="createdAt"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="更新时间"
        label="updatedAt"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="200">
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

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        total: 0,
        pn: 1,
        size: 10
      }
    },
    created() {
      // this.getArticleList()
    },
    methods: {
      async getArticleList() {
        this.listLoading = true
        let params = {
          pn: this.pn,
          size: this.size
        }
        const data = await this.$fetch.api_tag.getTagList(params)
        this.list = data.data
        // this.total = data.total
        this.listLoading = false
      }
    }
  }
</script>
