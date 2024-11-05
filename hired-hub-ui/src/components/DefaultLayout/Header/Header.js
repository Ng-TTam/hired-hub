import { faArrowRightFromBracket, faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import images from '../../../assets/images';
import AccountIcon from '../../AccountIcon';
import Button from '../../Button';
import styles from './Header.module.scss';
import Menu from '../../Menu';
import { Wrapper as PopperWrapper } from '../../Popper';
import MenuItemProfileCV from '../../MenuProfileCV/MenuProfileCV';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        title: 'Cài đặt thông tin cá nhân',
        to: '/1',
    },
    {
        icon: <FontAwesomeIcon icon={faLock} />,
        title: 'Đổi mật khẩu',
        to: '/2',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Đăng xuất',
        to: '/logout',
    },
];

function Header() {
    const isLogin = useSelector((state) => state.authentication.isLogin);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logoTopCV} alt="TopCV Logo" title="Logo của TopCV" className={cx('logo')} />
                <div className={cx('nav-bar')}>
                    <ul className={cx('nav-list')}>
                        <li className={cx('nav-list__item')}>
                            <NavLink to={'/'}>Việc làm</NavLink>
                        </li>
                        <li className={cx('nav-list__itemcv')}>
                            <MenuItemProfileCV>Hồ sơ & CV</MenuItemProfileCV>
                        </li>
                    </ul>
                    {isLogin ? (
                        <div>
                            <HeadlessTippy
                                interactive
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <Menu items={MENU_ITEMS} />
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <div>
                                    <AccountIcon />
                                </div>
                            </HeadlessTippy>
                        </div>
                    ) : (
                        <div className={cx('actions')}>
                            <Button to="../login" outline>
                                Đăng nhập
                            </Button>
                            <Button primary to="../register">
                                Đăng ký
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
