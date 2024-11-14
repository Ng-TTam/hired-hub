import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetApplication.scss';
import { deleteApplication, fetchApplicationInPosting, resetApplication } from '../../../redux/applicationSlice';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons/faFeatherPointed';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';

const GetApplication = ({postingSelect, onApplicationAgain}) => {
    const dispatch = useDispatch();
    const { application} = useSelector(state => state.application);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        dispatch(fetchApplicationInPosting(postingSelect.id));
        return () => {
            dispatch(resetApplication());
        };
    }, [dispatch, postingSelect.id]);

    const handleSubmit = () => {
        const reload = false;
        onApplicationAgain(reload);
    }; 

    const handleClickAppliAgain = () => {
        const reload = true;
        onApplicationAgain(reload);
    };

    return (
        <div className="application-dialog">
            <div className="header-application-dialog">
                <h2 style={{ fontSize: '18px' }} className="application__title">
                    Thông Tin Ứng Tuyển <span style={{ color: '#15bf61', fontSize: '18px' }}>{postingSelect?.title}</span>
                </h2>
            </div>
            <div className="form-application-dialog">
                <div className="application-tile-header">
                    <FontAwesomeIcon
                        icon={faFolder}
                        style={{ color: '#15bf61', fontSize: '22px', marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '16px' }}>CV ứng tuyển</span>
                </div>
                <div className="application_content">
                    <div className='box-bg-1'
                    style={{border:'none', color : '#00b14f', cursor:'auto'}}>
                        <div className="box-info-1">
                            <h4 className="description-cv-1">
                                <NavLink to={`../xem-cv/${application.cv.id}`} className="select-cv">
                                    {application.cv.description}
                                </NavLink>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="application-message-appli">
                    <FontAwesomeIcon
                        icon={faFeatherPointed}
                        style={{ color: '#15bf61', fontSize: '22px', marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '16px' }}>Thư giới thiệu</span>
                </div>
                {/* <div className="application-message-title">
                    <span style={{ fontSize: '16px' }}>
                        Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng
                        hơn với nhà tuyển dụng.
                    </span>
                </div> */}
                <p
                    className="appl-mess"
                    placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
                    style={{ height: '92px' }}
                >{application.message}</p>
                <div className="text-left" id="box-note-modal-apply">
                    <h4 className="note-title">
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'ff0000' }}></i> Lưu ý:
                    </h4>
                    <div className="note-content">
                        <p className="note-content__list">
                            <span>
                                HiredHub khuyên tất cả các bạn hãy luôn cẩn trọng trong quá trình tìm việc và
                                chủ động nghiên cứu về thông tin công ty, vị trí việc làm trước khi ứng tuyển.{' '}
                                <br />
                                Ứng viên cần có trách nhiệm với hành vi ứng tuyển của mình. Nếu bạn gặp phải tin
                                tuyển dụng hoặc nhận được liên lạc đáng ngờ của nhà tuyển dụng, hãy báo cáo ngay
                                cho HiredHub qua email
                                <a className="color-green" target="_top" href="mailto:langxuatchieu@gmail.com">
                                    {' '}
                                    langxuatchieu@gmail.com
                                </a>{' '}
                                để được hỗ trợ kịp thời.
                            </span>
                        </p>
                        <p className="note-content__list">
                            <span>
                                {'Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo '}
                                <a
                                    href="https://blog.topcv.vn/huong-dan-tim-viec-an-toan-trong-ky-nguyen-so/"
                                    target="__blank"
                                    className="hight-light color-green"
                                >
                                    tại đây
                                </a>
                                .
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="bottom-application-dialog">
                <button onClick={() => {
                        handleSubmit();
                    }}
                    className="confirm-button">
                    Xác Nhận
                </button>
                <button
                    onClick={() => {
                        setShowConfirmDialog(true);
                    }}
                    className="del-button"
                >
                    Ứng Tuyển Lại
                </button>
            </div>
            {showConfirmDialog && (
                <div className="confirm-dialog">
                    <p>Bạn có chắc chắn muốn ứng tuyển lại không?</p>
                    <button onClick={handleClickAppliAgain} className="del-button">
                        Xác Nhận
                    </button>
                    <button
                        onClick={() => {
                            setShowConfirmDialog(false);
                        }}
                        className="cancel-button"
                    >
                        Hủy
                    </button>
                </div>
            )}
        </div>
    );
};

export default GetApplication;
