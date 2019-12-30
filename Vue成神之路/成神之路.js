/**
 * 脚手架vue-cli:                 
 *    安装3.x: 
 *            npm uninstall vue-cli -g    卸载2.x
 *            npm install -g @vue/cli     安装3.x
 *            npm install -g @vue/cli-init     可拉取2.x(要使用2.x的话就拉)
 * 
 *            vue create hello-world      创建项目
 *          **yarn serve                  运行**
 * 
 * 
 *    安装2.x: npm install -g vue-cli                       安装2.x
 *             vue init webpack my-project (eslint ? Y)     创建项目
 *             yarn start                                   运行
 * 
 * 
 *        npm start 运行 ( 配置自动打开页面-config/index.js 、配置忽略enlint语法检测-eslintrc.js )
 *        npm run build 打包 
 *        serve -s dist 运行(打包后)
 * 
 *    注意:
 *        检测组件:加<h2>xxx</h2>，脱离子组件，运行看有没h2的内容
 *        data写法: data () { return xx}
 *        组件中的scope: 作用域，如果父子组件都没scope，父组件会用子组件的样式
 * 
 * 
 *    组件通信:
 *        | props  ▁▁▁▁  父子之间   props:['xx','yy']、props:{ xx:Object}、props:{xx:{type:Object,required:true}}
 *        | 自定义事件  ▁▁▁▁  子 --> 父
 *              | 在父组件: @addTodo="addTodo"
 *              | 在子组件：this.$emit("addTodo", data);
 * 
 *        | 插槽 slot  ▁▁▁▁  父 --> 子 (传递"标签数据")                    作用域插槽：[子 --> 父 父组件:<child><template slot-scope="props"> <p>{{props}}xxx</p> </template></child>  获取子组件传过来的属性，props接收] --- "https://www.jianshu.com/p/31674b727954"
 *              // 子组件放好插槽，父组件往插槽传递数据，然后显示             普通插槽： 子<slot>bb</slot> 父：导入子组件<Slot>aa</Slot>  最后：aa替换子的内容bb、且子组件只能有一个插槽、
 *              | 父组件:                                                  具名插槽：<div slot="xxx">把整个<slot name="xxx" />替换掉
 *                    | <Header title="你好">
 *                    |     <div slot="xxx"> 对应的标签结构</div>
 *                    |     <div slot="yyy"> 对应的标签结构</div>           **[全局组件--Vue.component('Header', Header)] , 'Header' --- 传入组件的名字  Header --- 使用时候的名字**
 *                    | </Header>
 * 
 *              | 子组件Header:
 *                    | <template>
 *                    |     <slot name="xxx" />
 *                    |     <p>{{title}}</p>
 *                    |     <slot name="yyy" />
 *                    | </template>
 * 
 *        | PubSub消息发布/订阅  ▁▁▁▁  任意组件间 (传递数据,调用回调函数、可以发送请求)
 *              | 父组件:
 *                    | mounted: { PubSub.subscribe("eventName",回调函数) 订阅
 *                    | beforeDestroy() { PubSub.unsubscribe(token) }     取消订阅(在实例对象销毁之前)
 * 
 *              | 子组件:
 *                    | methods: { PubSub.publish("eventName", data); } 发布
 * 
 *        | 事件总线$bus  ▁▁▁▁  任意组件间 (传递数据,调用回调函数、可以发送请求)
 *              | main文件实例化前,  Vue.prototype.$bus = new Vue()
 *              | 绑定事件: this.$bus.$on('eventName'，(data)=>{})
 *                触发事件: this.$bus.$emit('eventName'，data)
 *                移除事件: this.$off('eventName')
 * 
 *    Ajax发送请求:
 *        1) vue-resource使用.then.catch:
 *                在main.js | import vueResource from 'vue-resource' // 引入插件
 *                          | ue.use(vueResource)                    // 使用插件
 *                在发请求的组件 | this.$http.get('/url').then( (res) => { callback } , (err) => { // error callback } )
 *        2) axios使用anync、await:
 *                在发请求的组件 | import axios from 'axios'
 *                              | async mounted() { const result = await axios.get('/url', { params:{xx:yy} })
 *                              | async mounted() { const result = await axios.post('/url', {})
 *            注意：如果是封装的axios, 返回Promise对象 return axios[get/post]('/url', reqParam).then(res=> return res).catch() 
 *                  .then.catch里面即使写了return，还是会包裹一层promise，所以最终返回的都是promise对象，所以外面调用使用anync、await
 * 
 * 
 *    Mint UI的使用(设置按需加载css):
 *        1) 全局注册使用
 *                在main.js | import { Button } from 'mint-ui'
 *                          | Vue.component(Button.name, Button)
 *                在使用的组件 | <mt-button type="default">default</mt-button>
 *        2) 局部使用
 *                在使用的组件 | import { Toast } from 'mint-ui';
 *                            | 直接使用: Toast('Upload Complete')
 * 
 *        按需加载css：https://mint-ui.github.io/docs/#/zh-cn2/quickstart
 *            | 下包npm install babel-plugin-component -D
 *            | 设置.babelrc: "plugins": [["component", [   ***3.x删掉这个中括号***
 *                               {
 *                                 "libraryName": "mint-ui",
 *                                 "style": true
 *                               }
 *                             ]]]
 *    路由的使用:
 * 
 *        1) main.js: 
 *                import router from './router'  ------  import Vue from 'vue'
 *                new Vue({router})                      import VueRouter from 'vue-router'
 *                // 注册路由                             import routes from './routes.js'   
 *                                                                                                                               // 定义路由routes
 *                                                       Vue.use(VueRouter);                 // 使用路由器                ------  import About from '../pages/About.vue'
 *                                                                                                                               import Home from '../pages/Home.vue'
 *                                                       export default new VueRouter({      // 实例化路由器
 *                                                           mode: 'history',    // 去除地址中的 #/  (在创建VueRouter实例时)        export default [
 *                                                           routes                                                                   {      
 *                                                       })                                                                               path: '/about',
 *                                                                                                                                        redirect: '/about' // 重定向
 *                                                                                                                                        meta: {            // ***路由元信息meta, 如果没有在对应url路径停留(重定向), meta不会设置上***
 *                                                                                                                                           aaaa: true
 *                                                                                                                                        }
 *                                                                                                                                    },
 *                                                                                                                                    {
 *                                                                                                                                        path: '/home/message',
 *                                                                                                                                        component: Message,// 使用组件Message
 *                                                                                                                                        children: []       // 嵌套(二级路由)
 *                                                                                                                                    }
 *                                                                                                                                 ]
 *      2) 要使用的组件:
 *                | 把新组建定义好
 *                | <router-link to="/about">about</router-link>  // 路由链接 (改url) (会被解析成a标签, to解析成href) ***属性可加replace，不添加到历史记录***
 *                | <router-view ></router-view>                  // 路由视图 (组件展示的位置)
 *                | 写路由(routes)-url变化匹配的组件
 * 
 *      3) **路由传参**
 *                | <router-link :to="{path:'/items', query:{categoryId:'1'}}" >  // 匹配到items这个路径会自动加上查询字符串，   变成'/items?categoryId=1
 *                                                    params                      // this.$route.query/params拿   -- query类似get、params类似post -- params传递参数，需要使用name进行路由跳转，否则无法传递。
 * 
 *      注意: <keep-alive></keep-alive>缓存组件、不适用实时页面
 *            
 *            类似React的路由三大属性:
 *            $router访问路由器对象【编程式更改url】、$route访问当前路由
 *              | push                                | fullpath  完整路径
 *              | replace                             | path      完整路径(用这个)
 *              | back()                              | ?xxx      拿参数params
 *                                                    | meta      routes里设置给$route
 * 
 *                  ($router有push、replace、back方法 【编程式更改url】、类似this.history.push、thishistory.replace)
 *                  ($route能拿 fullpath全部路径 和 path最后的路径 , 请求参数也能拿 , ★meta+v-show特定组件显示的时候-控制某个组件显示影藏)
 */

