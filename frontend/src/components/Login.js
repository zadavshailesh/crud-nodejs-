import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setName] = useState('');
  const [password, setEmail] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, []);

  const handleLogin = async () => {
    console.warn(email, password);
    let result = await fetch('http://localhost:4000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    console.warn(result);

    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.user));
      navigate('/');
    } else {
      alert('OOPS,Enter correct details');
    }
  };

  return (
    <div className="login">
      <input
        type="text"
        className="inputBox"
        placeholder="enter email"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={email}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="enter password"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={password}
      />
      <button onClick={handleLogin} type="submit" className="button">
        Login
      </button>
    </div>
  );
};

export default Login;
