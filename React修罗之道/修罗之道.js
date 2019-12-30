// 高阶函数：1、变量是函数   2、返回是函数

// 高阶组件--本质是一个函数, 参数接收组件, 返回一个新组件, 
//  两个参的:
//        Form.create()(ComponentName)                    // 表单验证三部曲: 1、创建路由组件四大属性form
//        {getFieldDecorator( 'password', {rules:[]} )( <input type="password" onChange={this.handleChange('password')}/> )}
//        react-reudx的connect、用来合并创建action和dispatch通过属性传给要用的组件：export default connect((state) => ({num: state}),{ increment, decrement, incrementAsync, error })(Counter) // 这里是直接传,而不是组件的方式来传
// 

// |##1、谈谈虚拟DOM的diff算法
// *作用：减少重排重绘次数，最小化页面重排重绘
// *tree diff
// *只针对同级/同层节点进行比较。
// *如果父节点不一样，就直接移除父节点和所有子节点，替换成新的*问题：如果有跨层级的节点移动，性能较差。不建议开发者这样做
// *component diff
// *如果是相同类型的组件，在对里面的结构进行tree diff，
// *如果不同类型，就不进行比较，直接替换成新的
// *element diff
// *同一层级遍历的元秦添加一个唯一的key属性，发生位置变化时比较key来增删节点 
// 
// *总结：不建议往开头添加元素、尽量保持稳定DOM结构


