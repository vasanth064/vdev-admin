import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGoogleAuth } from './../Contexts/GoogleAuthContext';
import './Assets/login.css';

const Login = () => {
  const { currentUser, googleSignIn, googleSignOut, loading } = useGoogleAuth();

  return (
    <>
      {currentUser ? <Navigate to='/' /> : null}
      <div className='container'>
        <div className='loginContainer'>
          <h1 className='loginHeader'>V Dev</h1>
          <h2 className='loginSubHeader'>DASHBOARD LOGIN</h2>
          {currentUser ? (
            <button onClick={googleSignOut} className='loginButton'>
              Sign Out
            </button>
          ) : (
            <button
              className='loginButton'
              onClick={googleSignIn}
              disabled={loading && !currentUser ? true : false}>
              Login with Google
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
