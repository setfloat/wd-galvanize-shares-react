import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import App from 'components/App';
import Bulletins from 'components/Bulletins';
import React from 'react';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/">
        <IndexRoute component={Bulletins} />
        <Route component={Bulletins} path="/topics/:topic" />
      </Route>
    </Router>;
  }
});

export default Routes;
