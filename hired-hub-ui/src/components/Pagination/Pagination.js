import React from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const numberAroundButtons = 3;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const paginationButtons = [];
    for (
        let index = Math.max(currentPage - numberAroundButtons, 1);
        index <= Math.min(currentPage + numberAroundButtons, totalPages);
        index += 1
    ) {
        paginationButtons.push(
            <button
                key={index}
                className={cx('pagination-button', currentPage === index ? 'active' : '')}
                onClick={() => handlePageChange(index)}
            >
                {index}
            </button>,
        );
    }

    const handlePageChange = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('pagination')}>
                <button
                    className={cx('pagination-button')}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &laquo; Trước
                </button>
                {currentPage - numberAroundButtons > 1 && <span> ... </span>}
                {paginationButtons}
                {currentPage + numberAroundButtons < totalPages && <span> ... </span>}
                <button
                    className={cx('pagination-button')}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    Sau &raquo;
                </button>
            </div>
            <span className={cx('index-label')}>{`Trang ${currentPage} / ${totalPages}`}</span>
        </div>
    );
};

export default Pagination;
