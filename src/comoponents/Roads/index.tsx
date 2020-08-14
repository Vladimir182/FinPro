import React, { lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loading from '../Loading';
import Authorized from './Authorized';

// const AuthLazy = lazy(() => import('./Authorized'));

const Roads: React.FC = () => {

  return (
    <Switch>
      {/* <Suspense fallback={<Loading />}> */}
        {/* <Route path="/" component={Authlazy} /> */}
        <Route path="/" component={Authorized} />
      {/* </Suspense> */}
    </Switch>
  )
}

export default withRouter(Roads);
