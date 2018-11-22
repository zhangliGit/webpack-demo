import React from 'react'

export default class List extends React.Component {
  back() {
    this.props.history.goBack();
  }
  goDetail() {
    this.props.history.push('/detail');
  }
  render() {
    return (
      <div>
        <div onClick={ this.back.bind(this) }>返回</div>
        <div onClick = { this.goDetail.bind(this) } style = {{ background: "red" }}>我是列表页</div>
        <div style = {{ background: "red" }}>我是列表页</div>
      </div>
    )
  }
}
console.log('list')