import React, { Component, lazy, Suspense, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
// import Login from '../../pages/Login';
import Loading from '../Loading';
import Authorized from './Authorized';
import { AppState } from '../../redux';
import { fetchLogin } from '../../redux/authorization';

const AuthLazy = lazy(() => import('./Authorized'));

const Roads: React.FC = () => {

  return (
    <Switch>
      {/* <Route path="/login" component={Login} /> */}
      <Suspense fallback={Loading}>
          <Route path="/" component={AuthLazy} />
      </Suspense>
    </Switch>
  );
}

export default withRouter(Roads);
