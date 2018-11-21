import React from 'react';
import Home from './home';
import List from './list';
import Detail from './detail';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = "/" component = { Home } />
          <Route exact path = "/list" component = { List } />
          <Route exact path = "/detail" component = { Detail } />
        </Switch>
      </Router>
    )
  }
}