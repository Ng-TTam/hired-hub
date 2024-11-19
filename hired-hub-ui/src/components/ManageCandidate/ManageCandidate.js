import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/Table.scss';
import images from '../../assets/images/index';
import { fetchApplications, resetApplication, setApplicationStatus } from '../../redux/applicationSlice';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import './ManageCandidate.scss'
import CVReview from '../ProfileCV/CVReview/CVReview';
import Image from '../Image';

const ManageCandidate = () => {
    const dispatch = useDispatch();
    const {applications} = useSelector(state => state.application);

    useEffect(() => {
        dispatch(fetchApplications());
        return () => {
            dispatch(resetApplication());
        };
    }, [dispatch]);

    const handCV = (application) => {
        window.open(`../business/cv-review/${application.id}`, '_blank');
    }

    const handPosting = (application) => {
        window.open(`../business/posting/${application.posting.id}`, '_blank');
    }

    const handApproved = async(applicationId) =>{
        const applicationStatus =  {applicationStatus : "APPROVED"};
        await dispatch(setApplicationStatus({ applicationId, applicationStatus })).unwrap();
        dispatch(fetchApplications());
    }

    const handRejected = async(applicationId) =>{
        const applicationStatus =  {applicationStatus : "REJECTED"};
        await dispatch(setApplicationStatus({ applicationId, applicationStatus })).unwrap();
        dispatch(fetchApplications());
    }

    const handPending = async(applicationId) =>{
        const applicationStatus =  {applicationStatus : "PENDING"};
        await dispatch(setApplicationStatus({ applicationId, applicationStatus })).unwrap();
        dispatch(fetchApplications());
    }

    return (
        <table className="custom-table">
            <thead>
                <tr>
                <th>Ứng viên</th>
                <th>CV</th>
                <th>Bài tuyển dụng</th>
                <th>Thông tin liên hệ</th>
                <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {applications?.map(application => (
                <tr key={application?.id}>
                    <td className="candidate-info">
                        <div className="cv-manage-image">
                            <Image
                            src={application?.cv?.jobSeeker?.avatar}
                            alt={application?.cv.id}
                            fallback={ images.avatarDefault}
                            className="avatar"
                            />
                        </div>
                        <div className="cv-manage-name">
                            {application?.cv?.jobSeeker?.firstName} {application?.cv?.jobSeeker?.lastName || "Nguyễn Văn A"}
                        </div>
                    </td>
                    <td style={{textAlign:"center", verticalAlign:"middle"}}>
                        <div className="cv-description" onClick={() => handCV(application)}>
                            {application?.cv?.description || "CV Description"}
                        </div>
                        <div className="cv-update-time">
                            Cập nhật: {application?.cv.updatedAt ? `${formatDistanceToNow(new Date(application.cv.updatedAt), { locale: vi })} trước` : "Vừa xong"}
                        </div>
                    </td>
                    <td style={{textAlign:"center", verticalAlign:"middle"}}>
                        <div className='posting-title-appli' onClick={() => handPosting(application)}>
                            {application?.posting?.title || "Title"}
                        </div>
                    </td>
                    <td style={{textAlign:"center", verticalAlign:"middle"}}>
                        <div className="contact-info">
                            {application?.email || "email@example.com"}
                        </div>
                        <div className="contact-info">
                            {application?.cv?.jobSeeker?.phoneNumber || "01234567890"}
                        </div>
                    </td>
                    <td style={{textAlign:"center", verticalAlign:"middle"}}>
                        {application?.status === "PENDING" ? (
                            <div>
                            <button 
                                onClick = {() => handApproved(application?.id)}
                                className="status-button active"
                            >
                                APPROVE
                            </button>
                            <button 
                                onClick ={() => handRejected(application?.id)}
                                className="status-button deactive"
                            >
                                REJECTE
                            </button>
                            </div>
                        ) : (
                            <div>
                                {
                                    application?.status === "APPROVED"? (
                                        <button className='status-button active' onClick={() => handPending(application?.id)}>{application?.status || "None"}</button>
                                    )
                                    :(
                                        <button className='status-button deactive' onClick={() => handPending(application?.id)}>{application?.status || "None"}</button>
                                    )
                                }
                            </div>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        
    );
}

export default ManageCandidate;
