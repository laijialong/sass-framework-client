<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div>111222</div>
</template>

<script>
  import dayjs from 'dayjs'

  export default {
    name:"index",

    onLoad(options){

      console.log(dayjs("2019-06-03 13:49:57").add(500,'minute').format("YYYY-MM-DD HH:mm:ss"))

      var flag = dayjs().isBefore(dayjs("2019-06-03 13:49:57").add(5,'minute'))
      console.log(flag)

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
