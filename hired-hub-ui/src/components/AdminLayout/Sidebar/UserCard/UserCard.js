import styles from './UserCard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function UserCard() {
    return (
        <div className={cx('wrapper')}>
            <h4>Nguyễn Minh Tùng</h4>
            <span>Admin</span>
        </div>
    );
}

export default UserCard;
