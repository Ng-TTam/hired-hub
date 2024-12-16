import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePageable } from '../../redux/filterSlice';
import { fetchPostings, fetchPostingsDefault } from '../../redux/postingSlice';
import WebsiteFooter from '../Footer/Footer';
import Pagination from '../Pagination';
import PostingCard from '../PostingCard';
import Filter from './Filter';
import styles from './PostingFilter.module.scss';

const cx = classNames.bind(styles);

function PostingFilter() {
    const dispatch = useDispatch();
    const { criteria, pageable } = useSelector((state) => state.filter);
    const { postings, totalPages } = useSelector((state) => state.postings);

    useEffect(() => {
        const hasValidKeys = () => {
            return Object.entries(criteria).some(([key, value]) => value !== null && value !== undefined);
        };

        if (hasValidKeys())
            dispatch(fetchPostings({ criteria: criteria, pageable: { sort: 'createdAt,desc', ...pageable } }));
        else dispatch(fetchPostingsDefault({ page: pageable.page + 1, size: pageable.size }));
    }, [pageable]);

    const handleOnPageChange = (page) => {
        dispatch(updatePageable({ page: page - 1 }));
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Filter />
                <div className={cx('content')}>
                    {postings.map((posting) => (
                        <PostingCard key={posting.id} posting={posting} />
                    ))}
                </div>
                <Pagination currentPage={pageable.page + 1} totalPages={totalPages} onPageChange={handleOnPageChange} />
            </div>
            <WebsiteFooter />
        </>
    );
}

export default PostingFilter;
