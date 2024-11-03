import styles from './NotificationItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NotificationItem({ notification }) {
    return (
        <div className={cx('wrapper', !notification.isRead ? 'unread' : '')}>
            <span className={cx('title')}>{notification.title}</span>
            <span className={cx('content')}>{notification.content}</span>
            <span className={cx('created-time')}>{notification.createdAt}</span>
        </div>
    );
}

export default NotificationItem;
