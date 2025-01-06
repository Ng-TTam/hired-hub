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
    const [active, setActive] = useState(false);

    useEffect(() => {
        const hasValidKeys = () => {
            return Object.entries(criteria).some(([key, value]) => value !== null && value !== undefined);
        };

        if (active) {
            dispatch(fetchPostingsRecommend({ page: pageable.page + 1, size: pageable.size }));
        } 
        else if (hasValidKeys()) {
            dispatch(fetchPostings({ criteria: criteria, pageable: { sort: 'createdAt,desc', ...pageable } }));
        } 
        else {
            dispatch(fetchPostingsDefault({ page: pageable.page + 1, size: pageable.size }));
        }
    }, [pageable, active]);

    const handleOnPageChange = (page) => {
        dispatch(updatePageable({ page: page - 1 }));
    };

    const onRecommend = () => {
        const newActive = !active;
        setActive(newActive);
        dispatch(updatePageable({ page: 0 }));
    };

    const onSearch = () => {
        dispatch(updatePageable({ page: 0 }));
        setActive(false);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Filter onChangeRecommend={onSearch}/>
                {localStorage.getItem('isLogin') && (
                    <Button className={cx('recommend-button')} onClick={onRecommend} type={active ? 'primary' : ''}>
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
