import React, { useEffect, useState } from 'react';
import './UpdateInfor.scss';
import ProfileJobSeeker from '../ProfileCV/ProfileJobSeeker/ProfileJobSeeker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInformation, updateInformation } from '../../redux/userSlice';

const UpdateInfor = () => {
    const {user, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);

    const [formData, setFormData] = useState({
        firstName: `${user?.firstName}`,
        lastName: `${user?.lastName}`,
        phoneNumber: `${user?.phoneNumber}`,
        dob: `${user?.dob}`,
        gender: `${user?.gender}`,
        address: `${user?.address}`,
        avatar: null,
    });

    useEffect(() => {
        if (!error) {
            setFormData({
                firstName: user?.firstName,
                lastName: user?.lastName,
                phoneNumber: user?.phoneNumber,
                dob: user?.dob,
                gender: user?.gender,
                address: user?.address,
                avatar: null,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dob') {
            const formattedDate = new Date(value).toISOString().split('T')[0];
            setFormData({
                ...formData,
                [name]: formattedDate,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
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

        const formDataU = new FormData();
        formDataU.append('firstName', formData.firstName);
        formDataU.append('lastName', formData.lastName);
        formDataU.append('dob', formData.dob);
        formDataU.append('address', formData.address);
        formDataU.append('phoneNumber', formData.phoneNumber);
        formDataU.append('gender', formData.gender);

        if (formData.avatar) {
            formDataU.append('avatar', formData.avatar);
        }

        for (let pair of formDataU.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const update = async() =>{
            try {
                await dispatch(updateInformation(formDataU)).unwrap();
                dispatch(fetchUserInformation());
                setIsError(false);
            } catch (error) {
                setIsError(true);
            }
        }
        update();
    };

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
                            placeholder="Nhập họ và tên"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
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
                            placeholder="Nhập họ và tên"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
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
                    </div>

                    <div className="ui-form-group">
                        <label>
                            Ngày Sinh{' '}
                            <span className="ui-required" style={{ color: 'red' }}>
                                *
                            </span>
                        </label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
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
                            <option value="OTHER">Khác</option>
                        </select>
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
                    </div>

                    <div className="ui-form-group">
                        <label>Ảnh đại diện</label>
                        <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
                    </div>
                    {isError && (
                        <div style={{marginBottom: '10px'}}>
                            <span style={{color: '#dc2f2f', fontSize: '14px'}}>* {error}</span>
                        </div>
                    )}

                    <div className="ui-btn">
                        <button onClick={handleSubmit} className="ui-submit-btn">
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
