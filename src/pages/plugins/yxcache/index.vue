<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div>

    </div>
</template>

<script>

  import YxCache from '../../../plugins/yx-cache/main'

  export default {
    name:"index",

    onLoad(options){
       //this.setCache()
      this.setNetCacheInterface()
    },

    methods:{

      setCache(){

         YxCache.setStorageSync("one" ,"天气")

         YxCache.getStorageSync('one')
      },

      setNetCacheInterface(){
          var keys = {
            action:'fkc/net/info_cache_time_30',
            param:{
              id:190,
              name:'zhang'
            }
          }

          var infos = {
            name:'good',
            base:'wang',
          }
          YxCache.setInterfaceCache(keys, infos)

          YxCache.getInterfaceCache(keys)

      },
    }
  }
</script>

<style scoped>

</style>