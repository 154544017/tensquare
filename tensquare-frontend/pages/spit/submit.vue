<template>
  <div class="wrapper release-tc">
    <div class="release-box">
      <h3>发布吐槽</h3>
      <div class="editor">
        <div class="quill-editor"
             :content="content"
             @change="onEditorChange($event)"
             @blur="onEditorBlur($event)"
             @focus="onEditorFocus($event)"
             @ready="onEditorReady($event)"
             v-quill:myQuillEditor="editorOption">
        </div>
        <div class="btns">
          <button class="sui-btn btn-danger btn-release" @click="submit">发布</button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>

</template>

<script>
    import '~/assets/css/page-sj-spit-submit.css'
    import spitApi from "@/api/spit";
    import {quillRedefine} from 'vue-quill-editor-upload'
    export default {
        data () {
            return {
                content: '',
                editorOption: {
                    // some quill options
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block']
                        ]
                    }
                }
            }
        },
        mounted() {},
        methods: {
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({ editor, html, text }) {
                this.content=html;
            },
            submit(){
                if (this.content){
                    spitApi.submitSpit({content: this.content}).then(response => {
                        this.$message({
                            message: response.data.message,
                            type: (response.data.flag ? 'success' : 'error')
                        });
                        if (response.data.flag){
                            this.$router.push("/spit");
                        }
                    })
                }else {
                    this.$message({
                        message: "必须写点什么",
                        type: 'error'
                    })
                }
            }
        }
    }
</script>

<style scoped>

  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
