import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';
import { useHistory } from "react-router-dom";

import './css/loginform.css'

import { useTranslation } from 'react-i18next';

function LoginForm() {
  const { user, setUser } = useContext(AuthContext);
  const [inputs] = useState({});

  const { t } = useTranslation();

  const history = useHistory();

  const handleSubmit = () => {
    authUser({
      username: inputs.username,
      password: inputs.password
    });
    
  }

  const authUser = (user) => {
    const authUserReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch('/login', authUserReq)
      .then(res => res.json())
      .then(token => {
        user.token = token.accessToken;
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        history.push('/');
      })
      .catch(e => console.log(e));
  }

  return (
    <div className="login-form">
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
