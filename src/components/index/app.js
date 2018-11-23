import React from 'react';
import Home from './home';
import Bundle from './bundle.js';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import ListContainer from 'bundle-loader?lazy&name=index.[name]!./list.js';
import DetailContainer from 'bundle-loader?lazy&name=index.[name]!./detail.js';
const List = (props) => (
    <Bundle load={ListContainer}>
        {(List) => <List {...props} />}
    </Bundle>
)
const Detail = (props) => (
  <Bundle load={DetailContainer}>
      {(Detail) => <Detail {...props} />}
  </Bundle>
)

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = "/" component = { Home } />
          <Route path = "/list" component = { List } />
          <Route path = "/detail" component = { Detail } />
        </Switch>
      </Router>
    )
  }
}