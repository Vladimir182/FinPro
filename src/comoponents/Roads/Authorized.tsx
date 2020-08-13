import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux';
import Pages from '../../pages';
import { fetchLogin, fetchCheckAuth } from '../../redux/authorization';

const Authorized: React.FC = (props) => {
  const { isAuth, isLoading } = useSelector((state: AppState) => state.authorization);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth)
      fetchCheckAuth()(dispatch)
  }, [isAuth]);

  //@ts-ignore
  const isLoginPage = props.location.pathname === '/login';
  return (
    <>
      { 
        isLoading ? <span className="spinner-loader">Loading</span>
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