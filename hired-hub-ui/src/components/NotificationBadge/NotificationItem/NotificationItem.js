import styles from './NotificationItem.module.scss';
import classNames from 'classnames/bind';
import { formatDateTime } from '../../../utils';

const cx = classNames.bind(styles);

function NotificationItem({ notification }) {
    return (
        <div className={cx('wrapper', !notification.isRead ? 'unread' : '')}>
            <span className={cx('title')}>{notification.title}</span>
            <span className={cx('content')}>{notification.content}</span>
            <span className={cx('created-time')}>{formatDateTime(notification.createdAt)}</span>
        </div>
    );
}

export default NotificationItem;
