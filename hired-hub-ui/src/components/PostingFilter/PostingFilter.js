import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/filterSlice';
import { fetchPostings } from '../../redux/postingSlice';
import Pagination from '../Pagination';
import PostingCard from '../PostingCard';
import Filter from './Filter';
import styles from './PostingFilter.module.scss';
import WebsiteFooter from '../Footer/Footer';

const cx = classNames.bind(styles);

function PostingFilter() {
    const dispatch = useDispatch();
    const { criteria, pagination } = useSelector((state) => state.filter);
    const { postings, totalPages } = useSelector((state) => state.postings);

    useEffect(() => {
        dispatch(fetchPostings({ criteria: criteria, pageable: { sort: 'createdAt,desc', ...pagination } }));
    }, [dispatch, criteria, pagination]);

    const handleOnPageChange = (page) => {
        dispatch(setCurrentPage(page - 1));
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
                <Pagination
                    currentPage={pagination.page + 1}
                    totalPages={totalPages}
                    onPageChange={handleOnPageChange}
                />
            </div>
            <WebsiteFooter />
        </>
    );
}

export default PostingFilter;
