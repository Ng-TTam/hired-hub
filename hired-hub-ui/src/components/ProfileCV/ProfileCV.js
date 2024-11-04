import React from "react";
import BoxBlock from "./BoxBlock/BoxBlock";
import './ProfileCV.scss'
import ProfileJobSeeker from "./ProfileJobSeeker/ProfileJobSeeker";

function ProfileCV() {
    return(
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