import React from 'react';
import './AuthForgotPassword.scss';
import background from '../../assets/images/login_backgound.png';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';

const AuthForgotPassword = () => {
    return (
        <>
            <img className="bg-fp" src={background} />
            <div className="container-fp">
                <ForgotPassword />
            </div>
        </>
    );
};

export default AuthForgotPassword;
