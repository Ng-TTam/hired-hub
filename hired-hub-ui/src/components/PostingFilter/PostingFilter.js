import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePageable } from '../../redux/filterSlice';
import { fetchPostings, fetchPostingsDefault, fetchPostingsRecommend } from '../../redux/postingSlice';
import WebsiteFooter from '../Footer/Footer';
import Pagination from '../Pagination';
import PostingCard from '../PostingCard';
import Filter from './Filter';
import styles from './PostingFilter.module.scss';
import { Button } from 'antd';
import { CircleFadingArrowUpIcon } from 'lucide-react';

const cx = classNames.bind(styles);

function PostingFilter() {
    const dispatch = useDispatch();
    const { criteria, pageable } = useSelector((state) => state.filter);
    const { postings, totalPages } = useSelector((state) => state.postings);
    const [active, setActive] = useState(true);

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

    const onGuess = () => {
        setActive(!active);
        if (active) dispatch(fetchPostingsRecommend({ page: pageable.page + 1, size: pageable.size }));
        else dispatch(fetchPostingsDefault({ page: pageable.page + 1, size: pageable.size }));
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Filter />
                {localStorage.getItem('email') && (
                    <Button className={cx('recommend-button')} onClick={onGuess} type={active ? '' : 'primary'}>
                        <CircleFadingArrowUpIcon size={20}/>
                        Đề xuất
                    </Button>
                )}
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
