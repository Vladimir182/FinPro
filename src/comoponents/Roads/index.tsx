import React, { lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loading from '../Loading';

const AuthLazy = lazy(() => import('./Authorized'));

const Roads: React.FC = () => {

  return (
    <Switch>
      <Suspense fallback={<Loading />}>
          <Route path="/" component={AuthLazy} />
      </Suspense>
    </Switch>
  )
}

export default withRouter(Roads);
