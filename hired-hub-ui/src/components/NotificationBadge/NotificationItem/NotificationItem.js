import styles from './NotificationItem.module.scss';
import classNames from 'classnames/bind';
import { formatDateTime } from '../../../utils';
import { useDispatch } from 'react-redux';
import { markAsRead } from '../../../redux/notificationSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function NotificationItem({ notification, onClick }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnClick = () => {
        if (!notification.isRead) dispatch(markAsRead(notification.id));
        const redirect = (() => {
            switch (notification.type) {
                case 'FOLLOWED_COMPANY_NEW_POST':
                    return `/posting/${notification.referenceId}`;
                case 'APPLICATION_STATUS_UPDATE':
                    return `/posting/${notification.referenceId}`;
                case 'APPLICATION_CV_UPDATE':
                    return '/business/manage-candidate';
                case 'NEW_CANDIDATE':
                    return 'business/manage-candidate';
                case 'FAVORITE_JOB_REMINDER':
                    return `/posting/${notification.referenceId}`;
                case 'POSTING_STATUS_CHANGE':
                    return '/business/posting-job';
            }
        })();
        navigate(redirect);
        onClick();
    };

    return (
        <div className={cx('wrapper', { unread: !notification.isRead })} onClick={handleOnClick}>
            <span className={cx('title')}>{notification.title}</span>
            <span className={cx('content')}>{notification.content}</span>
            <span className={cx('created-time')}>{formatDateTime(notification.createdAt)}</span>
        </div>
    );
}

export default NotificationItem;
