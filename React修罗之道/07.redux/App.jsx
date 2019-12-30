import React,{Component} from 'react';

import Counter from './containers/counter'  // 使用react-redux的容器组件

export default class App extends Component{
  render() {
    return <Counter/>
  }
}