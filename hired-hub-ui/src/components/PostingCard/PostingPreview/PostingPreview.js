import Button from '../../Button';
import Image from '../../Image';
import images from '../../../assets/images';
import styles from './PostingPreview.module.scss';
import { convertSalary, convertWorkAddressSumary, getRemainingTime, convertWorkAddressDetail } from '../../../utils';
import constants from '../../../config/constants';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import GetApplication from '../../Application/GetApplication/GetApplication';
import CreateApplication from '../../Application/CreateApplication/CreateApplication';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostingPreview({ posting }) {
    const handleClickApplication = () =>{
        window.open(`/posting/${posting.id}?selectApplication=true`, '_blank');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image
                    className={cx('logo')}
                    alt={posting.company.name}
                    src={posting.company.logo}
                    fallback={images.logoDefault}
                />
                <div className={cx('header__content')}>
                    <h3 className={cx('title')}>{posting.title}</h3>
                    <a className={cx('company-name')}>{posting.company.name}</a>
                    <span className={cx('header-content__salary')}>
                        {convertSalary(posting.minimumSalary, posting.maximumSalary)}
                    </span>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('sumary')}>
                    <span className={cx('sumary-item')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        {convertWorkAddressSumary(posting.jobDescription.workAddress)}
                    </span>
                    <span className={cx('sumary-item')}>
                        <FontAwesomeIcon icon={faStar} />
                        {constants.ExperienceRequire[posting.experienceRequire]?.name}
                    </span>
                    <span className={cx('sumary-item')}>
                        <FontAwesomeIcon icon={faClock} />
                        {getRemainingTime(posting.expiredAt).message}
                    </span>
                </div>
                <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Mô tả công việc</h3>
                    </div>
                    <p className={cx('jd-item__content')}>{posting.jobDescription.description}</p>
                </div>
                <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Yêu cầu ứng viên</h3>
                    </div>
                    <p className={cx('jd-item__content')}>{posting.jobDescription.requirement}</p>
                </div>
                <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Quyền lợi</h3>
                    </div>
                    <p className={cx('jd-item__content')}>{posting.jobDescription.benefit}</p>
                </div>
                <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Địa điểm làm việc</h3>
                    </div>
                    <p className={cx('jd-item__content')}>
                        {convertWorkAddressDetail(posting.jobDescription.workAddress)}
                    </p>
                </div>
                {/* <div className={cx('jd-item')}>
                    <div>
                        <h3 className={cx('jd-item__title')}>Thời gian làm việc</h3>
                    </div>
                    <p className={cx('jd-item__content')}>
                        - Tiếp nhận nhu cầu mua BĐS của khách hàng, giới thiệu, tư vấn, hướng dẫn khách hàng tham quan
                        các dự án mà Công ty đang triển khai;<br></br> - Thực hiện giao dịch và hỗ trợ khách hàng theo
                        dõi tiến độ thanh toán;<br></br> - Duy trì các mối quan hệ khách hàng hiện có, đồng thời xây
                        dựng kế hoạch tìm kiếm và mở rộng mạng lưới khách hàng tiềm năng;<br></br> - Chăm sóc khách hàng
                        sau bán hàng (được đào tạo)
                    </p>
                </div> */}
            </div>
            <div className={cx('actions')}>
                <Button className={cx('btn-apply')} outline
                        onClick={handleClickApplication}
                >
                    Ứng tuyển ngay
                </Button>
                <Button className={cx('btn-detail')} primary>
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
}

export default PostingPreview;
