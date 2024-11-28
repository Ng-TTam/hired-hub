import React from 'react';
import OTP from '../../components/OTP/OTP';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../redux/accountSlice';
import { Modal } from 'antd';
import styled from 'styled-components';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { otpSuccess, otpError } = useSelector((state) => state.account);
    const [visible, setVisible] = React.useState(false);

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOtpComplete = (otp) => {
        dispatch(verifyOtp(otp));
    };

    useEffect(() => {
            if (otpSuccess) { 
                setVisible(true);

                setTimeout(() => {
                    setVisible(false);
                    navigate('/');
                }, 1500);
            }
        },[otpSuccess, navigate]);

    return (
        <>
            <OTP onComplete={handleOtpComplete} error={otpError}/>
            <Modal open={visible} onCancel={handleCancel} footer={null} width={800}>
                <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Xác thực thành công</h1>
                    <StyledWrapper>
                        <div className="checkbox-wrapper-12">
                            <div className="cbx">
                                <input id="cbx-12" type="checkbox" defaultChecked disabled/>
                                <label htmlFor="cbx-12" />
                                <svg width={38} height={36} viewBox="0 0 15 14" fill="none">
                                    <path d="M2 8.36364L6.23077 12L13 2" />
                                </svg>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <defs>
                                    <filter id="goo-12">
                                        <feGaussianBlur in="SourceGraphic" stdDeviation={4} result="blur" />
                                        <feColorMatrix
                                            in="blur"
                                            mode="matrix"
                                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                            result="goo-12"
                                        />
                                        <feBlend in="SourceGraphic" in2="goo-12" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </StyledWrapper>
                </div>
            </Modal>
        </>
    );
};

const StyledWrapper = styled.div`
    .checkbox-wrapper-12 {
        position: relative;
    }

    .checkbox-wrapper-12 > svg {
        position: absolute;
        top: -130%;
        left: -170%;
        width: 110px;
        pointer-events: none;
    }

    .checkbox-wrapper-12 * {
        box-sizing: border-box;
    }

    .checkbox-wrapper-12 input[type='checkbox'] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        margin: 0;
    }

    .checkbox-wrapper-12 input[type='checkbox']:focus {
        outline: 0;
    }

    .checkbox-wrapper-12 .cbx {
        width: 50px;
        height: 50px;
        top: calc(100px - 12px);
        left: calc(100px - 12px);
    }

    .checkbox-wrapper-12 .cbx input {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        border: 2px solid #bfbfc0;
        border-radius: 50%;
    }

    .checkbox-wrapper-12 .cbx label {
        width: 50px;
        height: 50px;
        background: none;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        transform: trasnlate3d(0, 0, 0);
        pointer-events: none;
    }

    .checkbox-wrapper-12 .cbx svg {
        position: absolute;
        top: 5px;
        left: 4px;
        z-index: 1;
        pointer-events: none;
    }

    .checkbox-wrapper-12 .cbx svg path {
        stroke: #fff;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 19;
        stroke-dashoffset: 19;
        transition: stroke-dashoffset 0.3s ease;
        transition-delay: 0.2s;
    }

    .checkbox-wrapper-12 .cbx input:checked + label {
        animation: splash-12 1s ease forwards;
    }

    .checkbox-wrapper-12 .cbx input:checked + label + svg path {
        stroke-dashoffset: 0;
    }

    @-moz-keyframes splash-12 {
        40% {
            background: rgb(0, 177, 79);
            box-shadow: 0 -18px 0 -8px rgb(0, 177, 79), 16px -8px 0 -8px rgb(0, 177, 79), 16px 8px 0 -8px rgb(0, 177, 79), 0 18px 0 -8px rgb(0, 177, 79),
                -16px 8px 0 -8px rgb(0, 177, 79), -16px -8px 0 -8px rgb(0, 177, 79);
        }

        100% {
            background: rgb(0, 177, 79);
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent,
                0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
        }
    }

    @-webkit-keyframes splash-12 {
        40% {
            background: rgb(0, 177, 79);
            box-shadow: 0 -18px 0 -8px rgb(0, 177, 79), 16px -8px 0 -8px rgb(0, 177, 79), 16px 8px 0 -8px rgb(0, 177, 79), 0 18px 0 -8px rgb(0, 177, 79),
                -16px 8px 0 -8px rgb(0, 177, 79), -16px -8px 0 -8px rgb(0, 177, 79);
        }

        100% {
            background: rgb(0, 177, 79);
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent,
                0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
        }
    }

    @-o-keyframes splash-12 {
        40% {
            background: rgb(0, 177, 79);
            box-shadow: 0 -18px 0 -8px rgb(0, 177, 79), 16px -8px 0 -8px rgb(0, 177, 79), 16px 8px 0 -8px rgb(0, 177, 79), 0 18px 0 -8px rgb(0, 177, 79),
                -16px 8px 0 -8px rgb(0, 177, 79), -16px -8px 0 -8px rgb(0, 177, 79);
        }

        100% {
            background: rgb(0, 177, 79);
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent,
                0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
        }
    }

    @keyframes splash-12 {
        40% {
            background: rgb(0, 177, 79);
            box-shadow: 0 -18px 0 -8px rgb(0, 177, 79), 16px -8px 0 -8px rgb(0, 177, 79), 16px 8px 0 -8px rgb(0, 177, 79), 0 18px 0 -8px rgb(0, 177, 79),
                -16px 8px 0 -8px rgb(0, 177, 79), -16px -8px 0 -8px rgb(0, 177, 79);
        }

        100% {
            background: rgb(0, 177, 79);
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent,
                0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
        }
    }
`;

export default SignUp;
