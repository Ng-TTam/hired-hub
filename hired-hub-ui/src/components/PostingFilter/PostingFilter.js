import { useSelector } from 'react-redux';
import PostingCard from '../PostingCard';
import Filter from './Filter';
import styles from './PostingFilter.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function PostingFilter() {
    const postings = useSelector((state) => state.postings.postings);

    return (
        <div className={cx('wrapper')}>
            <Filter />
            {/* <div className={cx('content')}>
                {postings.map((posting) => (
                    <PostingCard key={posting.id} posting={posting} />
                ))}
            </div> */}
        </div>
    );
}

export default PostingFilter;
