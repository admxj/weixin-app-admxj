var mta = require('utils/mta_analysis.js')

App({
  onLaunch: function (options) {
    //示例代码
    mta.App.init({
      "appID": "500697853",
      "eventID": "500697855", // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
      "lauchOpts": options, //渠道分析,需在onLaunch方法传入options,如onLaunch:function(options){...}
      "autoReport": true,
      "statParam": true,
      "ignoreParams": [],
      "statPullDownFresh": true, // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "statShareApp": true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "statReachBottom": true // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
    });

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})