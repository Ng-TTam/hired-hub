import React from 'react';
import OTP from '../../components/OTP/OTP';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../redux/accountSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { otpLoading, otpError, otpSuccess } = useSelector((state) => state.account);

    const handleOtpComplete = (otp) => {
        dispatch(verifyOtp(otp));
    };

    useEffect(() => {
        if ( otpSuccess ) {
            navigate('/');
        }
    }, [otpSuccess, navigate]);

    return <OTP onComplete={handleOtpComplete}/>;
};

export default SignUp;
