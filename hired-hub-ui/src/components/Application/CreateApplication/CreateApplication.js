import React, { useState } from "react";
import { createApplication, deleteApplication } from "../../../redux/applicationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherPointed } from "@fortawesome/free-solid-svg-icons/faFeatherPointed";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
import CVSelect from "../../ProfileCV/CVSelect/CVSelect";
import { useDispatch } from "react-redux";

const CreateApplication = ({postingSelect, applicationId, onApplication}) =>{
    const [selectedCV, setSelectedCV] = useState(null);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleCVSelect = (cvId) => {
        setSelectedCV(cvId); // Cập nhật ID của CV đã chọn
    };
    const handleSubmit = () => {
        const reload = false;
        onApplication(reload);
    };  
    const handApplication = async () => {
        if (!selectedCV) {
            return;
        }
        const newApplication = { postingId: postingSelect.id, cvId: selectedCV, message };
        try {
            if(applicationId){
                await dispatch(deleteApplication(applicationId)).unwrap();
            };
            await dispatch(createApplication(newApplication)).unwrap();
            // console.log(id, selectedCV, message);
        } catch (error) {
            console.error('Lỗi khi ứng tuyển:', error);
        } finally {
            const reload = true;
            onApplication(reload);
        }
    };
    return(
        <div className="application-dialog">
            <div className="header-application-dialog">
                <h2 style={{ fontSize: '18px' }} className="application__title">
                    Ứng Tuyển <span style={{ color: '#15bf61', fontSize: '18px' }}>{postingSelect?.title}</span>
                </h2>
            </div>
            <div className="form-application-dialog">
                <div className="application-tile-header">
                    <FontAwesomeIcon
                        icon={faFolder}
                        style={{ color: '#15bf61', fontSize: '22px', marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '16px' }}>Chọn CV để ứng tuyển</span>
                </div>
                <div className="application_content">
                    <CVSelect onCVSelect={handleCVSelect} />
                </div>
                <div className="application-message-appli">
                    <FontAwesomeIcon
                        icon={faFeatherPointed}
                        style={{ color: '#15bf61', fontSize: '22px', marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '16px' }}>Thư giới thiệu</span>
                </div>
                <div className="application-message-title">
                    <span style={{ fontSize: '16px' }}>
                        Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng
                        hơn với nhà tuyển dụng.
                    </span>
                </div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="appl-mess"
                    rows="3"
                    placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
                    style={{ height: '92px' }}
                />
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
                <button onClick={handApplication} className="confirm-button">
                    Ứng tuyển
                </button>
                <button
                    onClick={() => {
                        handleSubmit();
                    }}
                    className="cancel-button"
                >
                    Hủy
                </button>
            </div>
        </div>

    );
}
export default CreateApplication;