import React from 'react';
import LoginForm from '../../components/LoginForm';
import "./Auth.scss";
import background from '../../assets/images/login_backgound.png';

const Auth = () => {
  return (
    <>
    <img src={background}/>
      <div className='container'>
        <LoginForm loginType={"Sign in"}/>
      </div>
    </>
  );
};

export default Auth;