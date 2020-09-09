import React, { useEffect } from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';
import Page from './Page';
import Login from './Login';
import MainPage from './MainPage'
import { AppState } from '../redux';
import { useSelector } from 'react-redux';
import ServerError from '../comoponents/ServerError';

const Pages: React.FC = (props) => {
  const { serverConnectionStatus } = useSelector((state: AppState) => state.errorScreen);

  useEffect(() => {
    window.addEventListener('beforeunload', onUnload);

    return window.removeEventListener('beforeunload', onUnload);
  })

 const onUnload = () => {
   //@ts-ignore
   props.history.push('/');
 }

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
                caption="Login"
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