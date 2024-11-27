import { Button, Card, Descriptions, Modal, Tag } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import images from '../../../assets/images';
import { fetchCompany, updateStatus } from '../../../redux/companySlice';
import { formatDateTime } from '../../../utils';
import HtmlRenderer from '../../HtmlRenderer';
import Image from '../../Image';
import styles from './CompanyDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const CompanyDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { company, success } = useSelector((state) => state.companies);

    useEffect(() => {
        dispatch(fetchCompany(id));
    }, [id]);

    useEffect(() => {
        if (success) {
            dispatch(fetchCompany(id));
        }
    }, [success]);

    const handleShowConfirm = (companyId, status) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn?',
            content: 'Bạn có chắc chắn muốn cập nhật không?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                dispatch(updateStatus({ companyId, isActive: status }));
            },
        });
    };

    return (
        <Card
            className={cx('wrapper')}
            extra={
                !company?.isActive && (
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faCheck} />}
                        onClick={() => handleShowConfirm(id, true)}
                    >
                        Phê duyệt
                    </Button>
                )
            }
        >
            <div className={cx('company-card__cover-container')}>
                <Image
                    className={cx('company-card__cover')}
                    src={company?.coverImage}
                    fallback={images.defaultCompanyCover}
                />
                <Image className={cx('company-card__logo')} src={company?.logo} fallback={images.logoDefault} />
            </div>

            <Descriptions title={company?.name} column={1} bordered>
                <Descriptions.Item label="Địa chỉ">{company?.address || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Mã số thuế">{company?.taxCode || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Website">
                    <Link to={company?.website || ''}>{company?.website || 'N/A'}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Quy mô công ty">{company?.scaleCategory?.name || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Mô tả">
                    <HtmlRenderer content={company?.description || 'N/A'} />
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                    <Tag color={company?.isActive ? 'green' : 'orange'}>
                        {company?.isActive ? 'ACTIVATE' : 'PENDING'}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">{formatDateTime(company?.createdAt)}</Descriptions.Item>
                <Descriptions.Item label="Cập nhật lần cuối">{formatDateTime(company?.updatedAt)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default CompanyDetail;
