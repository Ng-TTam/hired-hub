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
        dispatch(fetchUserInformation());
    }, [dispatch]);

    return (
        <div className={cx('wrapper')} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Image className={cx('avatar')} src={user?.avatar} alt={user?.firstName} fallback={images.avatarDefault} />
            <FontAwesomeIcon icon={faChevronUp} className={cx('icon', { rotate: isOpen })} />
        </div>
    );
}

export default AccountIcon;
