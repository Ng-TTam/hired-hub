import React, { useEffect, useState } from 'react';
import './EmployerRegister.scss';
import register from '../../assets/images/register.png';
import { Building, Building2Icon, Loader, Lock, MailIcon, PhoneIcon, User2, WarehouseIcon } from 'lucide-react';
import { clearRegisterState, registerEmployer } from '../../redux/employerSilce';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProvinces } from '../../redux/provinceSlice';
import images from '../../assets/images';

const EmployerRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.employer);
    const navigate = useNavigate();

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
        companyName: '',
        province: '',
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

    const data = useSelector((state) => state.provinces.list);

    const handleProvinceChange = (event) => {
        const provinceId = event.target.value;
        const province = data.find((p) => p.id == provinceId);
        if (province) {
            setSelectedProvince(province);
            setUser((prevState) => ({
                ...prevState,
                province: province,
                district: '',
            }));
            setDistricts(province.districts);
            setIsDistrictDisabled(false);
        }
    };

    const handleDistrictChange = (event) => {
        const districtId = event.target.value;
        const district = districts.find((d) => d.id == districtId);
        if (district) {
            setSelectedDistrict(district);
            setUser((prevState) => ({
                ...prevState,
                district: district,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (!account.email || !/\S+@\S+\.\S+/.test(account.email)) errors.email = 'Email không hợp lệ';
        if (!user.firstName?.trim()) errors.firstName = 'Họ không được để trống';
        if (!user.lastName?.trim()) errors.lastName = 'Tên không được để trống';
        // if (!user.dob) errors.dob = 'Ngày sinh không được để trống';
        if (!user.gender) errors.gender = 'Giới tính không được để trống';
        if (!user.phoneNumber || !/^\d{10,11}$/.test(user.phoneNumber))
            errors.phoneNumber = 'Số điện thoại phải gồm 10-11 chữ số';
        if (!user.companyName?.trim()) errors.companyName = 'Tên công ty không được để trống';
        if (!user.province) errors.province = 'Tỉnh/Thành phố không được để trống';
        if (user.province && !user.district) errors.district = 'Quận/Huyện không được để trống';
        if (!account.password || account.password.length < 6) errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        if (account.password !== account.confirmPassword) errors.confirmPassword = 'Mật khẩu không trùng khớp';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        const formData = {
            account: { ...account },
            user: {
                firstName: user.firstName.trim(),
                lastName: user.lastName.trim(),
                dob: '2002-11-11',
                address: `${user.province.name}${user.district.name ? ` - ${user.district.name}` : ''}`,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
            },
            companyName: user.companyName,
            position: 'HR',
        };
        console.log('Form Data:', formData);
        dispatch(registerEmployer(formData));
    };

    useEffect(() => {
        dispatch(fetchProvinces());

        return () => {
            dispatch(clearRegisterState());
            if (success) navigate('/business/dashboard');
        };
    }, [dispatch, success, navigate]);

    return (
        <div className="register-container">
            <div className="register">
                <div className="form-container">
                    <img src={images.hiredHubLogoNoPadding} alt="logo-app" title="Logo của Hiredhub" />
                    <h2>Đăng ký dành cho nhà tuyển dụng</h2>
                    <span>Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm tại hiredhub</span>
                    <form style={{ marginTop: '30px' }} onSubmit={handleSubmit}>
                        {/* Email Section - Update input */}
                        <div className="form-group">
                            <label className="form-label">
                                Email đăng nhập <span>*</span>
                            </label>
                            <div className="input-container-1">
                                <input
                                    name="email"
                                    type="email"
                                    className="form-input-1"
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
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input-1"
                                    name="password"
                                    value={account.password}
                                    onChange={handleAccountChange}
                                    placeholder="Mật khẩu (từ 8 đến 25 ký tự)"
                                />
                                <Lock size={20} className="input-icon" />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {/* {showPassword && <Eye size={20}/>}
                                    {!showPassword && <EyeOffIcon size={20}/>} */}
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
                                    placeholder="Nhập lại mật khẩu"
                                />
                                <Lock size={20} className="input-icon" />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {/* {showConfirmPassword && <Eye size={20}/>}
                                    {!showConfirmPassword && <EyeOffIcon size={20}/>} */}
                                </button>
                            </div>
                            <p className={`error-message ${errors.confirmPassword ? 'show' : ''}`}>
                                {errors.confirmPassword}
                            </p>
                        </div>

                        {/* User Information Section */}
                        <div className="form-group">
                            <h2 className="form-section-title">Thông tin nhà tuyển dụng</h2>
                            <div className="form-grid">
                                {/* Name inputs */}
                                <div className="form-group">
                                    <div style={{ display: 'inline-flex' }}>
                                        <div className="form-group" style={{ marginBottom: '0px' }}>
                                            <label className="form-label">
                                                Họ <span>*</span>
                                            </label>
                                            <div className="input-container-1">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-input-1"
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
                                        <div className="form-group" style={{ marginBottom: '0px' }}>
                                            <label className="form-label" style={{ marginLeft: '5px' }}>
                                                Tên <span>*</span>
                                            </label>
                                            <div className="input-container-1">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-input-1"
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
                                    <div className="radio-group" style={{ padding: '9px' }}>
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
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            className="form-input-1"
                                            placeholder="Số điện thoại cá nhân"
                                            value={user.phoneNumber}
                                            onChange={handleUserChange}
                                        />
                                        <PhoneIcon size={20} className="input-icon" />
                                    </div>
                                    <p className={`error-message ${errors.phoneNumber ? 'show' : ''}`}>
                                        {errors.phoneNumber}
                                    </p>
                                </div>

                                {/* Company */}
                                <div className="form-group">
                                    <label className="form-label">
                                        Công ty <span>*</span>
                                    </label>
                                    <div className="input-container-1">
                                        <input
                                            type="text"
                                            name="companyName"
                                            className="form-input-1"
                                            placeholder="Tên công ty"
                                            value={user.companyName}
                                            onChange={handleUserChange}
                                        />
                                        <Building size={20} className="input-icon" />
                                    </div>
                                    <p className={`error-message ${errors.companyName ? 'show' : ''}`}>
                                        {errors.companyName}
                                    </p>
                                </div>

                                {/* Province Selection */}
                                <div className="form-group">
                                    <label className="form-label">
                                        Địa điểm làm việc <span>*</span>
                                    </label>
                                    <div className="input-container-1">
                                        <select
                                            className="select-input"
                                            name="province"
                                            value={selectedProvince.id}
                                            onChange={handleProvinceChange}
                                        >
                                            <option value="">Chọn Tỉnh/Thành phố</option>
                                            {data.map((province) => (
                                                <option key={province.id} value={province.id}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                        <Building2Icon size={20} className="input-icon" />
                                    </div>
                                    <p className={`error-message ${errors.province ? 'show' : ''}`}>
                                        {errors.province}
                                    </p>
                                    {error && <p className="error-message show">{error.message}</p>}
                                </div>

                                {/* District Selection */}
                                <div className="form-group">
                                    <label className="form-label">Quận/huyện</label>
                                    <div className="input-container-1">
                                        <select
                                            className="select-input"
                                            name="district"
                                            value={selectedDistrict.id}
                                            onChange={handleDistrictChange}
                                            disabled={isDistrictDisabled}
                                        >
                                            <option value="">Chọn Quận/Huyện</option>
                                            {districts.map((district) => (
                                                <option key={district.id} value={district.id}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </select>
                                        <WarehouseIcon size={20} className="input-icon" />
                                    </div>
                                    <p className={`error-message ${errors.district ? 'show' : ''}`}>
                                        {errors.district}
                                    </p>
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
            </div>
            <div className="image-container">
                <img src={register} alt="Register illustration" />
            </div>
        </div>
    );
};

export default EmployerRegister;
