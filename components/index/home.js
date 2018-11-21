import React from 'react'

export default class Home extends React.Component {
  goList() {
    this.props.history.push('/list');
  }
  goHtml() {
    window.location.href = 'list.html'
  }
  render() {
    return (
      <div>
        <div style = {{ background: "red" }} onClick = { this.goList.bind(this)}>我是首页哈哈</div>
        <div onClick = { this.goHtml.bind(this) }>网页娃娃</div>
      </div>
    )
  }
} 