/**
  * Vue成神之路:
  * 
  * <div id="app">
  *     <div>   // 表达式两种使用
  *         {{msg}} 
  *         {{msg.toUpperCase()}}
  *     </div>
  * 
  *     <transition name="fade">
  *         <p v-show="isOk" ref="flag"  v-upper-text="msg">这是P</p>
  *     <transition>
  * 
  *      // 指令:                                                 | checkbox多选中,v-model为true就是选中,也可为['xx','yy']选中xx和yy
  *         v-model    ---   表单     --- 获取表单值(实时)  ---  <input type="text" v-model="msg"> v-model是输入框的值 / 下拉框选中, V-model在select标签，而不是option
  *         v-bind     ---   url、key --- 在标签属性加      ---  简写: :href :key :class :style :value(下拉框的值用id)
  *         v-on       ---   事件     --- 加事件            ---  简写: @click="show" ( 在methods定义show ) | 可传参:@click="show1(**$event**, 'xxx')"  --- event.target拿当前节点 
  *         v-if       ---   去掉DOM  --- 控制显示内容                                                      装饰符:@click.prevent="xxx"  禁默认行为
  *         v-else-if  ---            --- 控制显示内容                                                            @click.stop="xxx"     禁冒泡
  *         v-else     ---            --- 控制显示内容                                                            @keyup.enter="xxx"    键盘事件回车
  *         v-show     ---   display  --- 控制显示内容      ---  ***[ v-if和v-show的区别 ]  v-if直接从代码中删除了，v-show只是通过display来切换状态--display: none 和 display: ''***
  *                                                                                  ***因此建议频繁切换的话用v-show比较好、v-if适合页面不大可能改变的、元素内有异步请求数据的(但还没请求回来，能防止报错)***
  * 
  * 
  *         v-for      ---   数组、对象--- 控制显示内容(遍历生成) ---  <li v-for="(per, index) in Persons" :key="per.id"> / <li v-for="(value, key, index) in Object">
  * 
  *         v-text     ---            --- 不解析
  *         v-html     ---            --- 向html标签中插入并解析 数据为标签的'<a></a>'
  *         ref        ---            --- 访问元素对象          --- html设置ref="flag",获取:this.$refs.flag.xxx --- **能够通过ref调用子组件的方法**
  *              
  * </div>
  * 
  * 
  * 
  * <script type="text/javascript">
  *     // Vue.filter('formatDate1', (value, option)=>{return})配合管道使用 --- 过滤器
  *            | formatDate1:  过滤器名字
  *            | value:        管道的输入数据
  *            | option:       传参
  * 
  *     // Vue.directive('upper-text', function (el, binding) {}          --- 全局指令-自定义
  *            | el:            理解为使用该指令的DOM元素
  *            | binding:       像是指向    v-自定义属性=“data”    这个html的代码, 抽取成一个对象而已，里面有value指向data
  *            | example:       el.innerText = binding.value.toUpperCase();
  * 
  *     const vm = new Vue({
  *         props:['']
  *         ***props和state重名***
  *         ***props的值会第一时间覆盖state的值，但如果页面加载完mounted等有修改state的值，最终 会使用修改后的值***
  *         
  *         el: '#app',     // 入口(选择器)
  * 
  *         data: {},       // 数据(属性)  -- 脚手架里面是data(){ return {} }    ***设置改变data和props: this.xxx = yy***
  * 
  *         methods: {      // 事件-this.$destroy() // 删除vm
  *             handleClick(){
  *               this.xxx = '' 
  *             }
  *         },   
  * 
  *         computed: {     // 计算属性(变化而变化、方法get/对象getset) | 不能传参
  *             fullName(){}
  *             fullName2: {
  *               get(){};
  *               set(val){}  ---  两种使用方式1、用在input里, 修改时触发，   2、在点击事件里面 this.fullName2 = xxx
  *                 | val --- 表单的value 
  *             } 
  *         }
  * 
  *         beforeCreate(){}    created(){}   // 八个生命周期(beforeDestroy(){ 一般用来删定时器 })
  *         beforeMount(){}     mounted(){}                 (mounted(){ 一般用来发请求 })
  *         beforeUpdate(){}    updated(){} 
  *         beforeDestroy(){}   destroyed(){}
  * 
  *         directives: {                     // 内部的自定义指令(只能用自己的data)(当前vm)(注意下面的写法 '')
  *              'lower-text'(el, binding){ 
  *                  el.innerText = binding.value.toLowerCase();
  *              }
  *          } 
  *           
  * 
  *         watch: { dataName(val){} }            // 局部监视(监视xx改变就做一些操作)
  *           | val就是最新的dataName                     | 另外一种写法:todos:{ deep: true,handler: function(val) {} }
  * 
  *     })
  *     
  *     vm.$watch( 'name', fn )               // 全局监视,监听属性name变化,val:实时name
  * </script>
  * 
  * 
  * <style type="text/css">
  * 
  *   Vue的过渡---结合<transition name="fade">使用  ( 开始结束状态默认是初始状态 )
  *         .fade-enter{}           .fade-leave{}     // 开始时状态-出现/消失
  *         .fade-enter-active{}                      // 过程设置transition: xx xs / animation: xx xs;
  *         .fade-enter-to{}                          // 结束时状态       
  *   
  * </style>
  * 
  */




