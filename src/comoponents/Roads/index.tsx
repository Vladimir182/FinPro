import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Authorized from './Authorized';

const Roads: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Authorized} />
    </Switch>
  )
}

export default withRouter(Roads);
