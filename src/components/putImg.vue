<template>
  <div class="put">
    <label class="put-container">
      <div id="add" v-show="!currentImg">
        <img src="../assets/icon_upload.png">
      </div>
      <img :src="currentImg" v-if="currentImg">
      <input type="file" @change="handlePut($event)" v-if="isEdit">
    </label>

  </div>
</template>

<script>
  export default {
    name: "putImg",
    data() {
      return {
        currentImg: ''
      }
    },
    props: {
      img: {
        type: String,
        default: ''
      },
      isEdit: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      async handlePut($event) {
        let file = $event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.currentImg = e.target.result
          this.$emit('fileLoad',e.target.result)
        };
        // this.currentImg = window.URL.createObjectURL(file)
      }
    }
  }
</script>

<style scoped lang="scss">

  .put-container{
    text-align: center;
    font-size: 30px;
    vertical-align: middle;
    font-weight: 100;
    display: block;
    color: #888;
    width: 120px;
    height: 120px;
    img{
      width: 120px;
      height: 120px;
    }
    #id{
      width: 120px;
      height: 120px;
    }
    input{
      display: none;
    }
  }

</style>
