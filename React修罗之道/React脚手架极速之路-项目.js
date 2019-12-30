/**
 *  **脚手架:**
 *      ● npm install -g create-react-app : 全局下载工具
 *      ● create-react-app react-admin :下载模板项目
 * 
 *      ● 写好index.js和App.jsx、引入reset.css (assets/less)
 *      
 *      ● 下包
 *            ▁react配置使用stylus
 *                      yarn add stylus stylus-loader
 * 
 *                      1. run eject(最好是刚安装好脚手架就运行，一旦里面任何文件发生修改，运行程序就会报错)
 *                                  报错解决办法：git add .  、  git commit -m "neirong"
 *                      2. 找到config文件下的webpack.config.js，搜索file-loader，在后面加上stylus
 *                                  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/,/\.styl$/,/\.less$/],
 *                      3. 然后再在oneOf的最后面加上
 *                                  {
 *                                     test: /\.styl$/,
 *                                     use: [
 *                                       require.resolve('style-loader'),
 *                                       require.resolve('css-loader'),
 *                                       require.resolve('stylus-loader')
 *                                     ]
 *                                  }
 *                      4. 运行报错没有xxx module，把包都删了，用npm install重下一遍
 * 
 *            ▁引入antd, 按需加载
 *                      yarn add antd
 *                      yarn add react-app-rewired customize-cra babel-plugin-import –dev
 *                      yarn add less less-loader
 * 
 *                      配置:
 *                            package.json
 *                                          "scripts": {
 *                                            "start": "react-app-rewired start",
 *                                            "build": "react-app-rewired build",
 *                                            "test": "react-app-rewired test"
 *                                          }
 *
 *                            根目录新建config-overrides.js
 *                                          const { override, fixBabelImports, addLessLoader } = require('customize-cra');
 *                                          
 *                                          // 按需配置css
 *                                          module.exports = override(
 *                                           fixBabelImports('import', {
 *                                             libraryName: 'antd',
 *                                             libraryDirectory: 'es',
 *                                             style: true,
 *                                           }),
 *                                            // 解析less（自定义是主题）
 *                                            addLessLoader({
 *                                              javascriptEnabled: true,
 *                                              modifyVars: { '@primary-color': '#abc123' },
 *                                            }),
 *                                          );
 * 
 *                      检测: App.jsx
 *                            import { Button } from 'antd'
 *                            render(){ return <div> <Button type="primary">按钮</Button> </div> }
 * 
 * 
 *            ▁引入路由
 *                      yarn add react-router-dom
 * 
 *                      配置: 
 *                          index.js
 *                                  import { BrowserRouter } from 'react-router-dom'
 *                                  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
 * 
 * 
 */