/**
 * 普通组件： export default function App(){return <div> </div>} 不使用state和prop用工厂函数 ( 没有render(){})
 * 类组件: class Login extends Component{ render(){return xxx} }
 * 
 * 
 *                                                             ***1)props---父子组件通信***
 * // webStorm简写: imp                                         ***2)消息订阅---兄弟组件，祖孙组件***
 *                                                                    PubSub.subscribe('ADD_COMMENT', function(msg，data){ }); //订阅，注意大写，msg是'ADD_COMMENT'
 * import React,{Component} from 'react';                             PubSub.publish(' ADD_COMMENT ', data) //发布消息
 * import { publish, subscribe } from 'pubsub-js';    ------    ***3)redux***
 * import PropTypes from 'prop-types'; 
 * 
 * 
 *                                                                                                              | ***react-router-dom 路由传参[query--明文，state--密文]***
 *                                                                                                              | <Link to={{ pathname: ' /user' , query : { day: 'Friday' }}}>             // query可换state
 *                                                                                                              | this.props.history.push({ pathname : '/user' ,query : { day: 'Friday'} }) // query可换state
 *                                                                                                              | this.props.location.query.day                                             // query可换state
 *                                                                                                              | 
 *                                                                                                              | this.props.history.replace/push() 也能更改url路径(多用在回调函数中)
 * import { BrowserRouter, Link, NavLink, Route, Redirect, Switch, withRouter } from 'react-router-dom';  //  Link		      ---	改变url，不刷新页面（单页面）（a标签多页面）                        -- <Link to="/xxx">xxx</Link>
 *	                                                                                                          NavLink	      ---	改变url ***能改变选中样式：activeClassName="my-active"***         -- <NavLink to="/xxx" className="navItem" activeClassName="on" > **(样式给不上考虑是否是里面嵌套了标签，这个标签导致样式没有给上)**
 *	                                                                                                          Route	        --- 注册路由，根据路径改变component                                    -- <Route path="/xxx" component={yyy}/> (路径为"/"的放最后,不然会一直匹配上)
 *	                                                                                                          Redirect      --- 重定向（用于设置默认组件）                                          -- <Redirect to='/xxx'/>
 *	                                                                                                          Switch        --- 用来包住Route、 Redirect，值运行其中一个
 *                                                                                                            withRouter    --- 高阶组件，给非路由组件传递路由组件的三大属性                           -- export default withRouter(componentName)
 *                                                                                                            BrowserRouter --- index.js里 包裹<App />
 * import logo from './logo.png'      // 图片要引入才会打包                                                  
 * import './index.less'              // 引入自己的less                                                                           
 * 
 * 
 * class ComponentName extends Component{
 * 
 *    static propTypes = {                                          // ***接收属性***       --this.props.xxx读取属性 (不可修改)(string、func、object)
 *       xxx: PropTypes.bool.isRequired,                                                    
 *     };
 * 
 *    createRef = React.createRef()                                 // ***ref***          --1.创建creatRef 2.html加上 3.使用this.createRef.current ***[this.createRef.current.value能拿表单数据，e.target.value也能, 但e.target.value有限制条件,事件必须在input上才可以]***
 *                                                                                        --受控组件代替ref  state+onChange=handleChange()、用到e.target.value
 * 
 *    state={};                                                     // ***状态数据***       --this.state.xxx读取状态  --this.setState(xxx:yyy)修改状态
 *    
 * 
 *    handleChange = (option) => {                                  // ***事件***          --注意写法是 等于 一个回调函数 ，接受参数且要用event, 就用这种return的方法  
 *        return (e) => {
 *            this.setState({                                       // ***更新数据***       --异步
 *              [option]: e.target.value
 *            })
 *        }
 *    }
 * 
 *    
 *    constructor(){}             componentWillReceiveProps(){}     // ***生命周期*** ( componentDidMount-发请求、componentWillUnmount-删定时器、ajax请求)
 *    componentWillMount(){}      shouldComponentUpdate(){}                                                     | **1 // 卸载异步操作设置状态**
 *    componentDidMount(){}       componentWillUpdate(){}                                                       | componentWillUnmount(){    
 *                                componentDidUpdate(){}                                                        |     this.setState = (state, callback) => {
 *    componentWillUnmount(){}                                                                                  |         return;
 *                                                                                                              |     }
 *                                                                                                              | }
 *    
 * 
 * ***\\\\\\\\\\\\\\\\\\\\\表单验证套路代码\\\\\\\\\\\\\\\\\\\\\\\\\\\\***
 * 
 *   handleSubmit = (e) => {
 *      e.preventDefault();
 * 
 *      this.props.form.validateFields(async (errors, value) => { // 如果rules验证规则空着，这里会直接跳过不运行！！
 *        if(!errors) {
 *          const { username, password } = value;                 // 拿数据
 *          const result = await reqLogin(username, password);    // 发请求
*   
 *          if(result) {
 *            this.props.history.replace('/')
 *          }else {
 *            this.props.form.resetFields(['password']);          // 清空内容~
 *          }
 *        }else {
 *          console.log('表单校验失败' + errors)
 *        }
 *      })
 *    };
 * 
 *    
 *    validator = (rule, value, callback) => {
 *        // 增强复用性**rule是一个对象，存了getFieldDecorator里面的名字**
 *        const name = rule.fullfield === 'username' ? '用户名' : '密码'
 *  
 *       if(!value) {
 *         callback(`${name}必须输入`)
 *       }else if (!/^\w+$/.test(value)) {
 *         callback(`${name}只能包含字母、数字、下划线`)
 *       }else if (value.length < 4) {
 *         callback(`${name}最小长度4位`)
 *       }else if (value.length > 15) {
 *         callback(`${name}最大长度15位`)
 *       }else {
 *         callback()
 *       }
 *     };
 * ***\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\***
 * 
 * **======================  render()  ================================**
 * 
 *    render() { 
 *        **⒉** 
 *        const { getFieldDecorator } = this.props.form;
 * 
 * 
 *                ***Fragment不会生成DOM 节点, 仅有包裹作用***
 *        return <React.Fragment> 
 *  
 *            // ***基础语法***(没简写)[大括号包裹js代码]
 *            <div clssName="box1 on" style={{fontSize: '16px'}}></div>                                   // 设置class、style[小驼峰]
 *            <div clssName={this.state.xxx?'box1 on':'box1'} > {this.state.hellow} </React.Fragment>     // 使用状态数据-属性-内容{}括号里
 *            <div xxx=xxx yyy={...obj}></div>  // 传props
 *            <div xxx={this.abc}></div>        // props属性使用  -- this.abc
 *            <div ref={this.createRef}></div>  // ref使用
 * 
 *            ***路由的使用***
 *            // 一级路由   -------------------------------------------------------------   二级路由：
 *            <Link to="/login"></Link>
 * 
 *            <Switch>
 *                <Route path="/login" component={Login} />   --------------------------    在Login组件里面写 <Link to="/login/phone"/>
 *                <Redirect to="/home/messages"/>                                                            <Route path="/login/phone" component={Phone} />
 *            </Switch>                                                                                      <Redirect to="/login/phone" />  自动选中phone
 * 
 *            ***事件的使用***
 *            // 事件的使用
 *            <form onSubmit = { this.handleSubmit }>
 *                <input type="text" onChange={this.handleChange('userName')}/>>
 *                **⒊**
 *                {
 *                    getFieldDecorator( 
 *                        'password', {
 *                            initialValue: '0' ***1 // 设置组件默认值, 组件放到第二个参数后, 组件的默认选中属性会失效(删掉) 如:antd的 Slect组件 defaultvalue="0"、inputNumber的defaultValue***
 *                            rules:[{ validator: this.validator }]
 *                        } 
 *                    )( <input type="password" onChange={this.handleChange('password')}/> )
 *                }
 *            </form>
 * 
 *            ***图片的使用***
 *            // 图片必须引入才会打包
 *            <img src={logo} />
 * 
 *            ***动态遍历生成结构***
 *            {
 *              // 用map的原因, 生成一个数组，数组里面存的是虚拟DOM对象，数组放在这里会自动展开  **( 虚拟DOM对象 {$$typeof:Symbol(react.element),type:"div",key:"0",ref:null,props:{},.…})**
 *                  ★ 这里有一个比较特别的, 用forEach手动返回 不会生成虚拟DOM对象，会变成undefined
 *              // 记得写key, { 另一种方法: 遍历生成写在componentWillMount(){},并用this.xx保存起来,html直接{this.xx}使用 用于值初始化渲染一次的结构}
 *              this.state.arr===0?'':this.state.arr.map((item, index) => { return <div key={index}> item.keyname <React.Fragment> })  // **数据改变，结构增加/减少 ，但不会整个页面重新渲染，（因为有虚拟DOM算法）**
 *            }
 * 
 *            ***动态使用组件***
 *            {
 *              this.props.location.pathname === '/u/login'?'': <Nav />
 *            }
 *        </React.Fragment> 
 *    }
 * }
 * 
 * **⒈** 
 * export default Form.create()(ComponentName)                // **表单验证三部曲**: 1、创建路由组件四大属性form (import { Form } from 'antd';)
 *                                                                                  2、render(){}内拿出第四大属性里的getFieldDecorator    
 *                                                                                                 ***this.props.form的值***                         [https://ant.design/components/form-cn/]
 *                                                                                                 --const { getFieldDecorator } = this.props.form;  // 验证表单的
 *                                                                                                 --const { resetFields } = this.props.form         // 重置表单值 -- this.props.form.resetFields(['password'])
 * 
 *                                                                                  3、躁起来：{ getFieldDecorator( 'password', {rules:[]} )( <input type="password" onChange={this.handleChange('password')}/> ) }
 *                                                                                     第一个参数的    
 *                                                                                                    | password --- 响亮亮的名字
 *                                                                                                    | rules写法 --- { validator: this.validator }
 *            
 *                                                                                                                 // {required: true, message: '用户名必须输入'},
 *                                                                                                                 // {min: 4,message: '用户名最小长度4位'},
 *                                                                                                                 // {max: 15,message: '用户名最大长度15位'},
 *                                                                                                                 // {pattern: /^\w+$/, message: '用户名只能包含字母、数字、下划线'}
 *                                                                                                    | initialValue："0",  设置默认值，下拉框默认选中项<Option value="0">
 *            
 *                                                                                      第二个参数的
 *                                                                                                    | getFieldDecorator也是高阶就不说了, 第二个参数传 组件/input
 *
 *                                                           // **表单提交轻音乐**: 
 *                                                                                  提交事件里, this.props.form.validateFields((errors, value) => { 判断error、拿value、发请求、根据返回值更新数据状态 }
 *                                                                                                    | 用过getFieldDecorator的input的error和value都能拿到
 *                                                                                                    | 什么发请求的小儿科都在这里
 *                  
 *                                                                                  把子组件的form传给父组件(form其实就是子组件实例对象):
 *                                                                                    父组件:
 *                                                                                          传递: <子组件 wrappedComponentRef={(form) => **this.xxxForm** = form} />
 *                                                                                          使用: **this.xxxForm**.props.form
 * 
 */

  /**
   * 
   * // **webpack会在index.html加入打包好的js文件和css文件**
   * 
   * // React有一个fiber算法，将多次请求合并成一次来优化
   * // 移除DOM节点下的组件：ReactDOM.unmountComponentAtNode(document.getElementById('example'))
   * // 包 间接 引用会有波浪线, package.json的依赖手动加入就可以有提示且没有波浪线
   * // 在constructor里使用用props，构造方法里传形参props,   constructor( props ){ super(props); ....... }
   * // React 没有Vue的 keep-alive
   * 
   */