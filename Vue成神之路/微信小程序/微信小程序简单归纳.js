/**
 * appID : wxd01f5ac5922a9a67
 * 文档: https://developers.weixin.qq.com/miniprogram/dev/framework/    
 *  
 * 建项目 ￣￣￣￣↓
 *               app.json **(指南/起步/小程序代码构成/json配置)** ￣￣￣￣↓
 *                  |                                                   pages文件夹/建page
 *                  |
 *                  |{    
 *                     "pages": [
 *                       "pages/index/index",
 *                       "pages/logs/logs"
 *                     ],
 *                     "window": {
 *                        **(框架/页面配置)**
 *                       "backgroundTextStyle": "light",      
 *                       "navigationBarBackgroundColor": "#fff",
 *                                                  |________________→ → →页面设置不同颜色, 在自己的json文件内加{ "navigationBarBackgroundColor": "#8ed145" }
 *                       "navigationBarTitleText": "WeChat",
 *                       "navigationBarTextStyle": "black"
 *                     },
 *                     "sitemapLocation": "sitemap.json",
 *                   **(框架/全局配置)**   ---   ***tabBar(框架/小程序配置/全局配置/tabBar)  -配置position和list  -设置tabBar后相应路由要wx.switchTab来切换***
 *                                              ***那些page在tabBar的配置里设置了就并排显示，由于index没有配置，而且在app.json的"pages"排第一，所以最先出现且没有下导航***
 *                   }
 *  
 * -------------------------------------------------------------------------------------------------
 * 
 *    模板的使用 (框架/WXML语法参考/模板，引入)  --- 新建page--删js和json文件--app.json里取消相应的page导入
 *          模板html:
 *              <template name="msgItem"></template>包裹
 *          Page使用模板:
 *              <import src="/item.wxml"/>
 *              <template is="item" data="{{...item}}"/> 
 * 
 *          ***=================== =====***
 *             html导入模板：
 *                 <import src="/pages/listTemplate/listTemplate.wxss"/>
 *             css导入模板：
 *                 @import '/pages/template/template.wxss';
 *             js导入数据：
 *                 const datas = require('../../datas/list-data.js')
 *          ***==================== ====***
 * 
 * -------------------------------------------------------------------------------------------------
 *    事件 (指南/小程序框架/事件系统)
 *              <view catchtap="handleTap1"></view> --- catchtap：不冒泡的点击事件
 *              <view bindtap="handleTap1"></view>  --- bindtap： 冒泡的点击事件
 *              (回调写在js里和data同级)
 * 
 *    ***========================***
 *    传参问题:
 *             事件传参 data-xxx="yyy"          <view data-hi="WeChat" catchtap="tapName"> Click me! </view>
 *             回调通过 event 接收参数          tapName(event){const index = event.currentTarget.dataset.index}
 *             
 *             路由跳转 传参                    wx.navigateTo({ url: '/pages/detail/detail?index=' + index })
 *             page接收路由参数                 onLoad: function (options) {} 的 options为 接收对象
 *    ***========================***
 * 
 * -------------------------------------------------------------------------------------------------
 *    路由跳转 (api/路由)                   | 这种写法是导入index里所有名为index的文件(整个page)
 *              wx.navigateTo({ url: '/pages/index/index' }) --- 能返回
 *              wx.redirectTo({})                            --- 不能返回
 *              wx.switchTab({})                             --- 跳转TabBar页面使用
 * 
 * -------------------------------------------------------------------------------------------------
 *    swiper轮播 (组件/视图容器/swiper)
 *              <swiper>
 *                <swiper-item>
 *                  <image src="/images/01.jpg"></image>
 *                </swiper-item>
 *                <swiper-item>
 *                  <image src="/images/02.jpg"></image>
 *                </swiper-item>
 *              </swiper>
 *      
 *          事件: bindchange --- 图片切换的时候触发,(event.mp.detail.current拿当前图片的index)
 * 
 * -------------------------------------------------------------------------------------------------
 * 
 *    保存数据的方法:
 *    
 *    Storage(API/数据缓存)  --- 永久保存
 *          wx.setStorage(Object object)
 *          wx.getStorageSync(string key)      同步，能立刻拿到，直接可以用
 *          
 *          wx.getStorage(Object object)       异步，会导致没法立刻拿到，不能立刻打印
 * 
 * 
 *    app获取数据(框架/框架接口/小程序App)  --- 运行时全局保存
 *          var appData = getApp()                              获取app data
 *          appData.data.isPlayMusic = this.data.isPlay         设置app data
 * 
 * -------------------------------------------------------------------------------------------------
 * 
 * getUserInfo获取用户信息 (api/开放接口/用户信息):
 * 
 *      在首页加载完onLoad之后 (页面加载完后 ***检测缓存是否登录过，只会运行一次***，之后用户登录已经不关这里事):
 *          wx.getUserInfo({
 *            success:(res) => { console.log(res.rawData/res.userInfo) }     ---    获取到用户信息
 *            fail:(err) => { console.log(err.errMsg) }         ---    打印错误
 *          })
 * 
 *      button获取用户信息 (组件/表单组件/button)
 *          <button class="userLogin" open-type="getUserInfo" bindgetuserinfo="userLogin">用户登录</button>
 *                     | open-type="getUserInfo"      ---   点击打开---获取用户信息     // "share" 点击打开 --- 分享
 *                     | ***bindgetuserinfo="userLogin"  ---   确认取消获取到用户信息触发的回调函数***
 *                                                                              | userLogin(success){if(success.mp.detail.rawData/userInfo){}}
 *                                                                              | 无论是确认还是取消都会返回差不多的success对象, 判断success.mp.detail.rawData/userInfo是否存在来判断是否确认登录     
 * 
 * 
 * -------------------------------------------------------------------------------------------------
 *    提示框(api/界面/交互)    wx.showToast(Object object)
 *    操作菜单(api/界面/交互)  wx.showActionSheet
 *       | 从下面弹出的一行行的菜单
 * 
 *    背景音乐(api/媒体/背景音频)
 *          wx.playBackgroundAudio(Object object)   开始
 *          wx.pauseBackgroundAudio(Object object)  暂停
 * 
 *          wx.onBackgroundAudioPlay(function callback)  监听音乐开始暂停 (后台播放为主，手机下拉下来那个播放暂停  ---  用于改变图标的开始暂停，配合appData来使用)
 *          wx.onBackgroundAudioPause(function callback) 
 * 
 *    修改标题(api/界面/导航栏)
 *          wx.setNavigationBarTitle( {title: 'xxxx'} )
 * 
 * 
 * -------------------------------------------------------------------------------------------------
 *    input (组件/表单组件/input)
 *          placeholder-class   ---   修改placeholder样式
 * 
 *      事件: bindconfirm       ---    按完成按钮 ***(小程序里event.mp.detail.value能拿input值，mpvue可以用v-model拿)***
 * 
 *          Vue官网: 原生组件的层级高于非原生组件
 * 
 * -------------------------------------------------------------
 * 
 *    发请求(api/网络/发送请求)
 *          wx.request(Object object)
 * 
 *        ***======= ================***
 *          mpvue封装 -- 发请求:
 *                request.js
 *                          import config from './config.js'
 *                          
 *                          export default function request(url, data = {}, method = 'GET') {
 *                            return new Promise((resolve, reject) => {
 *                              wx.request({
 *                                url: config.host + url,
 *                                data,
 *                                method,
 *                                success: (result) => {
 *                                  resolve(result.data)
 *                                },
 *                                fail: (err) => {
 *                                  reject(err)
 *                                },
 *                              });
 *                            })
 *                          }
 * 
 *                config.js
 *                          export default {
 *                            host: 'http://localhost:3000'
 *                          }
 *                微信开发者工具: 详情--本地设置--✔不校验合法域名、web-view（业务域名）、TLS版本以及HTPS证书
 *        ***======= =================***
 * 
 * -------------------------------------------------------------
 * 
 *    登录获取code码(指南、api/开放接口/登录)
 *          wx.login()  获取 临时登录凭证code ，并回传到开发者服务器
 * 
 * 
 *          
 * -------------------------------------------------------------------------------------------------
 * 
 * 
 * 
 * 
 * 
 * -------------------------------------------------------------------------------------------------
 * 
 * // ***修改数据使用this.setDate({ data:value }) 的方法*** (类似React)
 * // vx:for  vx:if  vx:key
 * 
 */

 // view--div   text--span css的page表示当前页面、1rpx = 1物理像素 = 0.5px/0.333px (取决dpr)
 // 没有数据代理,要this.data.xxx   wxd01f5ac5922a9a67
 // project.config.json和sitemap.json是重新引入项目的时候编辑器自己加的


 /**
  * 
  * // app.vue不加template, 组件样式不加scrope
  * mpvue:
  *     # 1. 先检查下 Node.js 是否安装成功
  *     $ node -v
  *     $ npm -v
  *     
  *     # 2. 由于众所周知的原因，可以考虑切换源为 taobao 源
  *     $ npm set registry https://registry.npm.taobao.org/
  *     
  *     # 3. 全局安装 vue-cli
  *     $ npm install --global vue-cli@2.9
  *     
  *     # 4. 创建一个基于 mpvue-quickstart 模板的新项目
  *     $ vue init mpvue/mpvue-quickstart my-project ( 不装vuex)
  *     
  *     # 5. 安装依赖，走你
  *     $ cd my-project
  *     $ npm install    // 下包
  *     $ npm run dev    // 打包成dist
  * 
  *     # 6. 项目在vscode打开
  *              |  npm start运行 (更新dist) , 微信开发者工具查看效果
  * 
  *     # 7. 使用stylus
  *              | npm install stylus stylus-loader
  *              | 注意使用vue时，样式写法没有scoped **| <style lang="stylus" rel="stylesheet/stylus"></style> |**
  * 
  * 
  *                       微信小程序的事件                    mpvue
  *  事件(bing换成@)           bindtap                       @click          
  *                           bindchange                    @change   --- swiper的切换事件
  * 
  * 接受路由参数      onLoad:function(**options**)         mounted() { console.log(**this.$mp.query.booklist**) }
  * 
  * 
  *     
  *     
  * 
  * ***每新增一个page都要在app.json里注册(写)***
  * app.json                                               路径没/根目录   例:pages/index/main      修改后都要重启yarn start更新dist   
  * page里面都有   index.vue     main.js---写法一致         有/根路径(路由使用最多)
  * App.vue       可设置page样式 width 100% height 100%
  * 
  * 
  * 
  */