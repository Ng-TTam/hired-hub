import { faClock, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import constants from '../../../config/constants';
import { convertSalary, convertWorkAddressDetail, convertWorkAddressSumary, getRemainingTime } from '../../../utils';
import Button from '../../Button';
import Image from '../../Image';
import styles from './PostingPreview.module.scss';

const cx = classNames.bind(styles);

function PostingPreview({ posting }) {
    const handleClickApplication = () => {
        window.open(`/posting/${posting.id}?selectApplication=true`, '_blank');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image
                    className={cx('logo')}
                    alt={posting?.company?.name}
                    src={posting?.company?.logo}
                    fallback={images.logoDefault}
                />
                <div className={cx('header__content')}>
                    <h3 className={cx('title')}>{posting?.title}</h3>
                    <a className={cx('company-name')}>{posting?.company?.name}</a>
                    <span className={cx('header-content__salary')}>
                        {convertSalary(posting?.minimumSalary, posting?.maximumSalary)}
                    </span>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('sumary')}>
                    <span className={cx('sumary-item')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        {convertWorkAddressSumary(posting?.jobDescription?.workAddress)}
                    </span>
                    <span className={cx('sumary-item')}>
                        <FontAwesomeIcon icon={faStar} />
                        {constants.ExperienceRequire[posting?.experienceRequire]?.name}
                    </span>
                    <span className={cx('sumary-item')}>
                        <FontAwesomeIcon icon={faClock} />
                        {getRemainingTime(posting?.expiredAt).message}
                    </span>
                </div>
                <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Mô tả công việc</h3>
                    </div>
                    <p className={cx('jd-item__content')}>{posting?.jobDescription?.description}</p>
                </div>
                <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Yêu cầu ứng viên</h3>
                    </div>
                    <p className={cx('jd-item__content')}>{posting?.jobDescription?.requirement}</p>
                </div>
                <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Quyền lợi</h3>
                    </div>
                    <p className={cx('jd-item__content')}>{posting?.jobDescription?.benefit}</p>
                </div>
                <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Địa điểm làm việc</h3>
                    </div>
                    <p className={cx('jd-item__content')}>
                        {convertWorkAddressDetail(posting?.jobDescription?.workAddress)}
                    </p>
                </div>
            </div>
            <div className={cx('actions')}>
                <Button className={cx('btn-apply')} outline onClick={handleClickApplication}>
                    Ứng tuyển ngay
                </Button>
                <Button className={cx('btn-detail')} primary to={`/posting/${posting?.id}`}>
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
}

export default PostingPreview;
