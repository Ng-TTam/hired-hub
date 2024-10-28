import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import "./Auth.scss";
import background from '../../assets/images/login_backgound.png';

const Auth = () => {
  return (
    <>
    <img className='bg-login' src={background}/>
      <div className='container'>
        <LoginForm loginType={"Sign in"}/>
      </div>
    </>
  );
};

export default Auth;