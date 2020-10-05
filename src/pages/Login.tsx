import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../redux/authorization';
import logo from '../images/logo.svg';

import './login.css';
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetchLogin({ username, password })(dispatch);
  }

  console.log('LOGIN RENDER')
  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="logo">
          <img  src={logo} width={200} height={75}/>
          <p className="sub-title">Admin login</p>
        </div>
        <div className="login-item">
          <form action="" method="post" className="form form-login" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="user"><span className="hidden">Username</span></label>
              <input id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-input" placeholder="Username" required />
            </div>
            <div className="form-field">
            <label className="lock"><span className="hidden">Password</span></label>
            <input id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-input" placeholder="Password" required />
          </div>
          <div className="form-field">
            <input type="submit" value="Login" />
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default useMemo(() => Login()); 




