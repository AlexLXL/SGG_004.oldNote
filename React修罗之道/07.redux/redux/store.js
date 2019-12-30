/**
 * 建store对象
 * const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
 * 参数：功能实现reducers、异步thunk
 */

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'
import thunk from 'redux-thunk'

/**
 * redux-thunk
 *   1.执行异步代码
 *      thunk放在createStore第二个参数，用应用中间件applyMiddleware包裹
 *
 * redux-devtools-extension
 *   1.异步代码检测（上线需要删除改组件）
 */

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
export default store;