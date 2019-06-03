/**
 *   调用之前必须先调用init 接口 setHeaderToken接口以及setUrl接口
 */

import YxLogger from "yx-logger";

var FLY_MY = require("flyio/dist/npm/ap")
var FLY = require("flyio/dist/npm/wx")
var FLY_WEEX = require("flyio/dist/npm/weex")
var TAG = 'YxFly'


var YxFly = {
  
  fly:null,
  
  platform:'wx', //日志输出平台
  PLATFORM_WX:'wx', //微信
  PLATFORM_TT:'tt', //头条
  PLATFORM_MY:'my', //蚂蚁
  PLATFORM_WEEX:'weex', //week
  PLATFORM_SWAN:'swan', //百度只能小程序
  
  METHOD_POST: 'post',
  METHOD_GET:'get',
  METHOD_DELETE:'delete',
  METHOD_PUT:'put',
  METHOD_PATCH:'patch',
  
  init:(platform)=>{
     if(YxFly.fly == null){
       if(platform == YxFly.PLATFORM_MY){
         YxFly.fly = new FLY_MY()
       }else if(platform == YxFly.PLATFORM_WEEX){
         YxFly.fly = new FLY_WEEX()
       }else{
         YxFly.fly = new FLY()
       }
     }
  },
  
  /**
   *    设置全局token
   * @param token
   */
  setHeaderToken:(token)=>{
    YxFly.fly.config.headers = {
      'Content-Type': 'application/json',
      'token':token
    }
  },
  
  /** 设置全局请求的url **/
  setUrl:(url)=>{
    YxFly.config.baseURL = url
  },
  /**
   *    网络请求接口
   * @param method： post, get, put,delete,
   * @param action: 接口动作
   * @param param： 加快参数
   * @returns {Promise<any>}
   */
  netReq:(method, action, param)=>{
    return new Promise((resolve,reject) =>{
      YxFly.fly.request(
        action,
        param,
        {method:method})
      .then((res)=>{
        try{
          if (YxFly.platform === 'my') { //蚂蚁小程序
            resolve(JSON.parse(res.data))
          } else { //微信小程序、头条小程序、百度小程序
            resolve(res.data)
          }
        }catch (err){
          YxLogger.error(TAG, 'netReq', err.name, err.message)
        }
      }).catch((err)=>{
        var errInfo = {returnCode:'10000',returnMsg:'请求错误',desc:''}
        if(err.status == 0){//网络请求失败
          errInfo.returnCode = '10001'
          errInfo.returnMsg = "网络异常，请检查网络并重新请求"
        }else if(err.status == 1){//服务器超时
          errInfo.returnCode = '10002'
          errInfo.returnMsg = "服务器请求超时，请联系管理员"
        }else if(err.status == 500){//自定义错误
          errInfo.returnCode = err.response.data.returnCode
          errInfo.returnMsg = err.response.data.returnMsg
          errInfo.desc = err.response.data.desc
        }else{//业务处理错误
          errInfo.returnCode = '10003'
          errInfo.returnMsg = '业务请求错误'
          errInfo.desc = JSON.stringify(err.response.data)
        }
        reject(errInfo)
      })
    })
  }
  
}

export default YxFly