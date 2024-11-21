import React, { useEffect, useState } from "react";
import './PostingsApplication.scss';
import ProfileJobSeeker from "../ProfileCV/ProfileJobSeeker/ProfileJobSeeker";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicationsJobSeeker, resetApplication } from "../../redux/applicationSlice";
import PostingsApplicationItem from "./PostingsApplicationItem/PostingsApplicationItem";
import { Dropdown, Menu } from "antd";
import images from "../../assets/images";

const PostingsApplication = () => {
    const dispatch = useDispatch();
    const { applications } = useSelector(state => state.application);

    // State for filtering
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterStatusLabel, setFilterStatusLabel] = useState("Trạng thái");

    useEffect(() => {
        dispatch(fetchApplicationsJobSeeker());
        return () => {
            dispatch(resetApplication());
        };
    }, [dispatch]);

    // Menu items for the dropdown
    const statusOptions = [
        { key: "null", label: "Trạng thái" }, // Null key for showing all
        { key: "PENDING", label: "Đang chờ phản hồi" },
        { key: "APPROVED", label: "Hồ sơ phù hợp" },
        { key: "REJECTED", label: "Hồ sơ không phù hợp" },
    ];

    const statusMenu = (
        <Menu
            onClick={({ key }) => {
                const selectedOption = statusOptions.find(option => option.key === key);
                setFilterStatus(key);
                setFilterStatusLabel(selectedOption?.label || "Trạng thái");
            }}
            items={statusOptions.map(option => ({
                key: option.key,
                label: option.label,
            }))}
        />
    );

    // Filter applications based on selected status
    const filteredApplications = filterStatus?
            filterStatus === "null"? applications
            : applications?.filter(app => app.status === filterStatus)
        : applications;

    console.log("abc" ,filterStatus);
    return (
        <div className="pa-container">
            <div className="pa-data">
                <div className="pa-header">
                    <div className="pa-header-title" style={{ fontSize: "24px", fontWeight: "bold", alignSelf:"center"}}>
                        Việc làm đã ứng tuyển
                    </div>
                    <div className="pa-header-select">
                        <Dropdown overlay={statusMenu} trigger={['click']} placement="bottom" overlayClassName="pa-custom-dropdown">
                            <button className="pa-filter-dropdown" style={{fontSize:"14px"}}>
                                {filterStatusLabel}
                            </button>
                        </Dropdown>
                    </div>
                </div>
                <div className="pa-list">
                    {filteredApplications.length > 0 ?
                    (filteredApplications?.map(application => (
                        <PostingsApplicationItem key={application.id} application={application} />
                    )))
                    :(
                        <div className="no-pa-list">
                            <div className="no-pa-image">
                                <img src={images.emptyApllication}/>
                            </div>
                            <div className="no-pa-title">Bạn chưa ứng tuyển công việc nào!</div>
                            <div className="no-pa-des"> 
                                <p>Bạn chưa ứng tuyển công việc nào!</p>
                                <p>Bắt đầu sự nghiệp mơ ước với hàng nghìn việc làm chất lượng tại TopCV</p>
                            </div>
                            <div className="no-pa-button">
                                <button>Tìm việc ngay</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="pa-profile">
                <ProfileJobSeeker />
            </div>
        </div>
    );
};

export default PostingsApplication;
