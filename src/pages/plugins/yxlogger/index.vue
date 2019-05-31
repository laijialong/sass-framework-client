<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div>111222</div>
</template>

<script>
  export default {
    name:"index",

    onLoad(options){
      this.$log.setLevel("debug")
      this.$log.setOutputWay(this.$log.OUTPUT_WAY_CONSOLE)
      this.$log.setMaxLogCacheCount(4)
      this.$log.debug(this, "onLoad", "info")
      this.$log.info(this, "main", "info")
      this.$log.warn(this, "main", "info")
      this.$log.error(this, "main", "info")

      this.$log.getCache((info)=>{
         console.log(info)
      })

      try{
        throw new this.$log.except(this, 'onLoad', '数据xx', 'onLoad')
      }catch(err){
         console.log(err)
      }

    }
  }
</script>

<style scoped>

</style>
