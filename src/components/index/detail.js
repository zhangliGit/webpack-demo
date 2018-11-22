import React from 'react'

export default class Detail extends React.Component {
  back() {
    this.props.history.goBack();
  }
  render() {
    return (
      <div>
        <div onClick = { this.back.bind(this) }>返回</div>
        <div>我是详情界面</div>
      </div>
    )
  }
}
console.log('detail')