import { faBookmark as regularBookMark } from '@fortawesome/free-regular-svg-icons';
import { faCircleDollarToSlot, faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import images from '../../../assets/images';
import { convertSalary, convertWorkAddressSumary, getRemainingTime } from '../../../utils';
import Image from '../../Image';
import styles from './SingleCard.module.scss';
import { Tooltip } from 'antd';

const cx = classNames.bind(styles);

function SingleCard({ posting, className }) {
    const navigate = useNavigate();

    const handleRedirect = (e) => {
        console.log(e.target.id);
        if (e.target.id !== 'company-link') {
            navigate(`/posting/${posting.id}`);
        }
    };

    return (
        <div className={cx('wrapper', className)} onClick={handleRedirect}>
            <Image className={cx('company-logo')} src={posting.company.logo} alt="" fallback={images.logoDefault} />
            <div className={cx('card-info')}>
                <div className={cx('section-title')}>
                    <Tooltip title={posting.title}>
                        <div className={cx('title')}>{posting.title}</div>
                    </Tooltip>
                    <span className={cx('box-salary')}>
                        <FontAwesomeIcon icon={faCircleDollarToSlot} />
                        {convertSalary(posting.minimumSalary, posting.maximumSalary, posting.currencyUnit)}
                    </span>
                </div>
                <Link id="company-link" className={cx('company-name')} to={`/company/${posting.company.id}`}>
                    {posting.company.name}
                </Link>
                <div className={cx('section-info')}>
                    <div className={cx('label-content')}>
                        <Tooltip title={convertWorkAddressSumary(posting.jobDescription.workAddress)}>
                            <div className={cx('label-section')}>
                                {convertWorkAddressSumary(posting.jobDescription.workAddress)}
                            </div>
                        </Tooltip>
                        <div className={cx('label-section')}>
                            {getRemainingTime(posting.expiredAt).message} để ứng tuyển
                        </div>
                    </div>
                    <div className={cx('actions')}>
                        <button className={cx('btn-apply')}>Ứng tuyển</button>
                        <Tippy content="Lưu">
                            <div className={cx('btn-save-post')}>
                                <FontAwesomeIcon icon={true ? regularBookMark : solidBookMark} />
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCard;
