<template>
  <div class="form">
    <el-form :model="notes" :rules="rules" ref="notes" label-width="100px" class="demo-notes">
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

    <div style="text-align: center;">
      <el-button type="primary" @click="submit('notes')">提交</el-button>
      <el-button @click="resetForm('notes')">重置</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'write',
    data() {
      return {
        html: '',    // 及时转的html
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
    methods: {
      async submit() {
        let form = this.notes
        const data = await this.$fetch.api_categories.addCategories(form)
        if (data.code === 200) {
          this.$message.success(data.msg)
        } else if (data.code === 400) {
          this.$message.error(data.msg)
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped lang="scss">
  .form {
    font-size: 14px;
    min-width: 800px;
    max-width: 1300px;
    width: 74%;
    margin: 20px auto;
  }
</style>
