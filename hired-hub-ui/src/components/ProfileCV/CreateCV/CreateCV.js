import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInformation } from '../../../redux/userSlice';
import images from '../../../assets/images';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { createCV } from '../../../redux/cvSlice';
import '../EditCV/EditCV.scss';

const CreateCV = () => {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    
    const [description, setDescription] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [skill, setSkill] = useState('');
    const [others, setOthers] = useState('');

    useEffect(() => {
        dispatch(fetchUserInformation());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCV = {
            description,
            education,
            experience,
            skill,
            others,
        };
        try {
            dispatch(createCV(newCV)).unwrap();
            navigate(`../qly-cv`);
        } catch (error) {
            console.error("Lỗi khi tạo CV:", error);
            alert("Vui lòng nhập đầy đủ thông tin CV.");
        }
    };

    return (
        <div className='edit text'>
            <h3 className='title-edit'>{`Tạo mới CV cho ${user?.firstName || ""} ${user?.lastName || ""}`}</h3>
            <form onSubmit={handleSubmit}>
                <div className="cv-review">
                    <div className='header'>
                        <div className="left_header">
                            <img className='img-cv'
                                src={images.cvAvatarDefault}
                                alt="User avatar"
                                data-v-88ff76e4=""
                            />
                        </div>
                        <div className="right_header">
                            <div className='top-name'/>
                            <div className="username-cv">
                                <p>
                                    <strong className="uns">{`${user?.firstName || ""} ${user?.lastName || ""}`}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='body-cv-1'>
                        <div className='left-body'>
                            <div className='cv-mo-ta'>
                                <p><strong>MÔ TẢ</strong></p>
                            </div>
                            <div className='cv-data'>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='right-body'>
                            <div className="ql-editor">
                                <p className="ql-align-left" style={{ textTransform: 'uppercase' }}>
                                    <strong>Thông tin cá nhân</strong>
                                </p>
                            </div>
                            {[
                                { icon: 'fa-calendar', placeholder: 'YYYY/MM/DD', value: user?.dob || 'YYYY/MM/DD' },
                                { icon: 'fa-phone', placeholder: '0123 456 789', value: user?.phoneNumber || '0123 456 789' },
                                { icon: 'fa-envelope', placeholder: 'tencuaban@example.com', value: email || 'tencuaban@example.com' },
                                { icon: 'fa-location-dot', placeholder: 'Quận A, thành phố Hà Nội', value: user?.address || 'Quận A, thành phố Hà Nội' }
                            ].map((item, index) => (
                                <div 
                                    className="render-item" 
                                    key={index} 
                                    style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginBottom: '10px' }}
                                >
                                    <i className={`fa ${item.icon}`} style={{ fontSize: '16px', marginRight: '10px' }}></i>
                                    <p style={{ margin: 0 }}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='body-cv-2'>
                        <div className='body-cv-left'>
                            <div className='cv-text'><strong>HỌC VẤN</strong></div>
                            <textarea
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            />
                        </div>
                        <div className='body-cv-right'>
                            <div className='cv-text'><strong>KINH NGHIỆM</strong></div>
                            <textarea
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='body-cv-2'>
                        <div className='body-cv-left'>
                            <div className='cv-text'><strong>KỸ NĂNG</strong></div>
                            <textarea
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                            />
                        </div>
                        <div className='body-cv-right'>
                            <div className='cv-text'><strong>KHÁC</strong></div>
                            <textarea
                                value={others}
                                onChange={(e) => setOthers(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button className='btn-submit' type="submit">Lưu CV</button>
            </form>
        </div>
    );
};

export default CreateCV;
