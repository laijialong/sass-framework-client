import yxlogger from 'yx-logger'
import dayjs from 'dayjs'
/**
 *     接口缓存，怎么判断一个接口是不是缓存接口，在action做判断
 *     如果aciton带了_cache_time则表示是缓存接口
 * @type {string}
 */

var tag = 'YxCache'


var YxCache = {
  
  platform:'wx', //日志输出平台
  
  PLATFORM_WX:'wx', //微信
  PLATFORM_TT:'tt', //头条
  PLATFORM_MY:'my', //蚂蚁
  
  CACHE_NAME:'_cache_', //cache标识
  CACHE_TIME:'_time_', //缓存时间
  
  /**
   * 清除本地数据缓存的异步接口。
   */
  clearStorage:()=>{
    if(YxCache.platform == YxCache.PLATFORM_WX){
      wx.clearStorage()
    }else if(YxCache.platform == YxCache.PLATFORM_TT){
      tt.clearStorage()
    }else if(YxCache.platform == YxCache.PLATFORM_MY){
      my.clearStorage()
    }else{
      yxlogger.error(tag, 'clearStorage', '没有找到平台')
    }
  },
  
  /**
   * 清除本地数据缓存的同步接口。
   */
  clearStorageSync:()=>{
    if(YxCache.platform == YxCache.PLATFORM_WX){
      wx.clearStorageSync()
    }else if(YxCache.platform == YxCache.PLATFORM_TT){
      tt.clearStorageSync()
    }else if(YxCache.platform == YxCache.PLATFORM_MY){
      my.clearStorageSync()
    }else{
      yxlogger.error(tag, 'clearStorageSync', '没有找到平台')
    }
  },
  
  /**
   *    从本地缓存中异步获取指定 key 的内容
   * @param key   ： 指定key
   * @param callback: 回调
   *    成功返回对应的值，失败返回null
   */
  getStorage:(key,callback)=>{
    try{
      if(YxCache.platform == YxCache.PLATFORM_WX){
        wx.getStorage({
          key: key,
          success (res) {
            callback(res)
          },
          fail(err){
            callback(null)
          }
        })
      }else if(YxCache.platform == YxCache.PLATFORM_TT){
        tt.getStorage({
          key: key,
          success (res) {
            callback(res)
          },
          fail(err){
            callback(null)
          }
        })
      }else if(YxCache.platform == YxCache.PLATFORM_MY){
        my.getStorage({
          key: key,
          success (res) {
            callback(res)
          },
          fail(err){
            callback(null)
          }
        })
      }else{
        yxlogger.error(tag, 'getStorage', '没有找到平台')
        callback(null)
      }
    }catch (err){
      //throw new YxLogger.except(tag, 'getStorage', err.name, err.message)
      yxlogger.error(tag, 'getStorage', err.name + err.message)
      callback(null)
    }
    
  },
  
  /**
   * 从本地缓存中同步获得数据
   * @param key: 传入的key
   */
  getStorageSync:(key)=>{
    try{
      if(YxCache.platform == YxCache.PLATFORM_WX){
        return wx.getStorageSync(key)
      }else if(YxCache.platform == YxCache.PLATFORM_TT){
        return tt.getStorageSync(key)
      }else if(YxCache.platform == YxCache.PLATFORM_MY){
        return my.getStorageSync(key)
      }else{
        yxlogger.error(tag, 'getStorageSync', '没有找到平台')
        return ""
      }
    }catch(err){
      yxlogger.error(tag, 'getStorageSync', err.name + err.message)
      return ""
      //throw new YxLogger.except(tag, 'getStorageSync', err.name, err.message)
    }
    
  },
  /**
   *   异步设置数据
   *   将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。
   *   数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，
   *   否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
   * @param key
   * @param data
   */
  setStorage:(key,data)=>{
     try{
       if(YxCache.platform == YxCache.PLATFORM_WX){
         wx.setStorage({
           key:key,
           data:data
         })
       }else if(YxCache.platform == YxCache.PLATFORM_TT){
         tt.setStorage({
           key:key,
           data:data
         })
       }else if(YxCache.platform == YxCache.PLATFORM_MY){
         my.setStorage({
           key:key,
           data:data
         })
       }else{
         yxlogger.error(tag, 'setStorage', '没有找到平台')
       }
     }catch(err) {
       yxlogger.error(tag, 'setStorage', err.name + err.message)
       //throw new YxLogger.except(tag, 'setStorage', err.name, err.message)
     }
  },
  
  /**
   *    同步存储数据
   * @param key
   * @param data
   */
  setStorageSync:(key,data)=>{
    try{
      if(YxCache.platform == YxCache.PLATFORM_WX){
        wx.setStorageSync({
          key:key,
          data:data
        })
      }else if(YxCache.platform == YxCache.PLATFORM_TT){
        tt.setStorageSync({
          key:key,
          data:data
        })
      }else if(YxCache.platform == YxCache.PLATFORM_MY){
        my.setStorageSync({
          key:key,
          data:data
        })
      }else{
        yxlogger.error(tag, 'setStorageSync', '没有找到平台')
      }
    }catch(err) {
      yxlogger.error(tag, 'setStorageSync', err.name + err.message)
      //throw new YxLogger.except(tag, 'setStorageSync', err.name, err.message)
    }
  },
  
  
  getStorageInfo:()=>{
  
  },
  
  getStorageInfoSync:()=>{
  
  },
  
  removeStorage:()=>{
  
  },
  
  removeStorageSync:()=>{
  
  },
  
  /**
   *    保存缓存数据
   * @param key : json数组，包含了action, param
   *
   * @param data
   */
  setInterfaceCache:(keys, data)=>{
     try{
        var enKey = encodeURIComponent(JSON.stringify(key))
        YxCache.setStorage(enKey,{
          time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          data:data
        })
     }catch(err){
     
     }
  },
  /**
   *    获取接口的缓存
   *  1. 判断接口是否是缓存接口，是否包含了字符 "_cache_"
   *  2. 获取keys对应的缓存值
   *  3. 获取缓存时间，没有设置默认五分钟
   *  4. 如果设置了缓存时间，需要判断缓存时间+存取时间是否大于当前时间
   *     大于了返回空字符串，否则返回缓存对象
   *
   * @param keys：
   *    action:
   *    param:
   * @returns {string}
   */
  getInterfaceCache:(keys) =>{
    try{
  
      //是否是缓存接口
      var action = keys.action
      if(action.indexOf(YxCache.CACHE_NAME) == -1) {
        return ""
      }
  
      var key = encodeURIComponent(JSON.stringify(keys))
      var valueJson = YxCache.getStorageSync(key)
      if(valueJson !== undefined || valueJson != '' || valueJson != null)
      {//是否有该缓存的值
        return ""
      }
      
      //key判断
      var cacheTime = 5
      if(action.indexOf(YxCache.CACHE_TIME) != -1) {
        cacheTime = action.split(YxCache.CACHE_TIME)[1]
      }
      
      //比较缓存数据内的时间+缓存时间是否大于了当前时间
      var flag = dayjs().isBefore(dayjs(valueJson.time).add(cacheTime,'minute'))
      if(flag){
        return ""
      }else{
        return valueJson.data
      }
    }catch (err){
      yxlogger.error(tag, 'getInterfaceCache', "keys:" + JSON.stringify(keys)  + "=>"+ err.name + err.message)
      return ""
    }
  },
  
  
  
}


export default YxCache