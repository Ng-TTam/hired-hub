import React, { useEffect } from 'react';
import './CV.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInformation } from '../../../redux/userSlice';
import images from '../../../assets/images';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useParams } from 'react-router-dom';
import { fetchCV } from '../../../redux/cvSlice';
import Image from '../../Image';

const CV = () => {

    const { cvId } = useParams();

    const email = localStorage.getItem('email');
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.user);
    const {cv:cv} = useSelector(state => state.cv)

    useEffect(() => {
        dispatch(fetchUserInformation());
        dispatch(fetchCV(cvId));
    }, [dispatch, cvId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="cv-review">
            <div className='header'>
                <div className="left_header">
                    <Image className='img-cv-1'
                        src={user?.avatar || images.cvAvatarDefault}
                        alt="User avatar"
                        fallback={ images.cvAvatarDefault}
                        style={{maxWidth: "85%", maxHeight: "85%%", objectFit:"cover", marginLeft:"auto" , marginRight:"auto"}}
                    />
                    
                </div>
                <div className="right_header">
                    <div className='top-name'/>
                    <div className="username-cv">
                        <p>
                        <strong className="uns">{`${user?.firstName || ""} ${user?.lastName || ""}` || "Nguyễn Đăng Tùng"}</strong>

                        </p>
                    </div>
                </div>
            </div>
            <div className='body-cv-1'>
                <div className='left-body'>
                    <div className='cv-mo-ta'>
                        <p>
                            <strong >MÔ TẢ</strong>
                        </p>
                    </div>
                    <div className='cv-data-r'>
                        <p>
                            <strong >{cv?.description}</strong>
                        </p>
                    </div>
                </div>
                <div className='right-body'>
                    <div
                        className="ql-editor"
                        contentEditable="true"
                        data-placeholder="Thông tin cá nhân"
                        spellCheck="false">
                        <p className="ql-align-left" style={{ textTransform: 'uppercase' }}>
                            <strong className="ql-font-Roboto ql-size-18px">Thông tin cá nhân</strong>
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
                            data-draggable="true" 
                            key={index} 
                            style={{ display: 'flex', alignItems: 'center', marginTop: '15px',marginBottom: '10px' }}
                        >
                            <i className={`fa ${item.icon}`} style={{ fontSize: '16px', marginRight: '10px' }}></i>
                            <p style={{ margin: 0 }}>{item.value}</p>
                        </div>
                    ))}
                </div>
            
            </div>
            <div className='body-cv-2'>
                <div className='body-cv-left'>
                    <div className='cv-text'>
                        <p>
                            <strong>HỌC VẤN</strong>
                        </p>
                    </div>
                    <div className='cv-data-r'>
                        <p>
                            <strong >{cv?.education}</strong>
                        </p>
                    </div>
                </div>
                <div className='body-cv-right'>
                    <div className='cv-text'>
                        <p>
                            <strong>KINH NGHIỆM</strong>
                        </p>
                    </div>
                    <div className='cv-data-r'>
                        <p>
                            <strong >{cv?.experience}</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div className='body-cv-2'>
                <div className='body-cv-left'>
                    <div className='cv-text'>
                        <p>
                            <strong>KỸ NĂNG</strong>
                        </p>
                    </div>
                    <div className='cv-data-r'>
                        <p>
                            <strong >{cv?.skill}</strong>
                        </p>
                    </div>
                </div>
                <div className='body-cv-right'>
                    <div className='cv-text'>
                        <p>
                            <strong>KHÁC</strong>
                        </p>
                    </div>
                    <div className='cv-data-r'>
                        <p>
                            <strong >{cv?.others}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CV;
