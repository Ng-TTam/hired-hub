import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../Popper';
import Menu from '../Menu/Menu'; // Đường dẫn đến component Menu
import './MenuProfileCV.scss'; // Đường dẫn đến tệp SCSS của component

const MenuProfileCV = () => {
    // const isLogin = useSelector((state) => state.authentication.isLogin);
    const isLogin = localStorage.getItem('isLogin');
    
    // Danh sách các mục menu
    const MENU_ITEMS = [
        {
            icon: <i className="fa-regular fa-file-user"></i>,
            title: 'Tạo CV',
            to: isLogin ? '../../job-seeker/cv-create': '../login',
        },
        {
            icon: <i className="fa-regular fa-file-user"></i>,
            title: 'Quản lý CV',
            to: isLogin ?  '../../job-seeker/cv-management':'../login',
        },
    ];

    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div >
                    <PopperWrapper>
                        <Menu items={MENU_ITEMS}/>
                    </PopperWrapper>
                </div>
            )}
        >
            <div className='menu-item'>
                <div className="cvo-flex cvo-items-center box-item-parent btn-icon-parent activeToggle">
                    <div className="cvo-flex-grow info">
                        <a href="javascript:void(0)" className="name color-green font-weight-bold">
                            Hồ sơ & CV
                        </a>
                    </div>
                </div>
            </div>
        </HeadlessTippy>
    );
};

export default MenuProfileCV;
