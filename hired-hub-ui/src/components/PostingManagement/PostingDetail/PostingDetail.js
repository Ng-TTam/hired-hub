import { faCalendarDays, faClock, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import {
    faBan,
    faBriefcase,
    faCheck,
    faChevronLeft,
    faDollarSign,
    faLocationDot,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, notification } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ExperienceRequire, JobTypes } from '../../../config/constants';
import { fetchPosting, updateStatus } from '../../../redux/postingSlice';
import { convertSalary, convertWorkAddressDetail, convertWorkAddressSumary, formatDate } from '../../../utils';
import ContentBox from '../../Posting/ContentBox';
import styles from './PostingDetail.module.scss';

const cx = classNames.bind(styles);

const PostingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { posting, loading, error } = useSelector((state) => state.postings);

    const [notificationData, setNotificationData] = useState(null);

    useEffect(() => {
        dispatch(fetchPosting(id));
    }, []);

    useEffect(() => {
        if (notificationData) {
            if (notificationData.type === 'error') {
                notification.error({
                    message: notificationData.message,
                    description: notificationData.description,
                });
            } else if (notificationData.type === 'success') {
                notification.success({
                    message: notificationData.message,
                    description: notificationData.description,
                });
            }
            setNotificationData(null);
        }
    }, [notificationData]);

    const handleApprove = async () => {
        const resultAction = await dispatch(updateStatus({ postingId: id, status: 'ACTIVATE' }));

        if (updateStatus.rejected.match(resultAction)) {
            const error = resultAction.payload;
            setNotificationData({
                type: 'error',
                message: 'Lỗi',
                description: error?.message || 'Có lỗi xảy ra khi duyệt bài viết.',
            });
        } else {
            dispatch(fetchPosting(id));
            setNotificationData({
                type: 'success',
                message: 'Thành công',
                description: 'Duyệt bài viết thành công!',
            });
        }
    };

    const handleChangeStatus = async (status) => {
        const resultAction = await dispatch(updateStatus({ postingId: id, status }));

        if (updateStatus.rejected.match(resultAction)) {
            const error = resultAction.payload;
            setNotificationData({
                type: 'error',
                message: 'Lỗi',
                description: error?.message || 'Đã có lỗi xảy ra.',
            });
        } else {
            dispatch(fetchPosting(id));
            setNotificationData({
                type: 'success',
                message: 'Thành công',
                description: 'Cập nhật trạng thái thành công!',
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions')}>
                <Button icon={<FontAwesomeIcon icon={faChevronLeft} />} onClick={() => navigate(-1)}>
                    Trở lại
                </Button>
                <div className={cx('left-actions')}>
                    {posting?.status === 'PENDING' && (
                        <>
                            <Button type="primary" icon={<FontAwesomeIcon icon={faCheck} />} onClick={handleApprove}>
                                Phê duyệt
                            </Button>
                            <Button
                                type="primary"
                                danger
                                icon={<FontAwesomeIcon icon={faBan} />}
                                onClick={() => handleChangeStatus('DEACTIVATE')}
                            >
                                Từ chối
                            </Button>
                        </>
                    )}
                    {posting?.status === 'ACTIVATE' && (
                        <Button
                            icon={<FontAwesomeIcon icon={faEyeSlash} />}
                            onClick={() => handleChangeStatus('DEACTIVATE')}
                        >
                            Ẩn bài viết
                        </Button>
                    )}
                    {posting?.status === 'DEACTIVATE' && (
                        <Button icon={<FontAwesomeIcon icon={faEye} />} onClick={() => handleChangeStatus('ACTIVATE')}>
                            Hiện bài viết
                        </Button>
                    )}
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('box-title', 'box')}>
                    <h2 className={cx('title')}>{posting?.title}</h2>
                    <div className={cx('subdetail')}>
                        <div className={cx('subdetail-item')}>
                            <FontAwesomeIcon className={cx('subdetail-item__icon')} icon={faCalendarDays} />
                            <span>{formatDate(posting?.expiredAt)}</span>
                        </div>
                        <div className={cx('subdetail-item')}>
                            <FontAwesomeIcon className={cx('subdetail-item__icon')} icon={faUserGroup} />
                            <span>{posting?.numberOfPosition} người</span>
                        </div>
                        <div className={cx('subdetail-item')}>
                            <FontAwesomeIcon className={cx('subdetail-item__icon')} icon={faBriefcase} />
                            <span>{ExperienceRequire[posting?.experienceRequire]?.name}</span>
                        </div>
                        <div className={cx('subdetail-item')}>
                            <FontAwesomeIcon className={cx('subdetail-item__icon')} icon={faDollarSign} />
                            <span>{convertSalary(posting?.minimumSalary, posting?.maximumSalary)}</span>
                        </div>
                        <div className={cx('subdetail-item')}>
                            <FontAwesomeIcon className={cx('subdetail-item__icon')} icon={faClock} />
                            <span>{JobTypes[posting?.jobType]?.name}</span>
                        </div>
                        <div className={cx('subdetail-item')}>
                            <FontAwesomeIcon className={cx('subdetail-item__icon')} icon={faLocationDot} />
                            <span>{convertWorkAddressSumary(posting?.jobDescription?.workAddress)}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('job-description', 'box')}>
                    <h2>Chi tiết tuyển dụng</h2>
                    <ContentBox title="Mô tả công việc">{posting?.jobDescription?.description}</ContentBox>
                    <ContentBox title="Yêu cầu ứng viên">{posting?.jobDescription?.requirement}</ContentBox>
                    <ContentBox title="Quyền lợi">{posting?.jobDescription?.benefit}</ContentBox>
                    <ContentBox title="Địa điểm làm việc">
                        {convertWorkAddressDetail(posting?.jobDescription?.workAddress)}
                    </ContentBox>
                </div>
            </div>
        </div>
    );
};

export default PostingDetail;
