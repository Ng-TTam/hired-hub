import styles from './ContentBox.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ContentBox({ title, children, className }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default ContentBox;
