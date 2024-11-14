import { faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
    faBriefcaseClock,
    faClock,
    faHourglass2,
    faStar,
    faUser,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons/faCommentsDollar';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { ExperienceRequire, GenderRequire, JobTypes } from '../../config/constants';
import { resetAndSetDistrict, resetAndSetJobCategory, resetAndSetProvince } from '../../redux/filterSlice';
import { fetchPosting } from '../../redux/postingSlice';
import { convertSalary, convertWorkAddressDetail, convertWorkAddressSumary, formatDate } from '../../utils';
import Button from '../Button';
import CompanyInfo from './CompanyInfo';
import ContentBox from './ContentBox';
import ContentIcon from './ContentIcon';
import styles from './Posting.module.scss';
import { fetchApplicationInPosting, resetApplication } from '../../redux/applicationSlice';
import '@fortawesome/free-solid-svg-icons';
import CreateApplication from '../Application/CreateApplication/CreateApplication';
import GetApplication from '../Application/GetApplication/GetApplication';

const cx = classNames.bind(styles);

function Posting({ className }) {
    const { id } = useParams();
    const { application } = useSelector((state) => state.application);
    const posting = useSelector((state) => state.postings.posting);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showApplication, setShowApplication] = useState(false);
    const [showCreateApplication, setShowCreateApplication] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    var selectApplication = queryParams.get('selectApplication') === 'true';
    const [createAgain, setCreateAgain] = useState(false);

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

    const handleClickApplication = () => {
        setIsModalOpen(true);
        if (application) {
            setShowApplication(true);
        } else {
            setShowCreateApplication(true);
        }
    };
    useEffect(() => {
        const hasViewed = sessionStorage.getItem('hasViewedApplicationModal');
        if (!hasViewed && selectApplication) {
            handleClickApplication();
            sessionStorage.setItem('hasViewedApplicationModal', 'true');
        }
    }, [selectApplication]);

    const handleApplication = (reload) => {
        setShowCreateApplication(false);
        setShowApplication(false);
        setIsModalOpen(false);
        dispatch(fetchApplicationInPosting(id));
        if (reload) {
            window.location.reload();
        }
    };
    const handApplicationAgain = (reload) => {
        setShowCreateApplication(false);
        setShowApplication(false);
        setIsModalOpen(false);
        dispatch(fetchApplicationInPosting(id));
        if (reload) {
            setCreateAgain(true);
            setShowCreateApplication(true);
            setIsModalOpen(true);
        }
    };

    if (!posting) {
        return <div></div>;
    }

    return (
        <div className={cx('wrapper', className)}>
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
                            {application ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'}
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

            {showApplication && <GetApplication postingSelect={posting} onApplicationAgain={handApplicationAgain} />}
            {showCreateApplication && (
                <CreateApplication
                    postingSelect={posting}
                    applicationId={application ? application.id : null}
                    onApplication={handleApplication}
                />
            )}
        </div>
    );
}

export default Posting;
