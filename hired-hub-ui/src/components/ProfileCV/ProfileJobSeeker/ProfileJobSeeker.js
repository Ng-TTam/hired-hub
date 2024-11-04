import React from "react";
import images from "../../../assets/images";
import './ProfileJobSeeker.scss'

function ProfileJobSeeker() {
    return(
        <div class="turn-on-job_header">
            <div class="profile-avatar">
                <img src={images.avatarDefault} alt="avt"/>
                
            </div>
            <div class="turn-on-job__header-info">
                <div class="text-welcome">Chào bạn trở lại,</div>
                <h4 class="profile-fullname">Đăng Tùng Nguyễn</h4>
                <div class="account-type vip">
                    <span>Tài khoản đã xác thực</span>
                </div>
                <div class="box-footer">
                    <a href="#" class="btn btn-sm btn-upgrade">
                        <i class="fa-solid fa-circle-arrow-up"></i>
                        <span>Nâng cấp tài khoản</span>
                    </a>
                </div>
            </div>
        </div>

    );
}
export default ProfileJobSeeker;