<template>
  <div class="form">
    <el-form :model="notes" :rules="rules" ref="notes" label-width="100px" class="demo-notes">
      <el-form-item label="标题" prop="title">
        <el-input v-model="notes.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="abstract">
        <el-input type="textarea"
                  :rows="5"
                  v-model="notes.abstract"
                  resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片" required>
        <uploadImg @fileLoad="fileLoad"/>
      </el-form-item>
      <el-form-item label="内容" required>
        <!--<QuillEditor v-model="notes.content" :placeholder="'填写岗位需求'"/>-->
        <mavon-editor
          v-model="notes.content"
          ref="md"
          @change="change"
          style="min-height: 600px;z-index: 1"
        />
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="notes.tags" class="fll" size="small">
          <el-checkbox-button v-for="label in lables"
                              :label="label" :key="label.index">
            {{label.title}}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    
    <div style="text-align: center;">
      <el-button type="primary" @click="submit('notes')">提交</el-button>
      <el-button @click="resetForm('notes')">重置</el-button>
    </div>
  </div>
</template>

<script>
  import uploadImg from '@/components/putImg'
  // import QuillEditor from '../../components/QuillEditor'
  // 导入组件 及 组件样式
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  
  export default {
    name: 'write',
    components: {
      uploadImg, mavonEditor
    },
    data() {
      return {
        html: '',    // 及时转的html
        notes: {
          title: '',
          content: '',
          tags: [],
          abstract: '',
          coverImgUrl: ''
        },
        lables: [
          { title: 'html' },
          { title: 'css' },
          { title: 'h5' },
          { title: 'js' },
          { title: 'es6' },
          { title: 'ajax' },
          { title: 'vue.js' },
          { title: 'react.js' },
          { title: 'ui' }
        ],
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          abstract: [
            { required: true, message: '请输入摘要', trigger: 'blur' }
          ],
          content: [
            { type: 'date', required: true, message: '请输入内容', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 所有操作都会被解析重新渲染
      change(value, render) {
        // render 为 markdown 解析后的结果[html]
        this.html = render
      },
      async submit() {
        // this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //         alert('submit!');
        //     } else {
        //         console.log('error submit!!');
        //         return false;
        //     }
        // });
        let form = this.notes
        const data = await this.$fetch.api_article.addArticle(form)
        if (data.code === 200) {
          alert(data.msg)
        } else if (data.code === 400) {
          alert('发布失败')
        }
      },
      async fileLoad(file) {
        let form = new FormData()
        form.append('file', file)
        const data = await this.$xhr.post('/article/uploadImg', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (data.code === 200) {
          this.notes.coverImgUrl = data.url
        } else if (data.code === 400) {
          alert('上传失败')
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
