import React, { useEffect, useState } from "react";
import './PostingsApplication.scss';
import ProfileJobSeeker from "../ProfileCV/ProfileJobSeeker/ProfileJobSeeker";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicationsJobSeeker, resetApplication } from "../../redux/applicationSlice";
import PostingsApplicationItem from "./PostingsApplicationItem/PostingsApplicationItem";
import { Dropdown, Menu } from "antd";
import images from "../../assets/images";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Pagination";

const ITEMS_PER_PAGE = 5;

const PostingsApplication = () => {
    const dispatch = useDispatch();
    const { applications } = useSelector(state => state.application);
    const [isOpen, setIsOpen] = useState(false); 

    const [filterStatus, setFilterStatus] = useState(null);
    const [filterStatusLabel, setFilterStatusLabel] = useState("Trạng thái");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchApplicationsJobSeeker());
        return () => {
            dispatch(resetApplication());
        };
    }, [dispatch]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const statusOptions = [
        { key: "null", label: "Trạng thái" },
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
                setCurrentPage(1);
            }}
            items={statusOptions.map(option => ({
                key: option.key,
                label: option.label,
            }))}
        />
    );
    const filteredApplications = filterStatus 
        ? filterStatus === "null" 
            ? applications 
            : applications?.filter(app => app.status === filterStatus)
        : applications;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredApplications?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredApplications?.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="pa-container">
            <div className="pa-data">
                <div className="pa-header">
                    <div className="pa-header-title" style={{ fontSize: "24px", fontWeight: "bold", alignSelf:"center"}}>
                        Việc làm đã ứng tuyển
                    </div>
                    <div className="pa-header-select">
                        <Dropdown overlay={statusMenu} trigger={['click']} placement="bottom" overlayClassName="pa-custom-dropdown"
                        onClick={handleToggle}
                        onBlur={() => setIsOpen(false)}
                        >
                            <button className="pa-filter-dropdown" style={{fontSize:"14px"}}>
                                {filterStatusLabel}
                                <FontAwesomeIcon 
                                    icon={isOpen ? faChevronUp : faChevronDown} 
                                    style={{transition: 'transform 0.2s'}} 
                                />
                            </button>
                        </Dropdown>
                    </div>
                </div>
                <div className="pa-list">
                    {currentItems.length > 0 ? (
                        currentItems.map(application => (
                            <PostingsApplicationItem key={application.id} application={application} />
                        ))
                    ) : (
                        <div className="no-pa-list">
                            <div className="no-pa-image">
                                <img src={images.emptyApllication} alt="No Applications" />
                            </div>
                            <div className="no-pa-title">Không tìm thấy thông tin ứng tuyển nào!</div>
                            <div className="no-pa-des"> 
                                <p>Bắt đầu sự nghiệp mơ ước với hàng nghìn việc làm chất lượng tại HiredHub</p>
                            </div>
                            <div className="no-pa-button">
                                <Link style={{color: "white"}} to={'../../'}>Tìm việc ngay</Link>
                            </div>
                        </div>
                    )}
                </div>
                {filteredApplications?.length > ITEMS_PER_PAGE && (
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    />
                )}
            </div>
            <div className="pa-profile">
                <ProfileJobSeeker />
            </div>
        </div>
    );
};

export default PostingsApplication;
