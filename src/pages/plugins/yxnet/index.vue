<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div>111</div>
</template>

<script>

    import YxNet from "../../../plugins/yx-net/main"

  export default {
    name:"index",

    onLoad(options){
      YxNet.init()

      YxNet.setUrl("")
    },

    methods:{
      //获得毫秒数


    },
  }
</script>

<style scoped>

</style>
