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
import { Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ExperienceRequire, JobTypes } from '../../../config/constants';
import { fetchPosting, updateStatus } from '../../../redux/postingSlice';
import { convertSalary, convertWorkAddressDetail, convertWorkAddressSumary, formatDate } from '../../../utils';
import HtmlRenderer from '../../HtmlRenderer';
import ContentBox from '../../Posting/ContentBox';
import styles from './PostingDetail.module.scss';

const cx = classNames.bind(styles);

const PostingDetail = () => {
    const role = localStorage.getItem('role');
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { posting, loading, error, success } = useSelector((state) => state.postings);

    useEffect(() => {
        dispatch(fetchPosting(id));
    }, []);

    useEffect(() => {
        if (success) dispatch(fetchPosting(id));
    }, [success]);

    const handleShowConfirm = (status) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn?',
            content: 'Bạn có chắc chắn muốn cập nhật không?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                dispatch(updateStatus({ postingId: id, status }));
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('actions')}>
                <Button icon={<FontAwesomeIcon icon={faChevronLeft} />} onClick={() => navigate(-1)}>
                    Trở lại
                </Button>
                {role === 'ADMIN' && (
                    <div className={cx('left-actions')}>
                        {posting?.status === 'PENDING' && (
                            <>
                                <Button
                                    type="primary"
                                    icon={<FontAwesomeIcon icon={faCheck} />}
                                    onClick={() => handleShowConfirm('ACTIVATE')}
                                >
                                    Phê duyệt
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    icon={<FontAwesomeIcon icon={faBan} />}
                                    onClick={() => handleShowConfirm('REJECTED')}
                                >
                                    Từ chối
                                </Button>
                            </>
                        )}
                        {posting?.status === 'ACTIVATE' && (
                            <Button
                                icon={<FontAwesomeIcon icon={faEyeSlash} />}
                                onClick={() => handleShowConfirm('DEACTIVATE')}
                            >
                                Ẩn bài viết
                            </Button>
                        )}
                        {posting?.status === 'DEACTIVATE' && (
                            <Button
                                icon={<FontAwesomeIcon icon={faEye} />}
                                onClick={() => handleShowConfirm('ACTIVATE')}
                            >
                                Hiện bài viết
                            </Button>
                        )}
                    </div>
                )}
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
                            <span>
                                {convertSalary(posting?.minimumSalary, posting?.maximumSalary, posting?.currencyUnit)}
                            </span>
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
                    <ContentBox title="Mô tả công việc">
                        <HtmlRenderer content={posting?.jobDescription?.description} />
                    </ContentBox>
                    <ContentBox title="Yêu cầu ứng viên">
                        <HtmlRenderer content={posting?.jobDescription?.requirement} />
                    </ContentBox>
                    <ContentBox title="Quyền lợi">
                        <HtmlRenderer content={posting?.jobDescription?.benefit} />
                    </ContentBox>
                    <ContentBox title="Địa điểm làm việc">
                        {convertWorkAddressDetail(posting?.jobDescription?.workAddress)}
                    </ContentBox>
                </div>
            </div>
        </div>
    );
};

export default PostingDetail;
