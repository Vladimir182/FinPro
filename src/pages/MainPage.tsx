import React, { useContext, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomeScreen from '../comoponents/HomeScreen';
import Voucher from '../comoponents/Voucher';
import VoucherLogin from '../comoponents/VoucherLogin';
import VoucherCreate from '../comoponents/VoucherCreate';
import VoucherPin from '../comoponents/VoucherPin';
import Header from '../comoponents/Header';
import { ThemeContext } from '../ThemeContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../redux/authorization';
import Check from "../comoponents/Checks";
import Error from '../comoponents/Error';
import { AppState } from '../redux';
// import './index.scss'

const MainPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { isShowError } = useSelector((state: AppState) => state.errorScreen);
  const rootStyles = { 
    background: theme.background,
    color: theme.color,
    height: '100%',
    padding: '0 4%'
  };

  const contentStyles = {
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <div className="main-page-root" style={rootStyles}>
      <Header />
      <div className="content" style={contentStyles}>
        <Switch>
          { 
            isShowError &&
            <Route
              path="/"
              component={Error}
            />           
          }
          <Route
            exact={true}
            path="/"
            component={HomeScreen}
          />
          <Route
            exact={true}
            path="/voucher"
            component={Voucher}
          />
          <Route
            exact={true}
            path="/voucher-login"
            component={VoucherLogin}
          />
          <Route
            exact={true}
            path="/voucher-create"
            component={VoucherCreate}
          />
          {/* <Route
            exact={true}
            path="/voucher-pin" 
            component={VoucherPin}
          /> */}
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(MainPage);