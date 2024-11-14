import React from 'react';
import "./Auth.scss";
import background from '../../assets/images/login_backgound.png';
import RegisterForm from '../../components/RigisterForm/RegisterForm';

const SignUp = () => {
  return (
    <>
    <img className='bg-login' src={background}/>
      <div className='container'>
        <RegisterForm />
      </div>
    </>
  );
};

export default SignUp;