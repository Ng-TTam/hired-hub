import { faHeart as faHeartRegular, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
    faBriefcaseClock,
    faClock,
    faHeart as faHeartSolid,
    faHourglass2,
    faStar,
    faUser,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons/faCommentsDollar';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import { ExperienceRequire, GenderRequire, JobTypes } from '../../config/constants';
import { fetchApplicationInPosting, resetApplication } from '../../redux/applicationSlice';
import { setCriteria } from '../../redux/filterSlice';
import { fetchPosting } from '../../redux/postingSlice';
import { resetSavePost, savePosting, savePostingStatus, unsavePosting } from '../../redux/savedPostingSlice';
import { convertSalary, convertWorkAddressDetail, convertWorkAddressSumary, formatDate } from '../../utils';
import CreateApplication from '../Application/CreateApplication/CreateApplication';
import GetApplication from '../Application/GetApplication/GetApplication';
import Button from '../Button';
import HtmlRenderer from '../HtmlRenderer';
import CompanyInfo from './CompanyInfo';
import ContentBox from './ContentBox';
import ContentIcon from './ContentIcon';
import styles from './Posting.module.scss';
import PageNotFound from '../../pages/404';

const cx = classNames.bind(styles);

function Posting({ className }) {
    const isLogin = localStorage.getItem('isLogin');
    const { id } = useParams();
    const { application } = useSelector((state) => state.application);
    const posting = useSelector((state) => state.postings.posting);
    const savedStatus = useSelector((state) => state.savedPosting.savedStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showApplication, setShowApplication] = useState(false);
    const [showCreateApplication, setShowCreateApplication] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    var selectApplication = queryParams.get('selectApplication') === 'true';
    const containerRef = useRef(null);
    const user = useSelector(state => state.user.user);

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setShowCreateApplication(false);
            setShowApplication(false);
            setIsModalOpen(false);
            dispatch(fetchPosting(id));
            dispatch(fetchApplicationInPosting(id));
            dispatch(savePostingStatus(id));
        }
    };

    useEffect(() => {
        dispatch(fetchPosting(id));
        if(isLogin){
            dispatch(fetchApplicationInPosting(id));
            dispatch(savePostingStatus(id));
        }
        return () => {
            dispatch(resetApplication());
            dispatch(resetSavePost())
        };
    }, [dispatch, id]);

    useEffect(() => {
        if(isModalOpen){
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isModalOpen]);

    const handleSearchByTag = (criteria) => {
        dispatch(setCriteria(criteria));
        navigate('/');
    };

    const handleClickApplication = () => {
        if (isLogin) {
            if(user?.account.status !== "ACTIVATE"){
                Modal.confirm({
                    title: 'Bạn chưa xác thực tài khoản!',
                    content: 'Xác thực ngay nhé?',
                    okText: 'Đồng ý',
                    cancelText: 'Hủy',
                    onOk() {
                        navigate('/verify-otp?resend=true');
                    },
                });
            }else{
                setIsModalOpen(true);
                if (application) {
                    setShowApplication(true);
                } else {
                    setShowCreateApplication(true);
                }
            }
        }else {
            Modal.confirm({
                title: 'Bạn chưa đăng nhập!',
                content: 'Đăng nhập ngay nhé?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk() {
                    navigate('/login');
                },
            });
        }
    };
    useEffect(() => {
        const hasViewed = sessionStorage.getItem('hasViewedApplicationModal');
        if (!hasViewed && selectApplication) {
            if (isLogin) {
                const getData = async () => {
                    try {
                        const result = await dispatch(fetchApplicationInPosting(id)).unwrap();
                        if (result) {
                            setIsModalOpen(true);
                            setShowApplication(true);
                        } else {
                            setIsModalOpen(true);
                            setShowCreateApplication(true);
                        }
                    } catch {
                        setIsModalOpen(true);
                        setShowCreateApplication(true);
                    }
                };
                getData();
                sessionStorage.setItem('hasViewedApplicationModal', 'true');
            } else {
                Modal.confirm({
                    title: 'Bạn chưa đăng nhập!',
                    content: 'Đăng nhập ngay nhé?',
                    okText: 'Đồng ý',
                    cancelText: 'Hủy',
                    onOk() {
                        navigate('/login');
                    },
                });
            }
        }
    }, [id, selectApplication, dispatch]);

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
            setShowCreateApplication(true);
            setIsModalOpen(true);
        }
    };
    const handSavePost = async () => {
        if (isLogin) {
            const saved = { postId: id };
            if (savedStatus) {
                await dispatch(unsavePosting(saved)).unwrap();
                window.location.reload();
            } else {
                await dispatch(savePosting(saved)).unwrap();
                window.location.reload();
            }
        } else {
            Modal.confirm({
                title: 'Bạn chưa đăng nhập!',
                content: 'Đăng nhập ngay nhé?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk() {
                    navigate('/login');
                },
            });
        }
    };

    if (!posting) {
        return <PageNotFound/>;
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
                            content={convertSalary(posting.minimumSalary, posting.maximumSalary, posting.currencyUnit)}
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
                        <Button
                            className={cx('btn-save')}
                            outline
                            leftIcon={<FontAwesomeIcon icon={savedStatus ? faHeartSolid : faHeartRegular} />}
                            onClick={handSavePost}
                        >
                            {savedStatus ? 'Đã lưu' : 'Lưu tin'}
                        </Button>
                    </div>
                </div>
                <div className={cx('content-left__detail', 'box')}>
                    <span className={cx('content-left__title')}>Chi tiết tin tuyển dụng</span>
                    <ContentBox title="Mô tả công việc">
                        {<HtmlRenderer content={posting.jobDescription.description} />}
                    </ContentBox>
                    <ContentBox title="Yêu cầu ứng viên">
                        {<HtmlRenderer content={posting.jobDescription.requirement} />}
                    </ContentBox>
                    <ContentBox title="Quyền lợi">
                        {<HtmlRenderer content={posting.jobDescription.benefit} />}
                    </ContentBox>
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
                                onClick={() => handleSearchByTag({ jobCategoryId: posting.mainJob.id })}
                            >
                                {posting.mainJob.name}
                            </span>
                            {posting.subJobs.map((item) => (
                                <span
                                    key={`${item.id}_subjob`}
                                    className={cx('label-section', 'link-tag')}
                                    onClick={() => handleSearchByTag({ jobCategoryId: item.id })}
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
                                        onClick={() => handleSearchByTag({ provinceId: address.province.id })}
                                    >
                                        {address.province.name}
                                    </span>
                                    <span
                                        className={cx('label-section', 'link-tag')}
                                        onClick={() =>
                                            handleSearchByTag({
                                                provinceId: address.province.id,
                                                districtId: address.district.id,
                                            })
                                        }
                                    >
                                        {address.province.name} / {address.district.name}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div ref={containerRef}>
            {showApplication && <GetApplication postingSelect={posting} onApplicationAgain={handApplicationAgain} />}
            {showCreateApplication && (
                <CreateApplication ref={containerRef}
                    postingSelect={posting}
                    applicationId={application ? application.id : null}
                    onApplication={handleApplication}
                />
            )}
            </div>
        </div>
    );
}

export default Posting;
