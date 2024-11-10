import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { fetchCompanyPostings } from '../../../redux/postingSlice';
import { fetchProvinces } from '../../../redux/provinceSlice';
import Button from '../../Button';
import Pagination from '../../Pagination';
import { SingleCard } from '../../PostingCard';
import styles from './CompanyPosting.module.scss';

const cx = classNames.bind(styles);

function CompanyPosting() {
    const { id } = useParams();
    const dispath = useDispatch();
    const provinces = useSelector((state) => state.provinces.list);
    const { postings, totalPages, loading, error } = useSelector((state) => state.postings);

    const [pagination, setPagination] = useState({ page: 1, size: 6, sort: 'createdAt,desc' });
    const [selectedProvince, setSelectedProvince] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const lastCriteria = useRef();

    useEffect(() => {
        dispath(fetchProvinces());
    }, []);

    useEffect(() => {
        dispath(
            fetchCompanyPostings({
                id,
                criteria: {
                    searchText: searchValue === '' ? null : searchValue,
                    provinceId: selectedProvince?.id,
                },
                pageable: {
                    page: pagination.page - 1,
                    size: pagination.size,
                    sort: pagination.sort,
                },
            }),
        );
    }, [pagination]);

    const handleSearch = () => {
        if (
            lastCriteria.current?.searchValue !== searchValue ||
            lastCriteria.current?.selectedProvince !== selectedProvince ||
            pagination.page > 1
        ) {
            lastCriteria.current = {
                searchValue,
                selectedProvince,
            };
            setPagination((prev) => ({ ...prev, page: 1 }));
        }
    };

    const handleOnPageChange = (page) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            page,
        }));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}>
                <div className={cx('search-input')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        placeholder="Tên công việc, vị trí ứng tuyển..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <Select
                    className={cx('province-selector')}
                    value={selectedProvince}
                    options={provinces}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    placeholder="Chọn Tỉnh/Thành phố"
                    onChange={setSelectedProvince}
                    isClearable
                />
                <Button
                    className={cx('btn-search')}
                    primary
                    leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
            </div>
            <div className={cx('results')}>
                {postings.map((posting) => (
                    <SingleCard key={posting.id} posting={posting} />
                ))}
            </div>
            <Pagination currentPage={pagination.page} totalPages={totalPages} onPageChange={handleOnPageChange} />
        </div>
    );
}

export default memo(CompanyPosting);
