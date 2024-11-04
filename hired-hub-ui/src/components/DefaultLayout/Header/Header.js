import React from "react";
import styles from './Header.module.scss';
import classNames from "classnames/bind";
import Logo from '../../../assets/images/topcv-logo-10-year.png';
import Button from "../../Button";

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={Logo} alt="TopCV Logo" title="Logo của TopCV" className={cx('logo')} />
                <div className={cx('nav-bar')}>
                    <ul className={cx('nav-list')}>
                        <li className={cx('nav-list__item')}><a href="google.com">Việc làm</a></li>
                        <li className={cx('nav-list__item')}><a href="localhost:3000/hoso&cv">Hồ sơ & CV</a></li>
                    </ul>
                    <div className={cx('actions')}>
                        <Button to='login' outline>Đăng nhập</Button>
                        <Button primary to='register'>Đăng ký</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
