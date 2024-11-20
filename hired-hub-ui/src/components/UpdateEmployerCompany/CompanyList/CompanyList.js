import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCompanies } from '../../../redux/companySlice';
import Pagination from '../../Pagination';
import CompanyCard from './CompanyCard';
import styles from './CompanyList.module.scss';

const cx = classNames.bind(styles);

function CompanyList() {
    const dispatch = useDispatch();
    const { companies, totalPages } = useSelector((state) => state.companies);

    const [companyName, setCompanyName] = useState();
    const [pagination, setPagination] = useState({ page: 1, size: 9 });

    useEffect(() => {
        dispatch(fetchAllCompanies({ companyName, page: pagination.page, size: pagination.size }));
    }, [pagination]);

    const handleSearch = () => {
        dispatch(fetchAllCompanies({ companyName, page: pagination.page, size: pagination.size }));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}>
                <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onPressEnter={handleSearch}
                    placeholder="Tên công ty"
                    prefix={
                        <FontAwesomeIcon icon={faMagnifyingGlass} onChange={(e) => setCompanyName(e.target.value)} />
                    }
                    allowClear
                />
                <Button type="primary" onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </div>

            <div className={cx('results')}>
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>
            <Pagination
                currentPage={pagination.page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPagination((prev) => ({ ...prev, page: newPage }))}
            />
        </div>
    );
}

export default CompanyList;
