/**
 * 快速迭代脚手架vue-cli: (3.x移动css/reset.css和html到public文件夹)
 *       2.x ▁  3.x ● 
 * 
 *      ▁ 配置自动打开页面 (./config/index.js的autoOpenBrowser)
 *      ● 配置exlintrc检测 (eslintrc.js的rules    package.jon的rules加)
 * 
 * 
 *      ● HTML --- ①meta适配 ②引样式重置**css是url的路径，不是./** ✘✘删 ③解决移动端0.3s点击延迟, fastclick库 
 * 
 * 
 *      ● 建文件夹( api、router路由器、store状态管理、common混合、components、pages路由组件、filter过滤器、mock模拟后台数据)
 *      ● 下包
 *          stylus              ---   yarn add stylus stylus-loader -D
 *          路由、ajax           ---   yarn add vue-router axios
 *          表单验证vee-validate ---    yarn add vee-validate
 *          vuex、swiper、dayjs  ---   yarn add vuex swiper dayjs better-scroll vue-lazyload
 *          Mint UI(按需加载)    ---    yarn add mint-ui -S   **  yarn add babel-plugin-component -D
 * 
 * 
 *      ● 模板api (根据代理配置prefix)
 *      ● 模板路由, main.js引入
 *      ● 模板Vuex, main.js引入
 *      ● 模板vee-validate, main.js引入运行
 * 
 * 
 *      ● 配置代理(手动) ===2.x上  3.x下===
 *        ===config/index.js===                                                  
 *         proxyTable: {
 *            proxy:{
 *              '/api': {  // 以api开头的路径
 *                   target: 'http://localhost:5000',  // 目标服务器
 *                   changeOrigin: true, // 支持跨域
 *                   pathRewrite: {
 *                   '^/api': '' // 删除/api
 *                  }
 *               }
 *            }
 *         }, 
 *        ===config/index.js===
 *        const prefix = process.env.NODE_ENV === "development" ? "/api" : "http://localhost:5000"
 * 
 * 
 *        *** 新建vue.config.js***
 *          module.exports = {                                // 向外暴露一个webpack配置对象        https://cli.vuejs.org/zh/guide/webpack.html
 *            configureWebpack: {
 *              resolve: {                                    // 使用vue.esm.js                   这个配置从2.x的build/webpack.base.conf拿
 *                extensions: ['.js', '.vue', '.json'],
 *                alias: {
 *                  'vue$': 'vue/dist/vue.esm.js',
 *                }
 *              },
 *              devServer: {                                  // 代理和自动打开网页                  https://cli.vuejs.org/zh/config/#devserver-proxy               // 如果没有打开服务器，会报错Proxy error: Could not proxy request /robots.txt?1564708753604 from localhost:8080 to http://localhost:5000/.
 *                proxy: 'http://localhost:5000',
 *                open: true // 也可以在package.json的scripts命令后加 --open自动打开网页
 *              }
 *            }
 *          }
 *        
 * 
 *        *** config/index.js***
 *        const prefix = process.env.NODE_ENV === "development" ? "/api" : "http://localhost:5000"
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------
 * 
 * swiper轮播图: 
 * 
 *  import Swiper from "swiper";  // 导入Swiper
 *  import 'swiper/dist/css/swiper.css'
 * 
 *  var mySwiper = new Swiper(".swiper-container", {  // 实例化的方式使用(必须页面加载完成之后创建实例对象、watch不能使用时因为watch里的代码是同步的，而发请求更新数据刷新页面是异步的)
 *     loop: true, // 循环模式选项                              | 配合**vm.$nextTick(callback)使用** --- 在下次 DOM 更新循环结束之后执行延迟回调。                        
 *     pagination: {                                                    | watch+vm.$nextTick(callback)                                                
 *       el: ".swiper-pagination"                                       | this.$store.dispatch('actions',() => {vm.$nextTick(callback)} )             
 *     }                                                                | await this.$store.dispatch('actions') 后, 再写 this.$nextTick(callback)         
 *   });                                                        ***this就是vm，vm就是this，vue很多时候要灌输这种思想，用起来的时候注意点***
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 
 * vee-validate表单验证:
 *      **https://blog.csdn.net/boy599237255/article/details/78793471 validate.js设置**
 *      **https://codesandbox.io/s/y3504yr0l1?initialpath=%2F%23%2Fform&module=%2Fsrc%2Fcomponents%2FForm.vue  组件html写法**
 *      // const success = await this.$validator.validateAll()             // 对所有表单项进行验证
 *      // const success = await this.$validator.validateAll(['xx','yy'])  // 对指定的所有表单项进行验证(数组里填input的name属性)
 * 
 * validate.js:(根目录新建)
 *      import Vue from 'vue'
 *      import VeeValidate, { Validator } from 'vee-validate'
 *      import zh_CN from 'vee-validate/dist/locale/zh_CN'
 *      
 *      Vue.use(VeeValidate);
 *      
 *      // vee-validate提示语汉化（使用中文、设置提示的名字）
 *      Validator.localize('zh_CN', {
 *        messages: zh_CN.messages,
 *        attributes: {
 *          phone: "手机号",  // 这里的东西都是input的**name**属性的值，组件html里的也是用的name的值，拿表单的值这些操作插件封装了
 *          code: "验证码",   // 和提示文字相关
 *          name: "账号",
 *          pwd: "密码",
 *          captcha: "图形验证码"
 *        }
 *      });
 *      
 *      // 验证方法扩展 ( 根据正则提示 )
 *      Validator.extend('phone', {
 *        getMessage: (field) => `请输入正确的` + field,
 *        validate: (value) =>{
 *            const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
 *            return reg.test(value) 
 *        }  
 *      });
 *      
 *      Validator.extend('pwd', {
 *        getMessage: (field) => `请输入合法的` + field, // field -- attributes设置的名
 *        validate: (value) =>{                         // value -- 表单的值
 *            const reg = /^\w{4,12}/;
 *            return reg.test(value) 
 *        }  
 *      });
 * 
 * main.js:
 *      import "validate.js";
 * 
 * 组件内使用: 
 *       <input type="text" placeholder="请输入手机号" v-model="phone" name="phone" v-validate="'required|phone'">       // 加v-validate和name属性
 *       <span style="color:red" v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span> // 加提示的span标签
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 
 * ***mock模拟后台数据(定义好数据-可随机产生http://mockjs.com/examples.html#)***
 *    Mock-server.js:  Mock.mock('/goods', {code: 0, data: data.goods})
 *                                | url            | 返回的数据
 *    定义相应的ajax请求配合使用:  export const reqGoods = () => ajax('/goods')
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 
 * // ***和swiper一样、都是要在页面加载完后实例化, 三种使用***
 * better-scroll滚动:
 *      // 引入better-scroll
 *      import BScroll from 'better-scroll'
 *      // 实例化创建滚动对象 
 *      const s1 = new BScroll(".menu-wrapper", { // css选择器、 ***取消better-scroll的禁止点击事件***
 *         click: true
 *         scrollX: true // ***水平滑动***
 *      });  
 * 
 *   事件:
 *      s1.on('scroll', {x, y})         --- 滚动进行, 拿坐标x和y, ***注意正负问题***
 *      s1.on('scrollEnd', {x, y})      --- 滚动结束, ***注意正负问题***
 *   方法:
 *      s1.refresh()                    --- 刷新滚动对象
 *      s1.scrollto(x, y, time)         --- 滚动到特定位置
 *      s1.scrollToElement((ele, time)  --- 滚动到特定元素
 *                           |
 *                          ele-可通过ref传节点或css选择器
 *      
 *      
 *    注意: 在计算属性里面new scroll实例对象可能导致每更新一次数据就创建一个对象, 这是应该考虑用单例模式
 * 
 *          单例模式也会带来一些问题(display:none后无法滚动): 
 *              滚动对象会保存此时html节点的css和js位置 然后加代码，但display：none之后会找不到，下次显示想滚动需要s1.refresh()刷新一下实例对象s1，
 *              如果是v-if把DOM删了，会导致找不到当时保存的html节点响应的css和js位置
 * 
 *    CSS样式: 左滑动    父容器: width: 100%; clearFix()
 *                      子容器：float left来使元素width由内容撑开
 * 
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 
 * vue-lazyload懒加载
 *      --有转圈圈的等待效果，然后图片需要才加载
 *      
 *      使用:
 *            yarn add vue-lazyload
 * 
 *     main.js:
 *            import VueLazyload from 'vue-lazyload'
 *            Vue.use(VueLazyload, { loading: 'dist/loading.gif' }  // loading图
 * 
 *     组件使用:
 *            <img v-lazy="img.src" >
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 整个登录流程
 *      1、完成基本样式         ----      (点击发送验证码倒计时、图片验证码点击刷新-ref修改img的src-原地址的基础上加上？time=Date.now() )
 *      2、配置表单验证         ----      (vee-validate )
 *      3、登录验证             ----      (const success = await this.$validator.validateAll(['xx','yy']), 没错就发送请求 )
 *      4、更新数据             ----      根据返回的数据确认是否需要更新vuex
 * 
 *      期间后台会用到cookie和session进行7天免登录，
 *            登录时发请求，服务器创建session保存提交过来的账号id，
 *                         服务器返回网页一个cookie(内容为session的id，有效期x天)，
 *            下次打开页面的时候立刻发请求判断是否登录过(自动携带cookie)，
 *                          服务器根据请求找到session，session找到账号id，去数据库找到账号，返回给前端，
 *            前端拿请求回来的用户数据更新vuex自动登录
 *            退出登录时发送请求，服务器会把session、账号id删了
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 
 * ***静态引入***:  import aaa from './xxx'             // 全部打包成一个js文件
 * ***动态引入***:  const xxx = () => import(./xxx)     // 分割打包, 按需加载  ---  在routes使用过一次
 *     | 动态路由
 * 
 * **Vue混合**(提取公共代码)
 *      mixin.js:
 *          export const mixin = {	// 分别暴露
 *          	  正常组件js部份
 *          }
 *      组件使用:
 *          <script>
 *          import {mixin} from './mixin.js'    // 分别暴露  用  解构赋值
 *          export default {
 *              mixins:[mixin]
 *          }
 * 
 * // 最终都是在组件的html里使用
 * // https://cn.vuejs.org/v2/guide/components-dynamic-async.html
 * **动态组件**:    **[Tag变换]**
 *      <keep-alive>
 *          <component :is="ComponentName"></component>   // ComponentName写成data，动态改变，组件就动态改变
 *      </keep-alive>
 * **异步组件**:    **[异步加载的组件]**
 *      Vue.component(
 *          'async-component1',                           // 异步组件名，在组件html使用
 *          () => import('./my-async-component')          // 引入自己写的需要异步加载的组件
 *      )
 * 
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * Vue.set(obj,'attrName',value)  // 设置响应式属性
 * 
 * 原生事件：在自己组件里html元素的事件
 * 自定义事件：<引入组件名  @click="xxx" /> 写在引入组件内没有修饰的所有事件    <引入组件名  @click.native="xxx" /> 加native -- 原生事件 -- 给组件的根元素加事件,其他元素如果点击会冒泡到根元素的点击事件
 * 
 * v-model的原理:
 *      父组件:
 *          <子组件 v-model="msg" />                              // 这两个是等效的
 *          <子组件 :value="msg" @input="msg=$event" />           // 这里的input是自定义事件，通过this.$emit('input',data)触发
 * 
 *      子组件:
 *          <input :value="value" @input="$emit(input，$event.target.value") />  // value是上边传过来的   触发input自定义事件,并通过$event把值传过去
 * 
 * 
 * 路由守卫:
 *    https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
 *    前置路由守卫: (拦下来看是都满足特定条件才允许进入路由url)
 *              全局守卫 // router的index.js：
 *  		            router.beforeEach((to, from, next) => {})
 *                     | to.path   --    to和$route极像, 可以调fullpath、path、meta、param等  (配合数组、看有无to.path来进行next()放行)
 *                     | next()    --    放行
 *                     | next('/login')
 *         
 *             局部守卫 // 组件内使用，和data、methods同级
 *                  beforeRouterEnter(to, from, next){}
 *                     | next( component => { if(component.$store.state.user.user._id){...} }) 
 *                         -- 首先局部守卫拿不到实例对象this，要用components代替，后面用到vuex的modules写法state.user.user
 *            
 * 
 *    后置守卫: 一般用在使用了<keep-alive></keep-alive>然后有这样一个需求:更换组件之后清除定时器
 * 
 */

 /**
  * 
  * **基础语法**(html里简写)
  *   html:
  *   <input class="inputText active" :class="searchText?'':'on'" />  // class
  *   <div style="color:red;fontSize:16px"></div>              // style
  * 
  *   <input v-model="stateData></input>                       // 使用状态数据-属性, ***[直接冒号--""---里面写]***
  *   <div>{{Data}}</div>                                      // 使用状态数据-内容, ***[双大括号--{{}}--里面写]***
  * 
  *   <div @click="handleClick(**$event**, 'xxx')"></div>      // 使用点击事件, 回调写在method里面
  * 
  * 
  *   js:
  *   this.xxx = yy                 // 设置data或props- ***数据代理***
  * 
  */