import { faArrowRightFromBracket, faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons/faBriefcase';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import images from '../../../assets/images';
import AccountIcon from '../../AccountIcon';
import Button from '../../Button';
import Menu from '../../Menu';
import MenuItemProfileCV from '../../MenuProfileCV/MenuProfileCV';
import NotificationBadge from '../../NotificationBadge';
import { Wrapper as PopperWrapper } from '../../Popper';
import styles from './Header.module.scss';
import { Card, Modal } from 'antd';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        title: 'Cài đặt thông tin cá nhân',
        to: '../../job-seeker/update-information',
    },
    {
        icon: <FontAwesomeIcon icon={faBriefcase} />,
        title: 'Việc làm đã ứng tuyển',
        to: '../../job-seeker/postings-application',
    },
    {
        icon: <FontAwesomeIcon icon={faFloppyDisk} />,
        title: 'Việc làm đã lưu',
        to: '../../job-seeker/saved-posts',
    },
    {
        icon: <FontAwesomeIcon icon={faLock} />,
        title: 'Đổi mật khẩu',
        to: '../../job-seeker/change-password',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Đăng xuất',
        to: '/logout',
    },
];

function Header() {
    const isLogin = localStorage.getItem('isLogin');
    const [openMenu, setOpenMenu] = useState(false);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={'/'} className={cx('logo')}>
                    <img
                        src={images.hiredHubLogo}
                        alt="Hired-hub-logo"
                        title="Logo của HiredHub"
                        className={cx('logo')}
                    />
                </Link>
                <div className={cx('nav-bar')}>
                    <ul className={cx('nav-list')}>
                        <li className={cx('nav-list__item')}>
                            <NavLink className={(nav) => cx({ active: nav.isActive })} to={'/'}>
                                Việc làm
                            </NavLink>
                        </li>
                        <li className={cx('nav-list__itemcv')}>
                            <MenuItemProfileCV>Hồ sơ & CV</MenuItemProfileCV>
                        </li>
                    </ul>
                    {isLogin ? (
                        <div className={cx('actions')}>
                            <NotificationBadge className={cx('notification-icon')} />
                            <div>
                                <HeadlessTippy
                                    interactive
                                    placement="bottom-end"
                                    visible={openMenu}
                                    onClickOutside={() => setOpenMenu(false)}
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <PopperWrapper>
                                                <Menu items={MENU_ITEMS} onClickItem={() => setOpenMenu(false)} />
                                            </PopperWrapper>
                                        </div>
                                    )}
                                >
                                    <div onClick={() => setOpenMenu((prev) => !prev)}>
                                        <AccountIcon />
                                    </div>
                                </HeadlessTippy>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('actions')}>
                            <Button to="/login" outline>
                                Đăng nhập
                            </Button>
                            <Button primary onClick={showModal}>
                                Đăng ký
                            </Button>
                            <Modal open={visible} onCancel={handleCancel} footer={null} width={800}>
                                <div style={{ textAlign: 'center' }}>
                                    <h1 style={{ color: '#00b14f' }}>Đăng ký tài khoản</h1>
                                    <h3 style={{ marginBottom: '0px' }}>Chào bạn,</h3>
                                    <span>Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!</span>
                                </div>
                                <div className={cx('container')} style={{ border: '0px' }}>
                                    <Link to="/business-sign-up">
                                        <Card className={cx('section')} style={{ border: 'none' }} hoverable>
                                            <img src={images.employer} alt="Người tuyển dụng" />
                                            <Button style={{ marginTop: 10, color: 'rgba(0, 0, 0, 0.88)' }}>
                                                Tôi là nhà tuyển dụng
                                            </Button>
                                        </Card>
                                    </Link>
                                    <Link to="/sign-up">
                                        <Card className={cx('section')} style={{ border: 'none' }} hoverable>
                                            <img src={images.jobSeeker} alt="Người tìm việc" />
                                            <Button style={{ marginTop: 10, color: 'rgba(0, 0, 0, 0.88)' }}>
                                                Tôi là người tìm việc
                                            </Button>
                                        </Card>
                                    </Link>
                                </div>
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
