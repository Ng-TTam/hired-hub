import React, { useEffect } from "react";
import images from "../../../assets/images";
import './ProfileJobSeeker.scss'
import { useSelector } from "react-redux";
import Image from '../../Image'

const ProfileJobSeeker = () =>  {
    const email = localStorage.getItem('email');
    const user = useSelector((state) => state.user.user);

    return(
        <div className="turn-on-job_header" 
        style={{padding: "20px"}}>
            <div className="profile-avatar">
                <Image className='img-cv-1'
                    src={user.avatar || images.avatarDefault}
                    alt="User avatar"
                    fallback={ images.avatarDefault}
                    style={{maxWidth: "60%", maxHeight: "60%", aspectRatio: "1 / 1", objectFit:"cover",borderRadius: "50%" , marginLeft:"auto" , marginRight:"auto"}}
                />
                
            </div>
            <div className="turn-on-job__header-info">
                <div className="text-welcome">Chào bạn trở lại,</div>
                <h4 className="profile-fullname">{user? `${user.firstName} ${user.lastName}` : "Nguyễn Văn A"}</h4>
                <div className="account-type vip">
                    <span>{email? email : "email@example.com"}</span>
                    
                </div>
                <span style={{marginTop: "8px"}}>{user? user.phoneNumber : "091283647"}</span>
            </div>
        </div>

    );
}
export default ProfileJobSeeker;