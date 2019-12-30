import { INCREMENT, DECREMENT, ERROR } from './action-types'
// 根据state的功能来定义action，目前只有加减的操作

// 同步
export const increment = (value) => ({ type:INCREMENT, data:value });
export const decrement = (value) => ({ type:DECREMENT, data:value });
export const error = (value) => ({ type:ERROR, data:value });

// 异步
export const incrementAsync = (value) => {
  return (dispatch) => {
    setTimeout(() => {
      // 模拟发送请求
      // 成功
      dispatch(increment(value));
      // 失败
      // dispatch(error('请求失败'))
    },1000)
  }
};