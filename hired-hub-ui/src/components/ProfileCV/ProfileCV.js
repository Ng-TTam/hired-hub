import React, { useEffect } from 'react'; 
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import BoxBlock from './BoxBlock/BoxBlock'; 
import ProfileJobSeeker from './ProfileJobSeeker/ProfileJobSeeker'; 
import './ProfileCV.scss'

function ProfileCV() {
    return (
        <div className="profile-cv-container">
            <div className="box-block">
                <BoxBlock className="addboxblock" titleBox={"CV đã tạo"} />
            </div>
            <div className="profileStyle">
                <ProfileJobSeeker />
            </div>
        </div>
    );
}

export default ProfileCV;