/**
 * 
 *  **脚手架的文件夹**
 *      react-admin
 *        | public文件就爱
 *                | index.html
 * 
 *        | src文件夹
 *                | assets文件夹        ---   公共css、img
 *                | components文件夹    ---   普通组件
 *                | pages文件夹         ---   路由组件
 *                        | home文件夹
 *                                | images文件夹
 *                                | index.jsx       *** // 引入路径写到文件夹(会自动引入index.jsx)**
 *                                | home.css
 *                | App.jsx
 *                | index.js
 * 
 *        | package.json      ---☆发送请求会遇到**跨域问题**，用代理服务器解决：
 *                                 代码先发到本地代理服务器3000，然后转发到服务器5000
 *                                 在package.json里面加"proxy": "http://localhost:5000"
 * 
 * 
 */


 /**
  * **Ant design**
  * antd使用过(https://ant.design/components/icon-cn/)
  * 
  * import { Button, Form, Icon, Layout } from 'antd';
  * 
  *                 使用                                                  其他
  *   Upload  ---  上传图片(具体看文件)
  *   Tree    ---  Tree树形控件                                 ---  defaultExpandA11 默认展开所有树节点(使用时要注释的配置)  --- // onExpand={this.onExpand}
  *                                                                                                                           // expandedkeys={this.state.expandedkeys}
  *                                                                                                                           // autoExpandParent={this.state.autoExpandParent}
  *   Form    ---  复制删改                                     ---  往下拉有this.props.form的方法(具体看上面的三部曲)
  * 
  *                                                                 ●设置Form里面Item的大小 (使用:  设置给Form/Form.Item ---  <Form {...formItemLayout}></Form>            )
  *                                                                                                                         <Form.Item {...formItemLayout}></Form.Item>
  *                                                                                                                         <Form.Item wrapperCol={{span: 5}}></Form.Item>
  *                                                                     const formItemLayout = {                            
  *                                                                       labelCol: {             // 设置Form.Item的大小
  *                                                                         xs: { span: 24 }, // 移动端(栅栏布局--分成了24份)
  *                                                                         sm: { span: 5 },  // 平板
  *                                                                       },
  *                                                                       wrapperCol: {           // 设置Form.Item里面元素的大小
  *                                                                         xs: { span: 24 },
  *                                                                         sm: { span: 12 },
  *                                                                       },
  *                                                                     };
  * 
  *   Layout  ---  复制删改                                     ---  defaultSelectedKeys默认选中的key
  *   Icon    ---  <Icon type="star" />
  *   Button  ---  <Button type="primary">Primary</Button>
  *   Message ---  复制                                         ---  全局提示
  *   Select  ---  复制                                         ---  选择器(下拉框等)
  *   级联选择 ---  /                                           ---   一层一层的选    ---  onchang删了，使用loadData就可以了
  *   Modal   ---  复制删改                                     ---  对话框(确认取消)(弹窗填数据)
  *                                                                       <Modal title="添加分类”
  *                                                                           visible={isshowAddcategory}
  *                                                                           onok={this.addcategory}
  *                                                                           oncancel={this.toggleDisplay}
  *                                                                           okText="确认"
  *                                                                           cancelText="取消”
  *                                                                           width={300}                   // 加width属性修改大小
  *                                                                       />
  *   
  * 
  *   Pagination --- 复制删改                                   ---  API:   showSizeChanger     是否可以改变 pageSize     true/ false
  *                                                                        pageSizeOptions     每页多少条                [10, 20, 30, 40]
  *                                                                        defaultPageSize     默认的每页条数             10
  *                                                                        showQuickJumper     快速跳转至某页             true/false
  *                                                                        total               设置数据总量               number                    ***用在后台分页***
  *                                                                        onChange            页码改变的回调             function(page, pageSize)  ***用在后台分页***                
  *                                                                        onShowSizeChange    一页显示数量改变的回调      function(page, pageSize)  ***用在后台分页***                
  *   Table   ---  复制删改                                     ---  (选带边框的) **最后的api里面有pagination这个属性，分页**
  * 
  * render(){
  *   // 表头内容
  *   const columns = [
  *             {
  *               title: 'Name',
  *               dataIndex: **'dataName'**,  // 名字要对应上才会显示，尤其data数动态的,像显示就必须dataName对上
  *               className: 'col',           // (可不加, 改样式的)
  *               // ***改变列显示***
  *                 ***text是当前行的对象[使用的时候需要把dataIndex注释掉,不然获取的是dataName的值]***
  *               render: text => { return <a href="javascript:;">{text}</a> },
  *             },
  *             {...}，{...}
  *         ]
  * 
  *   // 数据
  *   const data = [
  *             {
  *               key: '1',
  *               **dataName**: 'John Brown',
  *               money: '￥300,000.00',
  *               address: 'New York No. 1 Lake Park',
  *             },{..}{..}
  *         ]
  * 
  *   return <Table
  *            columns={columns}
  *            dataSource={data}
  *            bordered
  * 
  *            pagination={{}}    ---    分页
  *            rowkey="_id"       ---    报错时加key
  *            loading="true"     ---    加载时转圈
  *          />
  * 
  * }
  * 
  * 
  * 
  * 
  *   项目打包：
  *         1）	npm run build或yarn build打包
  *         2）	通过命令serve -s build -p 3003 开启一个端口号为3003的服务器，打开build里的项目，默认打开index.html
  *         要在服务器运行的原因是:  webpack导入的script和css文件的路径都是网络路径/xxx/yyy，所以要用serve
  *         3）	解决跨域问题：1.放在服务器的public暴露文件夹下，直接url访问
  *                          2. 请求前都写绝对地址，通过定义const prefix = process.env.NODE_ENV === ‘development’ ？ ‘’ ： ‘http://localhost:5000’
  *         4）	process.env.NODE_ENV:运行yarn start 是development ，运行yarn build是production
  *         5）打包后可删除
  *               static/asset-mainifest.json       --PWA相关
  *                     /precache-mainfestxxxx.js
  *                     /service-worker.js
  *               css/xxxxxxxxx.css.map             --调试问题的
  * 
  */




/**
 * 
 * index.js：
 *        import React from 'react';
 *        import ReactDOM from 'react-dom';
 *        import { BrowserRouter as Router } from 'react-router-dom'
 *        
 *        import App from './App.jsx';
 *        import './assets/css/reset.css'
 *        
 *        ReactDOM.render(
 *          <Router>
 *            <App />
 *          </Router>,
 *          document.getElementById('root'));
 * 
 * 
 * App.jsx：
 *        import React from 'react';
 *        import { Route, Switch } from 'react-router-dom'
 *        
 *        import Login from './pages/login'
 *        import Admin from './pages/admin'
 *        import './App.less'
 *        
 *        export default function App() {
 *          return <div className="App">
 *            <Switch>
 *              <Route path="/login" component={Login} />
 *              <Route path="/" component={Admin} />
 *            </Switch>
 *          </div>
 *        }
 * 
 * 
 * index.html (PC端 和 移动端):
 *        <!DOCTYPE html>
 *        <html lang="en">
 *        <head>
 *          <meta charset="UTF-8">
 *          <link rel="shortcut icon" href="./favicon.ico" />
 *          <title>Title</title>
 *        </head>
 *        <body>
 *        <div id="root"></div>
 *        </body>
 *        </html>
 * 
 * 
 *        <!DOCTYPE html>
 *        <html lang="en">
 *        <head>
 *          <meta charset="UTF-8">
 *          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
 *          <link rel="shortcut icon" href="./favicon.ico" />
 *          <title>Title</title>
 *        </head>
 *        <body>
 *        <div id="root"></div>
 *        <script>
 *          (function () {
 *            var  styleN = document.createElement("style");
 *            var width = document.documentElement.clientWidth/10;
 *            styleN.innerHTML = 'html{font-size:'+width+'px!important}';
 *            document.head.appendChild(styleN);
 *          })();
 *        </script>
 *        </body>
 *        </html>
 * 
 */