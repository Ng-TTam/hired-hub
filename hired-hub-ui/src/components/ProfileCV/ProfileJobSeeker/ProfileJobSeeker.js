import React, { useEffect } from "react";
import images from "../../../assets/images";
import './ProfileJobSeeker.scss'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInformation } from "../../../redux/userSlice";

const ProfileJobSeeker = () =>  {
    const dispatch = useDispatch();
    const {user,loading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUserInformation());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return(
        <div className="turn-on-job_header">
            <div className="profile-avatar">
                <img src={images.avatarDefault} alt="avt"/>
                
            </div>
            <div className="turn-on-job__header-info">
                <div className="text-welcome">Chào bạn trở lại,</div>
                <h4 className="profile-fullname">{`${user.firstName} ${user.lastName}`}</h4>
                <div className="account-type vip">
                    <span>{user.phoneNumber}</span>
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