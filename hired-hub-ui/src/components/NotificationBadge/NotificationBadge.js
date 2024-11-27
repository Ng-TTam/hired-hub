import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket, disconnectWebSocket } from '../../config/webSocketConfig';
import { fetchNotifications, markAsReadAll } from '../../redux/notificationSlice';
import { Wrapper as PopperWrapper } from '../Popper';
import styles from './NotificationBadge.module.scss';
import NotificationItem from './NotificationItem';

const cx = classNames.bind(styles);

function NotificationBadge({ className }) {
    const dispatch = useDispatch();
    const { unreadCount, notifications, updated } = useSelector((state) => state.notifications);
    const user = useSelector((state) => state.user.user);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    useEffect(() => {
        if (updated) dispatch(fetchNotifications());
    }, [updated]);

    useEffect(() => {
        if (user) connectWebSocket(user.id);
        return () => {
            disconnectWebSocket();
        };
    }, [user]);

    const handleMarkAsReadAll = () => {
        dispatch(markAsReadAll());
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                placement="bottom"
                visible={open}
                onClickOutside={() => setOpen(false)}
                delay={[500, 300]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('on-top')}>
                            <div className={cx('content')}>
                                {notifications && notifications.length > 0 ? (
                                    <>
                                        <div className={cx('actions')} onClick={handleMarkAsReadAll}>
                                            <span>Đã đọc</span>
                                        </div>
                                        <div className={cx('notification-list')}>
                                            {notifications.map((item) => (
                                                <NotificationItem
                                                    key={item.id}
                                                    notification={item}
                                                    onClick={() => setOpen(false)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <span className={cx('empty-message')}>Bạn không có thông báo nào!</span>
                                )}
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('notification-badge', className)} onClick={() => setOpen((prev) => !prev)}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={faBell} />
                    </span>
                    {unreadCount > 0 && <span className={cx('count')}>{unreadCount}</span>}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default NotificationBadge;
