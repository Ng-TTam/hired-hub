import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearOTPResetPassState, clearResetPassState, forgotPass, sendResetPassOtp, verifyResetPassOtp } from "../../redux/accountSlice";
import '../ChangePassword/ChangePassword.scss';
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isEmail, setIsEmail] = useState(true);
  const [isOTP, setIsOTP] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [key, setKey] = useState("");

  const dispatch = useDispatch();

  const validateFormEmail = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email không được để trống';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newPassword || newPassword.trim().length < 8 || newPassword.trim().length > 25) {
      newErrors.newPassword = 'Mật khẩu dài từ 8 - 25 ký tự';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không trùng khớp';
    }
    if (!email) {
      newErrors.email = 'Email không được để trống';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    return () => {
      dispatch(clearOTPResetPassState());
      dispatch(clearResetPassState());
    };
  }, [dispatch]);

  const handleLogin = () => {
    navigate('../login');
  }

  const handleSendOTP = async () => {
    setErrors(null);
    if (!validateFormEmail()) return;
    try {
      await dispatch(sendResetPassOtp(email)).unwrap();
      setIsEmail(false);
      setIsOTP(true);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Email chưa mở tài khoản trên hệ thống!',
      });
    }
  };

  const handleResend = (event) => {
    event.preventDefault();
    dispatch(sendResetPassOtp(email));
  }

  const handleVerifyOTP = async () => {
    try {
      const keyRest = await dispatch(verifyResetPassOtp({ email, otp })).unwrap();
      setKey(keyRest.data);
      setIsOTP(false);
      setIsPass(true);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Mã xác thực không hợp lệ',
      });
    }
  }

  const handleSubmit = async () => {
    setErrors(null);
    if (!validateForm()) return;

    dispatch(clearOTPResetPassState());
    const newPassAccountData = {
      email: email,
      newPassword: newPassword,
    };
    try {
      const success = await dispatch(forgotPass({ key, newPassAccountData })).unwrap();
      if (success) {
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật mật khẩu thành công',
        });
        dispatch(clearOTPResetPassState());
        dispatch(clearResetPassState());
        navigate('../login');
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể đổi mật khẩu',
      });
    }
  }

  return (
    <div className="resetpass-container" style={{ width: '450px' }}>
      <div className="resetpass-body">
        {isEmail && <div>
          <h2>Đổi mật khẩu</h2>

          <div style={{ marginBottom: "15px" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
            {errors.email && <span className="error-message-rp">{errors.email}</span>}
          </div>
          <div className="rp-btn">
            <button
              className="rp-submit-btn"
              onClick={handleSendOTP}
            >
              Gửi OTP
            </button>
          </div>


        </div>}
        {isOTP &&
          <div>
            <div style={{ marginBottom: "15px" }}>
              <h2>Nhập mã xác thực</h2>
              <label>Nhập mã xác thực gửi tới <span style={{ color: "#00b14f" }}>{email}</span></label>
              <input
                type="input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Nhập mã xác thực"
              />
            </div>

            <div className="rp-btn">
              <button
                className="rp-submit-btn"
                onClick={handleVerifyOTP}
              >Xác nhận</button>
            </div>
            <div className='otp-footer'>
              Chưa nhận được mã? <a className='resend-button' onClick={handleResend}>Gửi lại</a>
            </div>
          </div>}

        {isPass &&
          <div>
            <div style={{ marginBottom: "15px" }}>
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
              />
              {errors.newPassword && <span className="error-message-rp">{errors.newPassword}</span>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Nhập lại mật khẩu:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
              />
              {errors.confirmPassword && <span className="error-message-rp">{errors.confirmPassword}</span>}
            </div>
            <div className="rp-btn" >
              <button
                className="rp-submit-btn"
                onClick={handleSubmit}
              >Lưu mật khẩu</button>
            </div>
          </div>
        }
        <div className='otp-footer' style={{ marginTop: "20px" }}>
          Quay trở lại <a className='resend-button' onClick={handleLogin}>Đăng nhập</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
