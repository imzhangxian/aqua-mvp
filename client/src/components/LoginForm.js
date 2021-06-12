import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';
import { useHistory } from "react-router-dom";

import './css/loginform.css'

import { useTranslation } from 'react-i18next';

function LoginForm() {
  const { user, setUser } = useContext(AuthContext);
  const [inputs] = useState({});
  const [failed, setFailed] = useState(false);

  const { t } = useTranslation();

  const history = useHistory();

  const handleSubmit = () => {
    authUser({
      username: inputs.username,
      password: inputs.password
    });
    
  }

  const authUser = (inputuser) => {
    const authUserReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputuser)
    };
    fetch('/login', authUserReq)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log("login successful - " + data.user.name);
          let user = {
            id: data.user.id,
            name: data.user.name,
            role: data.user.role,
            token: data.token
          };
          setUser(user);
          sessionStorage.setItem('user', JSON.stringify(user));
          history.push('/');
        } else {
          console.log("Login failed.");
          setUser(null);
          sessionStorage.removeItem('user');
          setFailed(true);
        }
      },
      error => {
        console.log("login failed - " + error);
        setUser(null);
        sessionStorage.removeItem('user');
        setFailed(true);
      })
      .catch(e => console.log(e));
  }

  return (
    <div className="login-form">
          {failed && <p className="alert alert-danger"> Login Failed </p>}
          <Form.Group controlId="login-username">
              <Form.Label>{t('label.username')}</Form.Label>
              <Form.Control type="text" placeholder="Username/email"
                  onChange={e => { inputs.username = e.target.value }} />
          </Form.Group>
          <Form.Group controlId="login-password">
              <Form.Label>{t('label.password')}</Form.Label>
              <Form.Control type="password" placeholder="Password"
                  onChange={e => { inputs.password = e.target.value }} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
              {t('btn.login')}
          </Button>
    </div>
  );
}

export default LoginForm
