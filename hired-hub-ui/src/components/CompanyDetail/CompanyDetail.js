import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { faGlobe, faLocationDot, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import images from '../../assets/images';
import { fetchCompany } from '../../redux/companySlice';
import { convertScaleCategory } from '../../utils';
import HtmlRenderer from '../HtmlRenderer';
import Image from '../Image';
import styles from './CompanyDetail.module.scss';
import CompanyPosting from './CompanyPosting';
import FollowButton from './FollowButton';

const cx = classNames.bind(styles);

function CompanyDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { company } = useSelector((state) => state.companies);
    const { subscribed } = useSelector((state) => state.subscriptions);

    useEffect(() => {
        dispatch(fetchCompany(id));
    }, [subscribed, id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('company-cover', 'content-box')}>
                <Image
                    className={cx('cover-wrapper')}
                    src={company?.coverImage}
                    alt={company?.name}
                    fallback={images.defaultCompanyCover}
                />
                <Image className={cx('company-logo')} src={company?.logo} fallback={images.logoDefault} />
                <div className={cx('comapny-overview')}>
                    <div className={cx('box-detail')}>
                        <h2 className={cx('company-name')}>{company?.name}</h2>
                        <div className={cx('box-subdetail')}>
                            {company?.website && (
                                <span className={cx('subdetail-info')}>
                                    <FontAwesomeIcon icon={faGlobe} />
                                    <Link to={company?.website}>{company?.website}</Link>
                                </span>
                            )}
                            <span className={cx('subdetail-info')}>
                                <FontAwesomeIcon icon={faBuilding} />
                                <p>
                                    {convertScaleCategory(
                                        company?.scaleCategory?.minEmployee,
                                        company?.scaleCategory?.maxEmployee,
                                    )}
                                </p>
                            </span>
                            <span className={cx('subdetail-info')}>
                                <FontAwesomeIcon icon={faUserGroup} />
                                <p>{company?.followers} người theo dõi</p>
                            </span>
                        </div>
                    </div>
                    <FollowButton />
                </div>
            </div>
            <div className={cx('content-container')}>
                <div className={cx('content-left')}>
                    <div className={cx('section-introduce', 'content-box')}>
                        <div className={cx('content-box__title')}>Giới thiệu công ty</div>
                        <HtmlRenderer className={cx('section-content')} content={company?.description} />
                    </div>
                    <div className={cx('content-box')}>
                        <div className={cx('content-box__title')}>Tuyển dụng</div>
                        <div className={cx('section-content')}>
                            <CompanyPosting />
                        </div>
                    </div>
                </div>
                <div className={cx('content-right')}>
                    <div className={cx('section-contact', 'content-box')}>
                        <div className={cx('content-box__title')}>Thông tin liên hệ</div>
                        <div className={cx('section-content')}>
                            <div className={cx('contact-item')}>
                                <div className={cx('contact-item__caption')}>
                                    <FontAwesomeIcon className={cx('caption-icon')} icon={faLocationDot} />
                                    <span>Địa chỉ công ty</span>
                                </div>
                                <span className={cx('contact-item__des')}>{company?.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyDetail;
