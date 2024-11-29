import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../Popper';
import Menu from '../Menu/Menu';
import './MenuProfileCV.scss'; 
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const MenuProfileCV = () => {
    const isLogin = localStorage.getItem('isLogin');
    const navigate = useNavigate();

    const handClickManager = () => {
        if(isLogin){
            return;
        }
        Modal.confirm({
            title: 'Bạn chưa đăng nhập!',
            content: 'Đăng nhập ngay nhé?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                navigate('/login')
            },
        });
    };
    const MENU_ITEMS = [
        {
            title: 'Tạo CV',
            to: isLogin ? '../../job-seeker/cv-create': '',
        },
        {
            title: 'Quản lý CV',
            to: isLogin ?  '../../job-seeker/cv-management': '',
        },
    ];

    return (
        <HeadlessTippy
            interactive
            placement="bottom"
            render={(attrs) => (
                <div >
                    <PopperWrapper>
                        <Menu items={MENU_ITEMS} onClickItem={handClickManager}/>
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
