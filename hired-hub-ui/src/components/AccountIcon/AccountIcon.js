import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../assets/images';
import { fetchUserInformation } from '../../redux/userSlice';
import Image from '../Image';
import styles from './AccountIcon.module.scss';

const cx = classNames.bind(styles);

function AccountIcon() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.avatar) {
                    dispatch({ type: 'user/fetchUserInformation', payload: parsedUser });
                }
            } catch (error) {
                console.error('Lỗi khi parse dữ liệu người dùng từ localStorage:', error);
            }
        } else {
            dispatch(fetchUserInformation());
        }
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
                console.error('Lỗi khi lưu dữ liệu vào localStorage:', error);
            }
        }
    }, [user]);

    return (
        <div className={cx('wrapper')} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Image className={cx('avatar')} src={user?.avatar} alt={user?.firstName} fallback={images.avatarDefault} />
            <FontAwesomeIcon icon={faChevronUp} className={cx('icon', { rotate: isOpen })} />
        </div>
    );
}

export default AccountIcon;
