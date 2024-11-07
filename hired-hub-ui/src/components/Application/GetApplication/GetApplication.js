import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetApplication.scss';
import { fetchApplication } from '../../../redux/applicationSlice';
import { Link, useParams } from 'react-router-dom';

const GetApplication = () => {
    const { applicationId } = useParams();

    const dispatch = useDispatch();
    const { application, loading, error } = useSelector(state => state.application);

    useEffect(() => {
        dispatch(fetchApplication(applicationId));
    }, [dispatch, applicationId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="application">
            <h2 className="application__title">Thông Tin Ứng Tuyển</h2>
            <div className="application__content">
                <div className="application__item">
                    <span className="application__label">Trạng thái:</span>
                    <span className={`application__status application__status--${application?.status.toLowerCase()}`}>{application?.status}</span>
                </div>
                <div className="application__item">
                    <span className="application__label">Lời nhắn từ nhà tuyển dụng:</span>
                    <p className="application__message">{application?.message}</p>
                </div>
                <div className="application__item">
                    <span className="application__label">CV:</span>
                    <Link to={`../xem-cv/${application?.cv.id}`}  className="application__cvName">{application?.cv.description}</Link>
                </div>
                <div className="application__item">
                    <span className="application__label">Post:</span>
                    <Link to={`../posting/${application?.posting.id}`} className="application__postName">{application?.posting.title}</Link>
                </div>
            </div>
        </div>
    );
};

export default GetApplication;
