import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOTPResetPassState, clearResetPassState, forgotPass, sendResetPassOtp, verifyResetPassOtp } from "../../redux/accountSlice";
import './ChangePassword.scss';
import ProfileJobSeeker from "../ProfileCV/ProfileJobSeeker/ProfileJobSeeker";
import { notification } from "antd";

const ChangePassword = () => {
  const user = useSelector(state => state.user.user);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isBody, setIsBody] = useState(true);

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    if (!newPassword || newPassword.trim().length < 8 || newPassword.trim().length > 25) {
      newErrors.newPassword = 'Mật khẩu dài từ 8 - 25 ký tự';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không trùng khớp';
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

  const handleResetPassword = () => {
    setErrors(null);
    if (!validateForm()) return;
    dispatch(sendResetPassOtp(user?.account?.email));
    setIsBody(false);
  };

  const handleResend = (event) => {
    event.preventDefault();
    dispatch(sendResetPassOtp(user?.account?.email));
  }

  const handleSubmit = async () => {
    const email = user?.account?.email;
    dispatch(clearOTPResetPassState());

    try {
      const keyRest = await dispatch(verifyResetPassOtp({ email, otp })).unwrap();
      if (keyRest.data) {
        const newPassAccountData = {
          email: user?.account?.email,
          newPassword: newPassword,
        };
        const key = keyRest.data;
        const success = await dispatch(forgotPass({ key, newPassAccountData })).unwrap();
        if (success) {
          notification.success({
            message: 'Thành công',
            description: 'Cập nhật mật khẩu thành công',
          });
          dispatch(clearOTPResetPassState());
          dispatch(clearResetPassState());
          setNewPassword("");
          setConfirmPassword("");
          setOtp("");
          setIsBody(true);
        }
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Mã xác thực không hợp lệ',
      });
    }
  }

  return (
    <div className="resetpass-container">
      <div className="resetpass-body">
        {isBody && <div>
          <h2>Đổi mật khẩu</h2>

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

          <div className="rp-btn">
            <button
              className="rp-submit-btn"
              onClick={handleResetPassword}
            >
              Lưu mật khẩu
            </button>
          </div>


        </div>}
        {!isBody &&
          <div>
            <div style={{ marginBottom: "15px" }}>
              <h2>Nhập mã xác thực</h2>
              <label>Nhập mã xác thực gửi tới <span style={{ color: "#00b14f" }}>{user?.account?.email}</span></label>
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
                onClick={handleSubmit}
              >Xác nhận</button>
            </div>
            <div className='otp-footer'>
              Chưa nhận được mã? <a className='resend-button' onClick={handleResend}>Gửi lại</a>
            </div>
          </div>}
      </div>
      <div className="resetpass-profile">
        <ProfileJobSeeker></ProfileJobSeeker>
      </div>
    </div>
  );
};

export default ChangePassword;
