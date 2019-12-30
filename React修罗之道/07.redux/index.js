/**
 * react-redux
 *   1.合并创建action和dispatch的代码
 *   2.本文件Provider 代替 store.subscribe(render)
 *    自动检测状态变化，重新渲染
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import store from './redux/store'

// react-redux的 Provider 1、更新组件  2、那个容器组件需要store，帮它传进去(通过context的方法)
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));