import React from 'react';
import Home from './home';
import asyncComponent from './asyncComponent';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
const List = asyncComponent(() => require('./list.js'));
const Detail = asyncComponent(() => require('./detail.js'));

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