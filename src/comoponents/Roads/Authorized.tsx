import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux';
import Pages from '../../pages';
import { fetchCheckAuth } from '../../redux/authorization';
import LoaderModal from '../Loading/LoaderModal';

const Authorized: React.FC = (props) => {
  const { isAuth, isLoading, accessToken } = useSelector((state: AppState) => state.authorization);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth && accessToken)
      fetchCheckAuth()(dispatch)
  }, [isAuth]);

  //@ts-ignore
  const isLoginPage = props.location.pathname === '/login';
  return (
    <>
      { 
        isLoading ? <div className="login-page-wrapper"><LoaderModal /></div>
        : <>
          { !isAuth && <Redirect to="/login" /> }
          { (isAuth && isLoginPage) && <Redirect to="/" /> }
          <Pages />
        </>
      }    
    </>
  )
}

export default withRouter(Authorized);