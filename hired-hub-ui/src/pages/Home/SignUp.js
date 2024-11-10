import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import "./Auth.scss";
import background from '../../assets/images/login_backgound.png';

const SignUp = () => {
  return (
    <>
    <img className='bg-login' src={background}/>
      <div className='container'>
        <LoginForm loginType={"Đăng Ký"}/>
      </div>
    </>
  );
};

export default SignUp;