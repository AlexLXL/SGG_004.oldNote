## 1、状态提升
* 例子:将两个组件共用的状态数据提升到公共父组件中，父组件通过props方式传递给子组件使用，叫做状态提升（让两个组件共享同一份状态数据）

## 2、React.Fragment
* 作用：能作为多个虚拟DOM元素的根节点
* 优点：不会生成真实DOM元素

## 3、生命周期函数
### 3.1、理解
* 组件对象从创建到死亡它会经历特定的生命周期阶段
* React组件对象包含一系列的勾子函数(生命周期回调函数), 在生命周期特定时刻回调
* 我们在定义组件时, 可以重写特定的生命周期回调函数, 做特定的工作

### 3.2、生命周期流程图
* 基本生命周期图
![基本生命周期图](./doc/1.png)
<br>
<br>
* 完整生命周期图
![完整生命周期图](./doc/2.png)  
<br>
<br>
* 之前生命周期图（有些被废弃了）
![之前生命周期图（有些被废弃了）](./doc/3.png)

## 3.3、生命周期详述
* 组件的三个生命周期状态:
	* Mounting：创建时
	* Updating：更新时
	* Unmounting：卸载时
* 生命周期流程:
	* 第一次初始化渲染显示 --> `ReactDOM.render()`
      * `constructor()`
      * `static getDerivedStateFromProps(nextProps, prevState)`
      * `render()`
      * `componentDidMount()`
	* 组件内部更新state / 父组件更新state, 导致子组件被重新渲染
      * `static getDerivedStateFromProps(nextProps, prevState)`
      * `shouldComponentUpdate(nextProps, nextState)`
      * `render()`
      * `getSnapshotBeforeUpdate(prevProps, prevState)`
      * `componentDidUpdate()`
	* 移除组件 --> `ReactDOM.unmountComponentAtNode(containerDom)`
      * `componentWillUnmount()`
* 详解：
  * `static getDerivedStateFromProps(nextProps, prevState)` 用于state完全取决于props
  * `getSnapshotBeforeUpdate(prevProps, prevState)` 更新DOM之前调用，可以获取DOM元素，返回值将会传递给`componentDidUpdate()`, 一般不用
* 即将废弃：
  * `componentWillMount`
  * `componentWillReceiveProps`
  * `componentWillUpdate`

## 4、错误边界
* 错误边界是一种 React 组件，这种组件可以捕获错误，并且，它会渲染出备用DOM树，而不是渲染那些崩溃了的DOM树
* 注意，错误边界无法捕获以下场景中产生的错误(只能捕获子组件中生命周期函数的错误)：
  * 事件处理：onClick
  * 异步代码：setTimeout 
  * 服务端渲染
  * 它自身抛出来的错误（并非它的子组件）
* 如果组件中定义以下两个专门处理错误的生命周期函数，就是错误边界
  * `static getDerivedStateFromError(error)`
  * `componentDidCatch(error, info)`

## 5、代码分割（code split）
* import 只能动态加载js代码
  * import('./xxx').then((xxx) => {})
* React.lazy 动态加载React组件
  * const LazyComp = React.lazy(() => import('./xxx'))
  * <Suspense fallback={<div>Loading...</div>}><LazyComp /></Suspense>
* react-loadable 动态加载React组件并支持服务端渲染  
  * Loadable({loader: () => import('./register'), loading() {return <div>Loading...</div>}});
  
## 6、context
* 组件通信方式之一：用于祖孙组件通信
* 创建/初始化：`const MyContext = React.createContext(defaultValue);`
* 提供给子组件使用：`<MyContext.Provider value={/* 某个值 */}><子组件 /></MyContext.Provider>`
* 子组件内使用：
  * `static contextType = MyContext;  this.context;`
  * `<MyContext.Consumer>{value => /* 基于 context 值进行渲染*/}</MyContext.Consumer>`

## 7、性能优化
* 减少render调用次数，从而减少diff比较和重新渲染次数
* shouldComponentUpdate
* PureComponent：组件内部实现了一种类似shouldComponentUpdate的比较

## 8、Ref
* forwardRef 用来将ref传给子组件，从而获取子组件的DOM元素的操作
* 用来获取工厂/纯函数组件的ref

## 9、Hooks
* React Hooks是什么?
  * 用来定义有状态和生命周期函数的纯函数组件（在过去纯函数组件是没有状态和生命周期函数的~）
  * Hooks是React v16.7.0-alpha中加入的新特性，并向后兼容。
* 什么是钩子（Hook）
  * 本质就是函数，能让你使用React组件的状态和生命周期函数...
* 作用
  * 干死class，让function一统江湖
  * 让代码更加可复用，不用在定义繁杂的HOC
* 使用
  * useState(initValue)
    * const [ state, setState ] = React.useState(initValue);
    * 用来定义状态数据和操作状态数据的方法
  * useEffect(function)
    * useEffect(() => { do something })
    * 副作用函数（发请求获取数据、订阅事件、修改DOM等）
    * 本质上就是一个生命周期函数，相当于componentDidMount 、 componentDidUpdate 和 componentWillUnmount
  * useContext(Context)
    * context指的是React.createContext返回值

  ------ 以下Hooks只使用于特殊场景，需要时在用 -----
  useReducer
    - const [state, dispatch] = useReducer(reducer, initialState);
    - 一个 useState 替代方案，相当于redux
  useCallback
    - useCallback(fn, inputs)
    - 相当于 shouldComponentUpdate，只有inputs的值发生变化才会调用fn
  useMemo(create, inputs)
    - 相当于useCallback

  更多详见官方文档：https://react.docschina.org/docs/hooks-reference.html

* 注意
  - 只能在顶层调用钩子。不要在循环，控制流和嵌套的函数中调用钩子。
  - 只能从React的函数式组件中调用钩子。不要在常规的JavaScript函数中调用钩子。
  （此外，你也可以在你的自定义钩子中调用钩子。）

## 10、服务器渲染
* React使用React-Router开发的是单页面应用。整个应用只有一个完整的页面。
* 缺点：SEO不友好
* 解决：服务器渲染

* ReactDOMServer.renderToString(element) 将React元素渲染HTML字符串
* next框架 -- create-next-app








