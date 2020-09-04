import React, { useContext } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomeScreen from '../comoponents/HomeScreen';
import Voucher from '../comoponents/Voucher';
import VoucherLogin from '../comoponents/VoucherLogin';
import Header from '../comoponents/Header';
import { ThemeContext } from '../ThemeContextProvider';
import { useSelector } from 'react-redux';
import { AppState } from '../redux';
import VoucherWithdraw from '../comoponents/VoucherWithdraw';
import VoucherBalance from '../comoponents/VoucherBalance';
import VoucherDeposit from '../comoponents/VoucherDeposit';
import Error from '../comoponents/Error';
import WeCountBills from '../comoponents/WeCountBills';

const MainPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { isShowError } = useSelector((state: AppState) => state.errorScreen);

  const rootStyles = { 
    background: theme.background,
    color: theme.color,
    height: '100%',
    padding: '0 4%',
    overflow: 'hidden'
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
            path="/voucher-balance"
            component={VoucherBalance}
          />
          <Route
            exact={true}
            path="/voucher-deposit"
            component={VoucherDeposit}

          />
          <Route
            exact={true}
            path="/voucher-withdraw"
            component={VoucherWithdraw}
          />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(MainPage);