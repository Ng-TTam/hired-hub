import { faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
    faBriefcaseClock,
    faClock,
    faHourglass2,
    faStar,
    faUser,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons/faFeatherPointed';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons/faCommentsDollar';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ExperienceRequire, GenderRequire, JobTypes } from '../../config/constants';
import { resetAndSetDistrict, resetAndSetJobCategory, resetAndSetProvince } from '../../redux/filterSlice';
import { fetchPosting } from '../../redux/postingSlice';
import { convertSalary, convertWorkAddressDetail, convertWorkAddressSumary, formatDate } from '../../utils';
import Button from '../Button';
import CompanyInfo from './CompanyInfo';
import ContentBox from './ContentBox';
import ContentIcon from './ContentIcon';
import styles from './Posting.module.scss';
import {
    createApplication,
    deleteApplication,
    fetchApplicationInPosting,
    resetApplication,
} from '../../redux/applicationSlice';
import CVSelect from '../ProfileCV/CVSelect/CVSelect';
import '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Posting() {
    const { id } = useParams();
    const { application } = useSelector((state) => state.application);
    const posting = useSelector((state) => state.postings.posting);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showApplication, setShowApplication] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showCreateApplication, setShowCreateApplication] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCV, setSelectedCV] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(fetchPosting(id));
        dispatch(fetchApplicationInPosting(id));
        return () => {
            dispatch(resetApplication());
        };
    }, [dispatch, id]);

    const handleSearchByProvince = (province) => {
        dispatch(resetAndSetProvince(province.id));
        navigate('/');
    };

    const handleSearchByDistrict = (address) => {
        dispatch(resetAndSetDistrict({ provinceId: address.province.id, districtId: address.district.id }));
        navigate('/');
    };

    const handleSearchByJobCategory = (jobCategory) => {
        dispatch(resetAndSetJobCategory(jobCategory.id));
        navigate('/');
    };
    const handleClickUnAppli = () => {
        const delAppli = application?.id;
        try {
            console.log(delAppli);
            dispatch(deleteApplication(delAppli)).unwrap();
        } catch (error) {
            console.error('Lỗi khi xóa ứng tuyển:', error);
        } finally {
            setShowConfirmDialog(false);
            setIsModalOpen(false);
            window.location.reload();
        }
    };
    const handleClickApplication = () => {
        setIsModalOpen(true);
        if (application) {
            setShowApplication(true);
        } else {
            setShowCreateApplication(true);
        }
    };
    const handleCVSelect = (cvId) => {
        setSelectedCV(cvId); // Cập nhật ID của CV đã chọn
    };
    const handApplication = () => {
        if (!selectedCV) {
            return;
        }
        const newApplication = { postingId: id, cvId: selectedCV, message };
        try {
            dispatch(createApplication(newApplication)).unwrap();
            console.log(id, selectedCV, message);
        } catch (error) {
            console.error('Lỗi khi ứng tuyển:', error);
        } finally {
            setShowCreateApplication(false);
            setIsModalOpen(false);
            window.location.reload();
        }
    };

    if (!posting) {
        return <div></div>;
    }

    return (
        <div className={cx('wrapper')}>
            {isModalOpen && <div className="overlay"></div>}
            <div className={cx('content__left')}>
                <div className={cx('content-left__header', 'box')}>
                    <h3 className={cx('post__title')}>{posting.title}</h3>
                    <div className={cx('icon-sections')}>
                        <ContentIcon
                            icon={<FontAwesomeIcon icon={faCommentsDollar} />}
                            title="Mức lương"
                            content={convertSalary(posting.minimumSalary, posting.maximumSalary)}
                        />
                        <ContentIcon
                            icon={<FontAwesomeIcon icon={faLocationDot} />}
                            title="Địa điểm"
                            content={convertWorkAddressSumary(posting.jobDescription.workAddress)}
                        />
                        <ContentIcon
                            icon={<FontAwesomeIcon icon={faHourglass2} />}
                            title="Kinh nghiệm"
                            content={ExperienceRequire[posting.experienceRequire].name}
                        />
                    </div>
                    <div className={cx('label-section')}>
                        <FontAwesomeIcon icon={faClock} />
                        <span>Hạn nộp hồ sơ: {formatDate(posting.expiredAt)}</span>
                    </div>
                    <div className={cx('actions')}>
                        <Button
                            className={cx('btn-apply')}
                            primary
                            leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                            onClick={handleClickApplication}
                        >
                            {application
                                ? application.status === 'PENDING'
                                    ? 'Đang chờ phản hồi'
                                    : application.status === 'ACTIVATE'
                                    ? 'Ứng tuyển thành công'
                                    : application.status === 'DEACTIVATE'
                                    ? 'Đã Loại'
                                    : 'Ứng tuyển ngay'
                                : 'Ứng tuyển ngay'}
                        </Button>
                        <Button className={cx('btn-save')} outline leftIcon={<FontAwesomeIcon icon={faHeart} />}>
                            Lưu tin
                        </Button>
                    </div>
                </div>
                <div className={cx('content-left__detail', 'box')}>
                    <span className={cx('content-left__title')}>Chi tiết tin tuyển dụng</span>
                    <ContentBox title="Mô tả công việc">{posting.jobDescription.description}</ContentBox>
                    <ContentBox title="Yêu cầu ứng viên">{posting.jobDescription.requirement}</ContentBox>
                    <ContentBox title="Quyền lợi">{posting.jobDescription.benefit}</ContentBox>
                    <ContentBox title="Địa điểm làm việc">
                        {convertWorkAddressDetail(posting.jobDescription.workAddress)}
                    </ContentBox>
                    <span>Hạn nộp hồ sơ: {formatDate(posting.expiredAt)}</span>
                    <div className=""></div>
                </div>
            </div>
            <div className={cx('content__right')}>
                <CompanyInfo company={posting.company} className={cx('box')} />
                <div className={cx('post__infor-general', 'box')}>
                    <span className={cx('box__title')}>Thông tin chung</span>
                    <ContentIcon
                        icon={<FontAwesomeIcon icon={faStar} />}
                        title="Cấp bậc"
                        content={posting.position.name}
                    />
                    <ContentIcon
                        icon={<FontAwesomeIcon icon={faHourglass2} />}
                        title="Kinh nghiệm"
                        content={ExperienceRequire[posting.experienceRequire].name}
                    />
                    <ContentIcon
                        icon={<FontAwesomeIcon icon={faUserGroup} />}
                        title="Số lượng tuyển"
                        content={posting.numberOfPosition}
                    />
                    <ContentIcon
                        icon={<FontAwesomeIcon icon={faBriefcaseClock} />}
                        title="Hình thức làm việc"
                        content={JobTypes[posting.jobType].name}
                    />
                    <ContentIcon
                        icon={<FontAwesomeIcon icon={faUser} />}
                        title="Giới tính"
                        content={GenderRequire[posting.genderRequire]?.name || 'Không yêu cầu'}
                    />
                </div>
                <div className={cx('post__job-category', 'box')}>
                    <div className={cx('job-category-detail')}>
                        <span className={cx('box__title')}>Vị trí chuyên môn</span>
                        <div className={cx('job-category-list')}>
                            <span
                                className={cx('label-section', 'link-tag')}
                                onClick={() => handleSearchByJobCategory(posting.mainJob)}
                            >
                                {posting.mainJob.name}
                            </span>
                            {posting.subJobs.map((item) => (
                                <span
                                    key={`${item.id}_subjob`}
                                    className={cx('label-section', 'link-tag')}
                                    onClick={() => handleSearchByJobCategory(item)}
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={cx('job-category-detail')}>
                        <span className={cx('box__title')}>Khu vực</span>
                        <div className={cx('job-category-list')}>
                            {posting.jobDescription.workAddress.map((address) => (
                                <React.Fragment key={address.id}>
                                    <span
                                        className={cx('label-section', 'link-tag')}
                                        onClick={() => handleSearchByProvince(address.province)}
                                    >
                                        {address.province.name}
                                    </span>
                                    <span
                                        className={cx('label-section', 'link-tag')}
                                        onClick={() => handleSearchByDistrict(address)}
                                    >
                                        {address.province.name} / {address.district.name}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showApplication && (
                <div className="confirm-dialog">
                    <h2 className="application__title">Thông Tin Ứng Tuyển</h2>
                    <div className="application__content">
                        <div className="application__item">
                            <span className="application__label">Trạng thái:</span>
                            <span
                                className={`application__status application__status--${application?.status.toLowerCase()}`}
                            >
                                {application.status === 'PENDING'
                                    ? 'Đang chờ phản hồi'
                                    : application.status === 'ACTIVATE'
                                    ? 'Ứng tuyển thành công'
                                    : 'Đã Loại'}
                            </span>
                        </div>
                        <div className="application__item">
                            <span className="application__label">Thư giới thiệu:</span>
                            <p className="application__message">{application?.message}</p>
                        </div>
                        <div className="application__item">
                            <span className="application__label">CV:</span>
                            <Link to={`../xem-cv/${application?.cv.id}`} className="application__cvName">
                                {application?.cv.description}
                            </Link>
                        </div>
                        {/* <div className="application__item">
                            <span className="application__label">Post:</span>
                            <Link to={`../posting/${application?.posting.id}`} className="application__postName">{application?.posting.title}</Link>
                        </div> */}
                    </div>
                    <button
                        onClick={() => {
                            setIsModalOpen(false);
                            setShowApplication(false);
                        }}
                        className="confirm-button"
                    >
                        Xác nhận
                    </button>
                    <button onClick={() => setShowConfirmDialog(true)} className="del-button">
                        Hủy ứng tuyển
                    </button>
                    {showConfirmDialog && (
                        <div className="confirm-dialog">
                            <p>Bạn có chắc chắn muốn hủy ứng tuyển?</p>
                            <button onClick={handleClickUnAppli} className="del-button">
                                Xác nhận
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirmDialog(false);
                                    setIsModalOpen(false);
                                }}
                                className="cancel-button"
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                </div>
            )}
            {showCreateApplication && (
                <div className="application-dialog">
                    <div className="header-application-dialog">
                        <h2 style={{ fontSize: '18px' }} className="application__title">
                            Ứng Tuyển <span style={{ color: '#15bf61', fontSize: '18px' }}>{posting?.title}</span>
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
                            {/* <div className="application__item">
                                <span className="application__label">Post:</span>
                                <Link to={`../posting/${application?.posting.id}`} className="application__postName">{application?.posting.title}</Link>
                            </div> */}
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
                                setShowCreateApplication(false);
                                setIsModalOpen(false);
                            }}
                            className="cancel-button"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Posting;
