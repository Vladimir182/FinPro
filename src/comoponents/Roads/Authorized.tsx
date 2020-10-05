import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { AppState } from '../../redux';
import Pages from '../../pages';
import { fetchCheckAuth, FETCH_LOGIN_FAILURE } from '../../redux/authorization';
import LoaderModal from '../Loading/LoaderModal';
import ts from 'typescript';

// const Authorized: React.FC = (props) => {
//   const { isAuth, isLoading, accessToken } = useSelector((state: AppState) => state.authorization);
//   const { serverConnectionStatus } = useSelector((state: AppState) => state.screens);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!isAuth && accessToken && serverConnectionStatus) {
//       fetchCheckAuth()(dispatch);
//     } else if (!accessToken && serverConnectionStatus) {
//       dispatch({ type: FETCH_LOGIN_FAILURE });
//     }
//   }, [isAuth, serverConnectionStatus]);

//   //@ts-ignore
//   const isLoginPage = props.location.pathname === '/login';
//     //@ts-ignore
//   console.log('!isAuth && serverConnectionStatus && !isLoginPage', !isAuth ,'&&', serverConnectionStatus ,'&&', !isLoginPage)
//   console.log('isAuth && isLoginPage', isAuth ,'&&', isLoginPage)
//   return (
//     <>
//       { 
//         isLoading ? <div className="login-page-wrapper"><LoaderModal /></div>
//         : <>
//           { (!isAuth && serverConnectionStatus && !isLoginPage) && <Redirect to="/login" /> }
//           { (isAuth && isLoginPage) && <Redirect to="/" /> }
//           <Pages />
//         </>
//       }    
//     </>
//   )
// }

class Authorized extends React.Component {

  //@ts-ignore
  shouldComponentUpdate(nextProps, nextState) {
    //@ts-ignore
    console.log('nextProps.isAuth', nextProps.isAuth,  'this.props.isAuth', this.props.isAuth)
    //@ts-ignore
    console.log('nextProps.serverConnectionStatus', nextProps.serverConnectionStatus,  'this.props.serverConnectionStatush', this.props.serverConnectionStatus)
        //@ts-ignore
        console.log('nextProps.accessToken', nextProps.accessToken,  'this.props.accessToken', this.props.accessToken)
    //@ts-ignore
    if (nextProps.isAuth !== this.props.isAuth || nextProps.serverConnectionStatus !== this.props.serverConnectionStatus) {
      return true;
    }
    //@ts-ignore
    if (nextProps.accessToken !== this.props.accessToken) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    //@ts-ignore
    const { fetchCheckAuth, fetchLoginFailure, isAuth, accessToken, serverConnectionStatus } = this.props;

    if (!isAuth && accessToken && serverConnectionStatus) {
      fetchCheckAuth();
    } else if (!accessToken && serverConnectionStatus) {
      // dispatch({ type: FETCH_LOGIN_FAILURE });
      fetchLoginFailure()
    }
  }
  
  render() {
    //@ts-ignore
    const { isAuth, isLoading, accessToken, serverConnectionStatus, location } = this.props;
    const isLoginPage = location.pathname === '/login';

    return (
      <>
        { 
          isLoading ? <div className="login-page-wrapper"><LoaderModal /></div>
          : <>
            { (!isAuth && serverConnectionStatus && !isLoginPage) && <Redirect to="/login" /> }
            { (isAuth && isLoginPage) && <Redirect to="/" /> }
            <Pages />
          </>
        }    
      </>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuth: state.authorization.isAuth,
  isLoading: state.voucher.isLoading,
  accessToken: state.authorization.accessToken,
  serverConnectionStatus: state.screens.serverConnectionStatus
});

const mapDispathToProps = (dispatch: any) => ({
  fetchCheckAuth,
  fetchLoginFailure: () => ({ type: FETCH_LOGIN_FAILURE })
})

//@ts-ignore
export default connect(mapStateToProps, mapDispathToProps)(withRouter(Authorized));