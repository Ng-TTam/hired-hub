import React from "react";
import './CVManagementItem.scss'
import images from '../../assets/images/index'

const CVManagementItem = (applications) =>{

    return(
        <div className="cv-manage-container">
            <div className="cv-manage-image">
                <img src={images.avatarDefault}/>
            </div>
            <div className="cv-manage-name">
                <div>
                    {applications? `${applications.cv.jobSeeker.firstName} ${applications.cv.jobSeeker.lastName}` : "Nguyễn Văn A"}
                </div>
                <div>
                    {applications? `${applications.cv.updateAt}` : 0}
                </div>
            </div>
            <div className="cv-manage-posting">
                {applications? `${applications.posting.title}` : "Title"}
            </div>
            <div className="cv-manage-contact">
                <div>
                    {applications? `${applications.email}`: "email@example.com"}
                </div>
                <div>
                    {applications? `${applications.cv.jobSeeker.phoneNumber}`: "01234567890"}
                </div>
            </div>
            <div className="cv-manage-status">
                {applications? `${applications.cv.status}` : "None"}
            </div>
        </div>
    );
}
export default CVManagementItem;