/**
 * 修改代码模板:
 *      !! 初始代码
 * 
 * 修改配置:
 *      文件路径显示绝对路径
 *      设置中Mouse Wheel Zoom设置放大缩小
 *      自动保存
 *      Auto Reveal 关闭自动打开文件目录
 * 
 * 修改了快捷键:
 *      整理代码: Ctrl + shift + l
 *      代码提示: Alt + /
 *      复制一行: Ctrl + d
 *      块注释:Ctrl + shift + /
 *      影藏左边的内容 Alt + 1
 *      选中相同文字 Ctrl + j
 * 
 * 插件:
 *      Alt + B启动:   Open in Browser
 *      右键启动:      View in Browser
 *                    debugger from chrome
 *      文件夹图标:    VScode icons(文件-首选项-文件图标)
 *      Vue提示、ES6提示
 * 
 * 浏览器插件:
 *      Vue Devtools
 * 
 *      // 以下为stylus配置
 *       "stylusSupremacy.insertColons": true, 
 *       "stylusSupremacy.insertSemicolons": false, 
 *       "stylusSupremacy.insertBraces": false, 
 *       "stylusSupremacy.insertNewLineAroundImports": false,
 *       "stylusSupremacy.insertNewLineAroundBlocks": false 
 * 
 * 
 * 控制台:ctrl + ~
 */

/**
 * class改样式:
 *      :class="数据"             // 也可以运用成[数组][0]的方式来动态设置样式
 *      :class="{on:true/false}"  // 是否使用on这个属性 
 *      :class="[classA, classB]" // 计算属性修改classA、classB为类名
 * 
 * style改样式:***小驼峰命名***
 *      :style="{fontSize:size+'px'}"
 *      :style="[styleFont, styleColor]" --- tyleFont:{fontSize: '16px'}
 * 
 */

