import React from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import Page from './Page';
import Login from './Login';
import MainPage from './MainPage'
import { AppState } from '../redux';
import { useSelector } from 'react-redux';
import ServerError from '../comoponents/ServerError';

const Pages: React.FC = (props) => {
  const { serverConnectionStatus } = useSelector((state: AppState) => state.screens);

  return (
    <>
      <Switch>
        { 
          !serverConnectionStatus &&
          <Route
            exact={false}
            path="/"
            component={() => (
              <Page
                caption="Server error"
                component={<ServerError />}
              />
            )}
          />           
        }
        <Route
          exact={true}
          path="/login"
          component={() => (
            <Page
              caption="Login"
              component={<Login />}
            />
          )}
        />
        <Route
          exact={false}
          path="/"
          component={() => (
            <Page
              caption="MainPage"
              component={<MainPage />}
            />
          )}
        />
      </Switch>
    </>
  )
}

export default withRouter(Pages);