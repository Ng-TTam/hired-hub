import { Button, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import images from '../../../../assets/images';
import { updateEmployerCompany } from '../../../../redux/employerSilce';
import Image from '../../../Image';
import styles from './CompanyCard.module.scss';

const cx = classNames.bind(styles);

function CompanyCard({ company }) {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleConfirm = () => {
        dispatch(updateEmployerCompany({ companyId: company.id }));
        setIsModalVisible(false);
    };

    return (
        <div className={cx('wrapper')}>
            <Image className={cx('logo')} src={company?.logo} alt="Logo công ty" fallback={images.logoDefault} />
            <div className={cx('infor')}>
                <span>{company?.name}</span>
                <span>MST: {company?.taxCode}</span>
                <span>{company?.address}</span>
            </div>
            <button className={cx('btn-select')} onClick={showModal}>
                Chọn
            </button>

            <Modal
                title="Xác nhận"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button type="primary" key="confirm" onClick={handleConfirm}>
                        Xác nhận
                    </Button>,
                ]}
            >
                <p>Bạn có chắc chắn muốn chọn công ty "{company?.name}"?</p>
            </Modal>
        </div>
    );
}

export default CompanyCard;
