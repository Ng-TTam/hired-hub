import { Col, Divider, Row, Typography } from 'antd';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import Image from '../../Image';
import styles from './EmployerCompany.module.scss';

const { Text } = Typography;

const cx = classNames.bind(styles);

function EmployerCompany({ company, className }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('company-name__container')}>
                <Image
                    className={cx('company-logo')}
                    src={company?.logo}
                    alt={company?.name}
                    fallback={images.logoDefault}
                />
                <div className={cx('company-name__sectioin')}>
                    <h2>{company?.name}</h2>
                    <span>Quy mô công ty: {company?.scaleCategory?.name}</span>
                </div>
            </div>
            <Divider style={{ margin: '8px 0 16px 0' }} />
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div style={{ marginBottom: '8px' }}>
                        <Text type="secondary">Mã số thuế</Text>
                        <div>{company.taxCode}</div>
                    </div>
                </Col>
                <Col span={24}>
                    <div>
                        <Text type="secondary">Địa chỉ</Text>
                        <div>{company.address}</div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default EmployerCompany;
