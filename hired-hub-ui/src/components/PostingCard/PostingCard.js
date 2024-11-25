import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import styles from './PostingCard.module.scss';
import classNames from 'classnames/bind';
import PostingPreview from './PostingPreview';
import Image from '../Image';
import images from '../../assets/images';
import { Wrapper as PopperWrapper } from '../Popper';
import { convertSalary, convertWorkAddressSumary, convertWorkAddress } from '../../utils';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostingCard({ posting }) {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('logo')}
                alt={posting.company?.name}
                src={posting.company?.logo}
                fallback={images.logoDefault}
            />
            <div className={cx('posting-info')}>
                <div>
                    <HeadlessTippy
                        interactive
                        placement="right"
                        delay={[300, 300]}
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <PostingPreview posting={posting} />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <Link className={cx('title')} to={`/posting/${posting.id}`}>
                            {posting.title}
                        </Link>
                    </HeadlessTippy>
                </div>
                <Tippy content={posting.company?.name} placement="bottom">
                    <Link className={cx('company-name')} to={`/company/${posting.company?.id}`}>
                        {posting.company?.name}
                    </Link>
                </Tippy>
                <div className={cx('job-description')}>
                    <div className={cx('jd-item')}>{convertSalary(posting.minimumSalary, posting.maximumSalary)}</div>
                    <Tippy content={convertWorkAddress(posting.jobDescription?.workAddress)} placement="bottom">
                        <div className={cx('jd-item')}>
                            {convertWorkAddressSumary(posting.jobDescription?.workAddress)}
                        </div>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default PostingCard;
