import React from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import Page from './Page';
import Login from './Login';
import MainPage from './MainPage'

const Pages: React.FC = () => {
  return (
    <>
      <Switch>
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