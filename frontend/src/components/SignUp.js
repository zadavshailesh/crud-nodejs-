import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  });

  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch('http://localhost:4000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem('user', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.auth));

    if (result) {
      navigate('/');
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        value={name}
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="enter your name"
      />
      <input
        className="inputBox"
        value={email}
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="enter your email"
      />
      <input
        className="inputBox"
        value={password}
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="enter your password"
      />
      <button onClick={collectData} className="button" type="button">
        Signup
      </button>
    </div>
  );
};
export default SignUp;
