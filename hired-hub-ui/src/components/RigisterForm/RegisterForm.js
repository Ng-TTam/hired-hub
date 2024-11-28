import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Building2Icon,
    CalendarDaysIcon,
    Eye,
    EyeOffIcon,
    Loader,
    Lock,
    MailIcon,
    PhoneIcon,
    User2,
} from 'lucide-react';
import images from '../../assets/images';
import './RegisterForm.scss';
import '../EmloyerRegister/EmployerRegister.scss';
import { useNavigate } from 'react-router-dom';
import { registerAccount } from '../../redux/accountSlice';
import { Input } from 'antd';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.account);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const urlSignIn = 'http://localhost:3000/login';

    const [account, setAccount] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        dob: '',
        address: '',
        district: '',
    });

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setAccount((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGenderChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            gender: e.target.value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setIsTermsChecked(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!account.email || !/\S+@\S+\.\S+/.test(account.email)) {
            errors.email = 'Email không hợp lệ';
        }
        if (!user.firstName?.trim()) {
            errors.firstName = 'Họ không được để trống';
        }
        if (!user.lastName?.trim()) {
            errors.lastName = 'Tên không được để trống';
        }
        if (!user.dob) {
            errors.dob = 'Ngày sinh không được để trống';
        }
        if (!user.gender) {
            errors.gender = 'Giới tính không được để trống';
        }
        if (!user.address?.trim()) {
            errors.address = 'Địa chỉ không được để trống';
        }
        if (!user.phoneNumber || !/^\d{10,11}$/.test(user.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại phải gồm 10-11 chữ số';
        }
        if (!account.password || account.password.length < 8 || account.password.length > 25) {
            errors.password = 'Mật khẩu dài từ 8 - 25 ký tự';
        }
        if (account.password !== account.confirmPassword) {
            errors.confirmPassword = 'Mật khẩu không trùng khớp';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        const formData = {
            account: { ...account },
            user: {
                firstName: user.firstName.trim(),
                lastName: user.lastName.trim(),
                dob: user.dob,
                address: user.address.trim(),
                phoneNumber: user.phoneNumber,
                gender: user.gender,
            },
        };
        dispatch(registerAccount(formData));
    };
    

    useEffect(() => {
        if (success) {
            navigate('/verify-otp');
        }
    }, [success, navigate]);

    return (
        <div className="container1">
            <form className="form-register" onSubmit={handleSubmit}>
                <div className="logo-app-auth-1">
                    <img src={images.logoApp} alt="logo-app" title="Logo của Hiredhub" />
                    <h1 className="label-register">Đăng ký</h1>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Email <span>*</span>
                    </label>
                    <div className="input-container-1">
                        <Input
                            name="email"
                            type="email"
                            className="form-input-2"
                            placeholder="Email"
                            value={account.email}
                            onChange={handleAccountChange}
                        />
                        <MailIcon size={20} className="input-icon" />
                    </div>
                    <p className={`error-message ${errors.email ? 'show' : ''}`}>{errors.email}</p>
                </div>

                {/* Password Section - Update input */}
                <div className="form-group">
                    <label className="form-label">
                        Mật khẩu <span>*</span>
                    </label>
                    <div className="input-container-1">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            className="form-input-2"
                            name="password"
                            value={account.password}
                            onChange={handleAccountChange}
                            placeholder="Mật khẩu (từ 8 đến 25 ký tự)"
                        />
                        <Lock size={20} className="input-icon" />
                    </div>
                    <p className={`error-message ${errors.password ? 'show' : ''}`}>{errors.password}</p>
                </div>

                {/* Confirm Password Section - Update input */}
                <div className="form-group">
                    <label className="form-label">
                        Nhập lại mật khẩu <span>*</span>
                    </label>
                    <div className="input-container-1">
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="form-input-2"
                            name="confirmPassword"
                            value={account.confirmPassword}
                            onChange={handleAccountChange}
                            placeholder="Nhập lại mật khẩu"
                        />
                        <Lock size={20} className="input-icon" />
                    </div>
                    <p className={`error-message ${errors.confirmPassword ? 'show' : ''}`}>{errors.confirmPassword}</p>
                </div>

                {/* User Information Section */}
                <div className="form-group">
                    <h2 className="form-section-title">Thông tin người dùng</h2>
                    <div className="form-grid">
                        {/* Name inputs */}
                        <div className="form-group">
                            <div style={{ display: 'inline-flex' }}>
                                <div className="form-group" style={{marginBottom: '0px'}}>
                                    <label className="form-label">
                                        Họ <span>*</span>
                                    </label>
                                    <div className="input-container-1">
                                        <Input
                                            type="text"
                                            name="firstName"
                                            className="form-input-2"
                                            placeholder="Họ"
                                            value={user.firstName}
                                            onChange={handleUserChange}
                                        />
                                        <User2 size={20} className="input-icon" />
                                    </div>
                                    <p className={`error-message ${errors.firstName ? 'show' : ''}`}>
                                        {errors.firstName}
                                    </p>
                                </div>
                                <div className="form-group" style={{marginBottom: '0px'}}>
                                    <label className="form-label" style={{marginLeft: '5px'}}>
                                        Tên <span>*</span>
                                    </label>
                                    <div className="input-container-1">
                                        <Input
                                            type="text"
                                            name="lastName"
                                            className="form-input-2"
                                            placeholder="Tên"
                                            value={user.lastName}
                                            onChange={handleUserChange}
                                            style={{ marginLeft: '5px', paddingLeft: '7px' }}
                                        />
                                    </div>
                                    <p
                                        className={`error-message ${errors.lastName ? 'show' : ''}`}
                                        style={{ marginLeft: '5px' }}
                                    >
                                        {errors.lastName}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gender Selection */}
                        <div className="form-group">
                            <label className="form-label">
                                Giới tính <span>*</span>
                            </label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="MALE"
                                        checked={user.gender === 'MALE'}
                                        onChange={handleGenderChange}
                                    />
                                    <span>Nam</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="FEMALE"
                                        checked={user.gender === 'FEMALE'}
                                        onChange={handleGenderChange}
                                    />
                                    <span>Nữ</span>
                                </label>
                            </div>
                            <p className={`error-message ${errors.gender ? 'show' : ''}`}>{errors.gender}</p>
                        </div>

                        {/* Phone Number */}
                        <div className="form-group">
                            <label className="form-label">
                                Số điện thoại cá nhân <span>*</span>
                            </label>
                            <div className="input-container-1">
                                <Input
                                    type="tel"
                                    name="phoneNumber"
                                    className="form-input-2"
                                    placeholder="Số điện thoại cá nhân"
                                    value={user.phoneNumber}
                                    onChange={handleUserChange}
                                />
                                <PhoneIcon size={20} className="input-icon" />
                            </div>
                            <p className={`error-message ${errors.phoneNumber ? 'show' : ''}`}>{errors.phoneNumber}</p>
                        </div>

                        {/* Date of birth */}
                        <div className="form-group">
                            <label className="form-label">
                                Ngày sinh <span>*</span>
                            </label>
                            <div className="input-container-1">
                                <input
                                    type="date"
                                    name="dob"
                                    id="dob2"
                                    className="form-input-2"
                                    value={user.dob}
                                    onChange={handleUserChange}
                                />
                                <CalendarDaysIcon size={20} className="input-icon" />
                            </div>
                            <p className={`error-message ${errors.dob ? 'show' : ''}`}>{errors.dob}</p>
                        </div>

                        {/* Province Selection */}
                        <div className="form-group">
                            <label className="form-label">
                                Địa chỉ thường trú<span>*</span>
                            </label>
                            <div className="input-container-1">
                                <Input
                                    type="text"
                                    name="address"
                                    className="form-input-2"
                                    placeholder="Nhập địa chỉ"
                                    value={user.address}
                                    onChange={handleUserChange}
                                />
                                <Building2Icon size={20} className="input-icon" />
                            </div>
                            <p className={`error-message ${errors.address ? 'show' : ''}`}>{errors.address}</p>
                            {error && <p className="error-message show">{error.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Form Footer */}
                <div className="registration-footer">
                    <div className="checkbox-container">
                        <input type="checkbox" id="terms" onChange={handleCheckboxChange} />
                        <label htmlFor="terms">
                            Tôi đã đọc và đồng ý với{' '}
                            <a href="#" className="primary-link">
                                Điều khoản dịch vụ
                            </a>{' '}
                            và{' '}
                            <a href="#" className="primary-link">
                                Chính sách bảo mật
                            </a>{' '}
                        </label>
                    </div>

                    <button type="submit" className="submit-button" disabled={!isTermsChecked}>
                        {loading ? <Loader size={16} /> : 'Hoàn tất'}
                        {success && <p>Đăng ký thành công!</p>}
                    </button>

                    <div className="login-prompt">
                        Đã có tài khoản?{' '}
                        <a href={urlSignIn} className="primary-link">
                            Đăng nhập ngay
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
