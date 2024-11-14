import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/Table.scss';
import images from '../../assets/images/index';
import { fetchApplications, resetApplication } from '../../redux/applicationSlice';
import { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const ManageCandidate = () => {
    const dispatch = useDispatch();
    const {applications} = useSelector(state => state.application);

    useEffect(() => {
        dispatch(fetchApplications());
        console.log("appli", applications);
        return () => {
            dispatch(resetApplication());
        };
    }, [dispatch]);

    return (
        <table className='custom-table' style={{ padding: "20px" }}>
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
                        <td>
                            <div className="cv-manage-image" style={{ display:"flex", justifyContent:"center",}}>
                                <img src={ application? application.cv.jobSeeker.avatar :images.avatarDefault} alt="avatar" 
                                style={{width:"70px", height:"70px", borderRadius:"50%"}}
                                />
                            </div>
                            <div className="cv-manage-name" style={{ display:"flex", justifyContent:"center",}}>
                                <div>
                                    {application?.cv?.jobSeeker?.firstName} {application?.cv?.jobSeeker?.lastName || "Nguyễn Văn A"}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div>
                                {application?.cv?.description || "CV Description"}
                            </div>
                            {/* <div>
                                {application?.updatedAt ? formatDistanceToNow(new Date(application.updatedAt)) : "Vừa xong"}
                            </div> */}
                            <div>
                                   Cập nhật: {application?.updatedAt ? `${formatDistanceToNow(new Date(application.updatedAt), { locale: vi })} trước` : "Vừa xong"}
                            </div>
                        </td>
                        <td>{application?.posting?.title || "Title"}</td>
                        <td>
                            <div>
                                {application?.email || "email@example.com"}
                            </div>
                            <div>
                                {application?.cv?.jobSeeker?.phoneNumber || "01234567890"}
                            </div>
                        </td>
                        <td>{application?.status || "None"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ManageCandidate;
