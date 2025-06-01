// Login.jsx
import React from 'react';
import { initiateLogin } from './Spotify';

const Login = () => {
  return (
    <div>
      <button onClick={initiateLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
