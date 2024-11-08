import styles from './CompanyInfo.module.scss';
import classNames from 'classnames/bind';
import Image from '../../Image';
import images from '../../../assets/images';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faLocationDot, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { convertScaleCategory } from '../../../utils';

const cx = classNames.bind(styles);

function CompanyInfo({ company, className }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('company-name')}>
                <Tippy content={company.name} placement="top">
                    <div className={cx('logo-box')}>
                        <Image
                            className={cx('logo')}
                            src={company.logo}
                            alt={company.name}
                            fallback={images.logoDefault}
                        />
                    </div>
                </Tippy>
                <Tippy content={company.name} placement="top">
                    <Link to={`/company/${company.id}`} className={cx('name-label')}>
                        {company.name}
                    </Link>
                </Tippy>
            </div>
            <div className={cx('company-info')}>
                <div className={cx('company-info__item')}>
                    <div className={cx('item-label')}>
                        <FontAwesomeIcon icon={faUserGroup} />
                        <span>Quy mô:</span>
                    </div>
                    <div className={cx('item-content')}>
                        {convertScaleCategory(company.scaleCategory.minEmployee, company.scaleCategory.maxEmployee)}
                    </div>
                </div>
                <div className={cx('company-info__item')}>
                    <div className={cx('item-label')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Địa điểm:</span>
                    </div>
                    <div className={cx('item-content')}>{company.address}</div>
                </div>
            </div>
            <Link className={cx('link-detail')} to={`/company/${company.id}`}>
                <span>Xem trang công ty</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
        </div>
    );
}

CompanyInfo.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyInfo;
