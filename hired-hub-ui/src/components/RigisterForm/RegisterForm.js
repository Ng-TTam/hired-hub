import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gLogo from '../../assets/images/google.png';
import {
    Building2Icon,
    CalendarDaysIcon,
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

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.account);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
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

    const validateField = (name, value) => {
        if (!value && touched[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: `${
                    name === 'email'
                        ? 'Email'
                        : name === 'firstName'
                        ? 'Họ'
                        : name === 'lastName'
                        ? 'Tên'
                        : name === 'password'
                        ? 'Mật khẩu'
                        : name === 'confirmPassword'
                        ? 'Nhập lại mật khẩu'
                        : name === 'phoneNumber'
                        ? 'Số điện thoại cá nhân'
                        : name === 'dob'
                        ? 'Ngày sinh'
                        : name === 'address'
                        ? 'Địa chỉ thường trú'
                        : ''
                } không được để trống`,
            }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fieldsToValidate = {
            email: account.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            password: account.password,
            confirmPassword: account.confirmPassword,
            phoneNumber: user.phoneNumber,
            address: user.address,
            dob: user.dob,
        };

        let isValid = true;
        Object.keys(fieldsToValidate).forEach((fieldName) => {
            if (!fieldsToValidate[fieldName]) {
                validateField(fieldName, fieldsToValidate[fieldName]);
                isValid = false;
            }
        });

        if (account.password !== account.confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: 'Mật khẩu không trùng khớp',
            }));
            isValid = false;
        }

        if (isValid) {
            const formData = {
                account: {
                    ...account,
                },
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    dob: user.dob,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                },
            };
            console.log('Form Data:', formData);
            dispatch(registerAccount(formData));
        }
    };

    useEffect(() => {
        if ( success ) {
            navigate('/verify-otp');
        }
    }, [success, navigate]);

    return (
        <div className="container">
            <form className="form-register" onSubmit={handleSubmit}>
                <div className="logo-app-auth">
                    <img src={images.logoApp} alt="logo-app" title="Logo của TopCV" />
                    <h1 className="label-register">Đăng ký</h1>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Email <span>*</span>
                    </label>
                    <div className="input-container-1">
                        <input
                            name="email"
                            type="email"
                            className="form-input-1"
                            placeholder="Email"
                            value={account.email}
                            onChange={handleAccountChange}
                            onBlur={handleBlur}
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
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-input-1"
                            name="password"
                            value={account.password}
                            onChange={handleAccountChange}
                            onBlur={handleBlur}
                            placeholder="Mật khẩu (từ 8 đến 25 ký tự)"
                        />
                        <Lock size={20} className="input-icon" />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        showPassword
                                            ? 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                            : 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                    <p className={`error-message ${errors.password ? 'show' : ''}`}>{errors.password}</p>
                </div>

                {/* Confirm Password Section - Update input */}
                <div className="form-group">
                    <label className="form-label">
                        Nhập lại mật khẩu <span>*</span>
                    </label>
                    <div className="input-container-1">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="form-input-1"
                            name="confirmPassword"
                            value={account.confirmPassword}
                            onChange={handleAccountChange}
                            onBlur={handleBlur}
                            placeholder="Nhập lại mật khẩu"
                        />
                        <Lock size={20} className="input-icon" />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        showConfirmPassword
                                            ? 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                            : 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                    <p className={`error-message ${errors.confirmPassword ? 'show' : ''}`}>{errors.confirmPassword}</p>
                </div>

                {/* User Information Section */}
                <div className="form-group">
                    <h2 className="form-section-title">Thông tin người dùng</h2>
                    <div className="form-grid">
                        {/* Name inputs */}
                        <div className="form-group">
                            <label className="form-label">
                                Họ và tên <span>*</span>
                            </label>
                            <div className="input-container-1" style={{ display: 'inline-flex' }}>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-input-1"
                                    placeholder="Họ"
                                    value={user.firstName}
                                    onChange={handleUserChange}
                                    onBlur={handleBlur}
                                />
                                <User2 size={20} className="input-icon" />
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-input-1"
                                    placeholder="Tên"
                                    value={user.lastName}
                                    onChange={handleUserChange}
                                    onBlur={handleBlur}
                                    style={{ marginLeft: '5px' }}
                                />
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
                                        onBlur={handleBlur}
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
                                        onBlur={handleBlur}
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
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    className="form-input-1"
                                    placeholder="Số điện thoại cá nhân"
                                    value={user.phoneNumber}
                                    onChange={handleUserChange}
                                    onBlur={handleBlur}
                                />
                                <PhoneIcon size={20} className="input-icon" />
                            </div>
                            <p className={`error-message ${errors.phoneNumber ? 'show' : ''}`}>{errors.phoneNumber}</p>
                        </div>

                        {/* Company */}
                        <div className="form-group">
                            <label className="form-label">
                                Ngày sinh <span>*</span>
                            </label>
                            <div className="input-container-1">
                                <input
                                    type="date"
                                    name="dob"
                                    id = "dob"
                                    className="form-input-1"
                                    value={user.dob}
                                    onChange={handleUserChange}
                                    onBlur={handleBlur}
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
                                <input
                                    type="text"
                                    name="address"
                                    className="form-input-1"
                                    placeholder="Nhập địa chỉ"
                                    value={user.address}
                                    onChange={handleUserChange}
                                    onBlur={handleBlur}
                                />
                                <Building2Icon size={20} className="input-icon" />
                            </div>
                            <p className={`error-message ${errors.addres ? 'show' : ''}`}>{errors.address}</p>
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
