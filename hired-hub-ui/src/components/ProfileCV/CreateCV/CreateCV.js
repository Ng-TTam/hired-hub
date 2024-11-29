import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../../assets/images';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { createCV, fetchCVs } from '../../../redux/cvSlice';
import './CreateCV.scss';
import Image from '../../Image';
import EditorContent from '../../EditorContent/EditorContent';

const CreateCV = () => {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    
    const [description, setDescription] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [skill, setSkill] = useState('');
    const [others, setOthers] = useState('');
    const [errors, setErrors] = useState({});

    const isContentEmpty = (htmlContent) => {
        if (!htmlContent) return true;
    
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlContent;
    
        const textContent = tempElement.textContent || tempElement.innerText || '';
        return textContent.trim() === '';
    };

    const validateForm = () => {
        const newErrors = {};
    
        if (isContentEmpty(description)) {
            newErrors.description = 'Mô tả không được để trống.';
        }
        if (isContentEmpty(education)) {
            newErrors.education = 'Học vấn không được để trống.';
        }
        if (isContentEmpty(experience)) {
            newErrors.experience = 'Kinh nghiệm không được để trống.';
        }
        if (isContentEmpty(skill)) {
            newErrors.skill = 'Kỹ năng không được để trống.';
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        const isValid = validateForm();
        if (isValid) {
            const newCV = {
                description : description,
                education: education,
                experience: experience,
                skill: skill,
                others: others,
            };
            try {
                await dispatch(createCV(newCV)).unwrap().then(() => {
                    dispatch(fetchCVs()); 
                    navigate(`../cv-management`);
                });
            } catch (error) {
                console.error("Lỗi khi tạo CV:", error);
                alert("Vui lòng nhập đầy đủ thông tin CV.");
            }   
        }
    };

    return (
        <div className='edit-text'>
            <h3 className='title-edit'>{`Tạo mới CV cho ${user?.firstName || ""} ${user?.lastName || ""}`}</h3>
            <div>
                <div className="cv-review">
                    <div className='header'>
                        <div className="left_header">
                            <Image className='img-cv-1'
                                src={user?.avatar || images.cvAvatarDefault}
                                alt="User avatar"
                                fallback={ images.cvAvatarDefault}
                                style={{maxWidth: "85%", maxHeight: "85%", objectFit:"cover", marginLeft:"auto" , marginRight:"auto"}}
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
                                <div className='input-mota'>
                                    <EditorContent className='input-cv-editor'
                                        value={description}
                                        onChange={setDescription}
                                    />
                                </div>
                                {errors.description && <span className="error-message-cv-crud">{errors.description}</span>}
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
                            <div className='input-cv'>
                                <EditorContent className="input-cv-editor"
                                    value={education}
                                    onChange={setEducation}
                                />
                            </div>
                            {errors.education && <span className="error-message-cv-crud">{errors.education}</span>}
                        </div>
                        <div className='body-cv-right'>
                            <div className='cv-text'><strong>KINH NGHIỆM</strong></div>
                            <div className='input-cv'>
                                <EditorContent className="input-cv-editor"
                                    value={experience}
                                    onChange={setExperience}
                                />
                            </div>
                            {errors.experience && <span className="error-message-cv-crud">{errors.experience}</span>}
                        </div>
                    </div>
                    <div className='body-cv-2'>
                        <div className='body-cv-left'>
                            <div className='cv-text'><strong>KỸ NĂNG</strong></div>
                            <div className='input-cv'>
                                <EditorContent className="input-cv-editor"
                                    value={skill}
                                    onChange={setSkill}
                                />
                            </div>
                            {errors.skill && <span className="error-message-cv-crud">{errors.skill}</span>}
                        </div>
                        <div className='body-cv-right'>
                            <div className='cv-text'><strong>KHÁC</strong></div>
                            <div className='input-cv'>
                                <EditorContent className="input-cv-editor"
                                    value={others}
                                    onChange={setOthers}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button className='btn-submit' onClick={handleSubmit}>Lưu CV</button>
            </div>
        </div>
    );
};

export default CreateCV;
