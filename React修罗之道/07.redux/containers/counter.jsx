import { connect } from 'react-redux';

import Counter from '../components/counter';
import { increment, decrement, incrementAsync, error } from '../redux/action-creator' // 导入各个action工厂函数

/**
 * react-redux
 *   1.高阶组件connect封装action和dispatch到一起，传到Counter普通组件props中使用
 */
export default connect(
  (state) => ({num: state}),
  { increment, decrement, incrementAsync, error }
)(Counter)              // 注意：这里不是传组件