import React, { useEffect } from "react";
import images from "../../../assets/images";
import './ProfileJobSeeker.scss'
import { useSelector } from "react-redux";

const ProfileJobSeeker = () =>  {
    const email = localStorage.getItem('email');
    const user = useSelector((state) => state.user.user);

    return(
        <div className="turn-on-job_header">
            <div className="profile-avatar">
                <img src={images.avatarDefault} alt="avt"/>
                
            </div>
            <div className="turn-on-job__header-info">
                <div className="text-welcome">Chào bạn trở lại,</div>
                <h4 className="profile-fullname">{`${user.firstName} ${user.lastName}`}</h4>
                <div className="account-type vip">
                    <span>{email}</span>
                </div>
                <div className="box-footer">
                    <a href="#" class="btn btn-sm btn-upgrade">
                        <i className="fa-solid fa-circle-arrow-up"></i>
                        <span>Nâng cấp tài khoản</span>
                    </a>
                </div>
            </div>
        </div>

    );
}
export default ProfileJobSeeker;