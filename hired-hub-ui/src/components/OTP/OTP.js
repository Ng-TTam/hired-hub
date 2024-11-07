import React, { useState, useRef, useEffect } from 'react';
import './OTP.scss';
import { KeySquareIcon } from 'lucide-react';

const OTP = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus on first input when component mounts
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return; // Only allow numbers

        const newOtp = [...otp];
        // Take the last character if user inputs multiple characters
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Call onComplete if all fields are filled
        const otpValue = newOtp.join('');
        if (otpValue.length === length && onComplete) {
            onComplete(otpValue);
        }

        // Move to next input if value is entered
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, length);

        if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

        const newOtp = [...otp];
        pastedData.split('').forEach((value, index) => {
            newOtp[index] = value;
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = value;
            }
        });

        setOtp(newOtp);

        // Focus on next empty input or last input
        const focusIndex = Math.min(pastedData.length, length - 1);
        if (inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex].focus();
        }

        // Call onComplete if all fields are filled
        if (pastedData.length === length && onComplete) {
            onComplete(pastedData);
        }
    };

    return (
        <div className='otp'>
            <div className="otp-container">
                <h2>Hãy nhập mã OTP</h2>
                <KeySquareIcon size={120} style={{marginBottom: "20px", color:"#00b14f"}}/>
                <span>Mã OTP đã được gửi tới email của bạn.</span>
                <span>Vui lòng nhập mã vào ô bên dưới, OTP sẽ hết hạn sau 5 phút nữa, </span>
                <div className="otp-input-group">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            className="otp-input"
                            autoComplete="off"
                        />
                    ))}
                </div>
                <div className="otp-footer">
                    Didn't receive code? <a className="resend-button">Resend OTP</a>
                </div>
            </div>
        </div>
    );
};

export default OTP;
