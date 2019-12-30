import React,{ Component, Fragment } from 'react';
import PropTypes from 'prop-types'

/**
 * 使用了react-redux的容器组件后
 *  1. 状态num在props上
 *  2. 创建action和dispatch合并在一起，合并后的功能也在props上
 *  （合并后直接使用 ：this.props.increment(this.state.value);）
 */

export default class Counter extends Component{
  static propTypes = {
    num: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };

  state = {
    value: 1
  };
  
  handleChange = (e) => {
    this.setState({
      value: +e.target.value
    });
  };

  increment = () => {
    this.props.increment(this.state.value);
  };

  incrementAsync = () => {
    this.props.incrementAsync(this.state.value);
  };

  render() {
    const {num} = this.props; // 在props拿状态num

    return <Fragment>
      <h2>click {num} times</h2>
      <select onChange={this.handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button onClick={this.increment}>+</button>
      <button onClick={this.incrementAsync}>increment async</button>
    </Fragment>;
  }
}