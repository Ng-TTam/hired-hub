import React, { useEffect, useState } from 'react';
import './UpdateInfor.scss';
import ProfileJobSeeker from '../ProfileCV/ProfileJobSeeker/ProfileJobSeeker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInformation, updateInformation } from '../../redux/userSlice';
import { fetchPostions } from '../../redux/postionCategorySlice';

const UpdateInfor = () => {
    const { user, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [availablePositions, setAvailablePositions] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dob: '',
        gender: '',
        address: '',
        position: null,
        avatar: '',
    });

    const isEmployer = user?.account.role === 'EMPLOYER';

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Họ không được để trống.';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Tên không được để trống.';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Số điện thoại không được để trống.';
        } else if (formData.phoneNumber.trim().length < 7 || formData.phoneNumber.trim().length > 13) {
            newErrors.phoneNumber = 'Số điện thoại phải từ 7 đến 13 ký tự.';
        }
        if (!formData.dob.trim()) {
            newErrors.dob = 'Ngày sinh không được để trống.';
        }
        if (!formData.gender.trim()) {
            newErrors.gender = 'Vui lòng chọn giới tính.';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Địa chỉ không được để trống.';
        }
        if (isEmployer && !formData.position) {
            newErrors.position = 'Vui lòng chọn vị trí.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (!error) {
            setFormData({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                phoneNumber: user?.phoneNumber || '',
                dob: user?.dob || '',
                gender: user?.gender || '',
                address: user?.address || '',
                position: user?.position?.id || '',
                avatar: user?.avatar || '',
            });
        }
    }, [user, error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'dob' ? new Date(value).toISOString().split('T')[0] : value,
        });
    };

    const handlePositionChange = (event) => {
        const position = event.target.value;
            setFormData({
                ...formData,
                position: position,
            });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setFormData({
            ...formData,
            [name]: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formDataU = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) formDataU.append(key, formData[key]);
        });

        try {
            await dispatch(updateInformation(formDataU)).unwrap();
            dispatch(fetchUserInformation());
        } catch (error) {
            console.error('Error updating information:', error);
        }
    };

    useEffect(() => {
        if (isEmployer) {
            dispatch(fetchPostions())
                .then((data) => {
                    setAvailablePositions(data.payload);
                })
                .catch((err) => console.error('Error fetching positions:', err));
        }
    }, [isEmployer, dispatch]);

    return (
        <div className="ui-container">
            <div className="ui-form-container">
                <h2>Cài đặt thông tin cá nhân</h2>
                <p className="ui-form-note">
                    <span className="ui-required">*</span> Các thông tin bắt buộc
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="ui-form-group">
                        <label>
                            Họ{' '}
                            <span className="ui-required" style={{ color: 'red' }}>
                                *
                            </span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Nhập họ"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <span className="error-message-ui">{errors.firstName}</span>}
                    </div>

                    <div className="ui-form-group">
                        <label>
                            Tên{' '}
                            <span className="ui-required" style={{ color: 'red' }}>
                                *
                            </span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Nhập tên"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <span className="error-message-ui">{errors.lastName}</span>}
                    </div>

                    <div className="ui-form-group">
                        <label>
                            Số điện thoại{' '}
                            <span className="ui-required" style={{ color: 'red' }}>
                                *
                            </span>
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <span className="error-message-ui">{errors.phoneNumber}</span>}
                    </div>

                    <div className="ui-form-group">
                        <label>
                            Ngày Sinh{' '}
                            <span className="ui-required" style={{ color: 'red' }}>
                                *
                            </span>
                        </label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                        {errors.dob && <span className="error-message-ui">{errors.dob}</span>}
                    </div>

                    <div className="ui-form-group">
                        <label>
                            Giới Tính{' '}
                            <span className="ui-required" style={{ color: 'red' }}>
                                *
                            </span>
                        </label>
                        <select className="ui-date" name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="" disabled>
                                Chọn giới tính
                            </option>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                        </select>
                        {errors.gender && <span className="error-message-ui">{errors.gender}</span>}
                    </div>

                    <div className="ui-form-group">
                        <label>
                            Địa chỉ{' '}
                            <span className="ui-required" style={{ color: 'red' }}>
                                *
                            </span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <span className="error-message-ui">{errors.address}</span>}
                    </div>

                    {isEmployer && (
                        <div className="ui-form-group">
                            <label>
                                Vị trí{' '}
                                <span className="ui-required" style={{ color: 'red' }}>
                                    *
                                </span>
                            </label>
                            <select className="ui-date" name="position" value={formData.position || ''} onChange={handlePositionChange}>
                                <option value="">
                                    Chọn vị trí
                                </option>
                                {availablePositions?.map((pos) => (
                                    <option key={pos.id} value={pos.id}>
                                        {pos.name}
                                    </option>
                                ))}
                            </select>
                            {errors.position && <span className="error-message-ui">{errors.position}</span>}
                        </div>
                    )}

                    <div className="ui-form-group">
                        <label>Ảnh đại diện</label>
                        <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <div className="ui-btn">
                        <button type="submit" className="ui-submit-btn">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>

            <div className="ui-profile-js">
                <ProfileJobSeeker />
            </div>
        </div>
    );
};

export default UpdateInfor;
