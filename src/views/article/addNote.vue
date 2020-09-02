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
        <uploadImg @fileLoad="fileLoad" :img.sync="notes.coverImgUrl"/>
      </el-form-item>
      <el-form-item label="内容" required>
        <!--<QuillEditor v-model="notes.content" :placeholder="'填写岗位需求'"/>-->
        <mavon-editor
          v-model="notes.content"
          ref="md"
          @change="change"
          style="min-height: 600px;z-index: 1"
        />

<!--        <mavon-editor-->
<!--          class="md"-->
<!--          ref="md"-->
<!--          v-model="notes.content"-->
<!--          @change="change"-->
<!--          style="min-height: 600px;z-index: 1"-->
<!--          :subfield="options.subfield"-->
<!--          :defaultOpen="options.defaultOpen"-->
<!--          :toolbarsFlag="options.toolbarsFlag"-->
<!--          :editable="options.editable"-->
<!--          :scrollStyle="options.scrollStyle" />-->

      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="notes.tags" class="fll" size="small">
          <el-checkbox-button v-for="label in lables"
                              :label="label" :key="label.index">
            {{label.name}}
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
        options: {
          subfield: true,// 单双栏模式
          // defaultOpen: 'edit',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
          editable: true,	// 是否允许编辑
          toolbarsFlag: true,
          // scrollStyle: false
        },
        html: '',    // 及时转的html
        notes: {
          name: '',
          content: '',
          tags: [],
          abstract: '',
          coverImgUrl: ''
        },
        lables: [
          { name: 'html' },
          { name: 'css' },
          { name: 'h5' },
          { name: 'js' },
          { name: 'es6' },
          { name: 'ajax' },
          { name: 'vue.js' },
          { name: 'react.js' },
          { name: 'ui' }
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
          this.$message({
            type: 'success',
            message: data.msg || '添加成功'
          });
          this.notes = this.$options.data()['notes']
        } else if (data.code === 400) {
          alert('发布失败')
        }
      },
      async fileLoad(file) {
        let form = new FormData()
        form.append('file', file)
        const data = await this.$fetch.api_article.uploadImg(form)
        if (data.code === 200) {
          this.notes.coverImgUrl = data.url
        } else if (data.code === 400) {
          this.$message({
            type: 'error',
            message: '上传失败'
          });
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
