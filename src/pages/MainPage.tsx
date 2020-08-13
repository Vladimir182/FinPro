import React, { useContext, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomeScreen from '../comoponents/HomeScreen';
// import VoucherRoads from '../comoponents/VoucherRoads';
import Voucher from '../comoponents/Voucher';
import VoucherLogin from '../comoponents/VoucherLogin';
import VoucherCreate from '../comoponents/VoucherCreate';
import VoucherPin from '../comoponents/VoucherPin';
import Header from '../comoponents/Header';
import { ThemeContext } from '../ThemeContextProvider';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../redux/authorization';
// import './index.scss'

const MainPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const rootStyles = { 
    background: theme.background,
    color: theme.color,
    height: '100%',
    padding: '0 4%'
  }

  const contentStyles = {
    display: 'flex',
    justifyContent: 'center'
  }

  return (
    <div className="main-page-root" style={rootStyles}>
      <Header />
      <div className="content" style={contentStyles}>
        <Switch>
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
          {/* <Route
            exact={true}
            path="/voucher-create"
            component={VoucherCreate}
          /> */}
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