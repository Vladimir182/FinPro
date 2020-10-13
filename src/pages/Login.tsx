import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, resetAuthErrors } from '../redux/authorization';
import logo from '../images/logo.svg';
import './login.css';
import { closeVoucherSession } from '../redux/voucher';
import { AppState } from '../redux';

const invalidLoginMessageText = 'Проверьте правильность данных';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { voucherSessionKey } = useSelector((state: AppState) => state.voucher)
  const { isError } = useSelector((state: AppState) => state.authorization)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (voucherSessionKey) {
      dispatch(closeVoucherSession());
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetchLogin({ username, password })(dispatch);
  }

  const handleChange = () => {
    dispatch(resetAuthErrors())
  }
  
  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="logo">
          <img  src={logo} width={200} height={75}/>
          <p className="sub-title">Admin login</p>
        </div>
        <div className="login-item">
          <form action="" method="post" className="form form-login" onSubmit={handleSubmit} onChange={handleChange}>
            <div className="form-field">
              <input id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-input" placeholder="Username" required />
            </div>
            <div className="form-field">
            <input id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-input" placeholder="Password" required />
          </div>
          <div className="form-error-message">
            { isError && <p>{invalidLoginMessageText}</p> }
          </div>
          <div className="form-field">
            <input type="submit" className="submit-button" value="Login" />
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login; 