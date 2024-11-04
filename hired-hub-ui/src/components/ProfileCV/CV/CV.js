import React, { useEffect } from 'react';
import './CV.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInformation } from '../../../redux/userSlice';

const CV = () => {
    const email = localStorage.getItem('email');
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUserInformation());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="cv-review">
            <div className="left">
                <img
                    src="https://static.topcv.vn/cv-builder/assets/default-avatar.fc9c40ba.png"
                    alt="User avatar"
                    data-v-88ff76e4=""
                />
                <div
                    className="ql-editor"
                    contentEditable="true"
                    data-placeholder="Thông tin cá nhân"
                    spellCheck="false"
                >
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
                    <div className="render-item" data-draggable="true" key={index}>
                        <i className={`fa ${item.icon}`} style={{ fontSize: '14px', marginRight: '12px' }}></i>
                        <div uid={`${Math.random()}`} style={{ alignSelf: 'flex-start' }}>
                            <p>{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="right"></div>
        </div>
    );
};

export default CV;
