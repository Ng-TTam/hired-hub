import React, { useState } from 'react';
import './EmployerRegister.scss';
import register from '../../assets/images/register.png';
import {Building, Building2Icon, Lock, MailIcon, PhoneIcon, User2, WarehouseIcon} from 'lucide-react';


const EmployerRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    const urlSignIn = 'http://localhost:3000/login';

    const [account, setAccount] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        company: '',
        province: '',
        district: '',
    });

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleGenderChange = (e) => {
        setUser(prevState => ({
            ...prevState,
            gender: e.target.value
        }));
    };

    const handleCheckboxChange = (e) => {
        setIsTermsChecked(e.target.checked);
    };

    const data = {
        'Hà Nội': ['Ba Đình', 'Đống Đa', 'Hai Bà Trưng'],
        'Hồ Chí Minh': ['Quận 1', 'Quận 3', 'Quận 5'],
        'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Sơn Trà'],
    };

    const handleProvinceChange = (event) => {
        const province = event.target.value;
        setSelectedProvince(province);
        setUser(prevState => ({
            ...prevState,
            province: province,
            district: ''
        }));

        if (province && data[province]) {
            setDistricts(data[province]);
            setIsDistrictDisabled(false);
        } else {
            setDistricts([]);
            setIsDistrictDisabled(true);
            setSelectedDistrict('');
        }
    };

    const handleDistrictChange = (event) => {
        const district = event.target.value;
        setSelectedDistrict(district);
        setUser(prevState => ({
            ...prevState,
            district: district
        }));
    };

    const validateField = (name, value) => {
        if (!value && touched[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: `${name === 'email' ? 'Email' : 
                         name === 'firstName' ? 'Họ' :
                         name === 'lastName' ? 'Tên' :
                         name === 'password' ? 'Mật khẩu' :
                         name === 'confirmPassword' ? 'Nhập lại mật khẩu' :
                         name === 'phoneNumber' ? 'Số điện thoại cá nhân' :
                         name === 'province' ? 'Tỉnh/thành phố' : ''} không được để trống`
            }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
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
            province: user.province
        };
    
        let isValid = true;
        Object.keys(fieldsToValidate).forEach(fieldName => {
            if (!fieldsToValidate[fieldName]) {
                validateField(fieldName, fieldsToValidate[fieldName]);
                isValid = false;
            }
            if (user.password !== user.confirmPassword){
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: 'Mật khẩu không trùng khớp'
                }));
                isValid = false;
            }
        });
    
        if (isValid) {
            const formData = {
                account: {
                    ...account
                },
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    dob: "",
                    address: user.province + (user.district === '' ? '' : " - " + user.district),
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                }
            };
            console.log('Form Data:', formData);
        }
    };

    return (
        <div className="register-container">
            <div className="register">
                <div className="form-container">
                    <h2>Đăng ký dành cho nhà tuyển dụng</h2>
                    <span>Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm tại hired hub</span>
                    <form style={{ marginTop: '30px' }} onSubmit={handleSubmit}>
                        {/* Email Section - Update input */}
                        <div className="form-group">
                            <label className="form-label">Email đăng nhập <span>*</span></label>
                            <div className="input-container">
                                <input
                                    name="email"
                                    type="email"
                                    className="form-input"
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
                            <label className="form-label">Mật khẩu <span>*</span></label>
                            <div className="input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
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
                            <label className="form-label">Nhập lại mật khẩu <span>*</span></label>
                            <div className="input-container">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="form-input"
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
                            <h2 className="form-section-title">Thông tin nhà tuyển dụng</h2>
                            <div className="form-grid">
                                {/* Name inputs */}
                                <div className="form-group">
                                    <label className="form-label">Họ và tên <span>*</span></label>
                                    <div className="input-container" style={{ display: 'inline-flex' }}>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className="form-input"
                                            placeholder="Họ"
                                            value={user.firstName}
                                            onChange={handleUserChange}
                                            onBlur={handleBlur}
                                        />
                                        <User2 size={20} className="input-icon" />
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-input"
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
                                    <label className="form-label">Giới tính <span>*</span></label>
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
                                    <label className="form-label">Số điện thoại cá nhân <span>*</span></label>
                                    <div className="input-container">
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            className="form-input"
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
                                    <label className="form-label">Công ty <span>*</span></label>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            name="company"
                                            className="form-input"
                                            placeholder="Tên công ty"
                                            value={user.company}
                                            onChange={handleUserChange}
                                            onBlur={handleBlur}
                                        />
                                        <Building size={20} className="input-icon"/>
                                    </div>
                                    <p className={`error-message ${errors.company ? 'show' : ''}`}>{errors.company}</p>
                                </div>

                                {/* Province Selection */}
                                <div className="form-group">
                                    <label className="form-label">Địa điểm làm việc <span>*</span></label>
                                    <div className="input-container">
                                        <select
                                            className="select-input"
                                            name="province"
                                            value={selectedProvince}
                                            onChange={handleProvinceChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="">Chọn Tỉnh/Thành phố</option>
                                            {Object.keys(data).map((province) => (
                                                <option key={province} value={province}>
                                                    {province}
                                                </option>
                                            ))}
                                        </select>
                                        <Building2Icon size={20} className="input-icon"/>
                                    </div>
                                    <p className={`error-message ${errors.province ? 'show' : ''}`}>{errors.province}</p>
                                </div>

                                {/* District Selection */}
                                <div className="form-group">
                                    <label className="form-label">Quận/huyện</label>
                                    <div className="input-container">
                                        <select
                                            className="select-input"
                                            name="district"
                                            value={selectedDistrict}
                                            onChange={handleDistrictChange}
                                            disabled={isDistrictDisabled}
                                        >
                                            <option value="">Chọn Quận/Huyện</option>
                                            {districts.map((district) => (
                                                <option key={district} value={district}>
                                                    {district}
                                                </option>
                                            ))}
                                        </select>
                                        <WarehouseIcon size={20} className="input-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className="registration-footer">
                            <div className="checkbox-container">
                                <input type="checkbox" id="terms" onChange={handleCheckboxChange}/>
                                <label htmlFor="terms">
                                    Tôi đã đọc và đồng ý với{' '}
                                    <a href="#" className="primary-link">Điều khoản dịch vụ</a>{' '}
                                    và{' '}
                                    <a href="#" className="primary-link">Chính sách bảo mật</a>{' '}
                                </label>
                            </div>

                            <button type="submit" className="submit-button" disabled={!isTermsChecked} >
                                Hoàn tất
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
            </div>
            <div className="image-container">
                <img src={register} alt="Register illustration" />
            </div>
        </div>
    );
};

export default EmployerRegister;