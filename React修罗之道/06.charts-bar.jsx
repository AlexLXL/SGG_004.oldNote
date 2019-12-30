import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component{
  state = {
    option: {}
  };

  componentDidMount() {
    this.setState({
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {  // 移入提示
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    })
  }

  render() {
    return <ReactEcharts option={this.state.option} />
  }
}