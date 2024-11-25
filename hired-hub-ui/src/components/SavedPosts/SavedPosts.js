import React, { useEffect, useState } from "react";
import './SavedPosts.scss';
import ProfileJobSeeker from "../ProfileCV/ProfileJobSeeker/ProfileJobSeeker";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedPosts } from "../../redux/savedPostingSlice";
import SavedPostingItem from "./SavedPostingItem/SavedPostingItem";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import Pagination from "../Pagination";

const ITEMS_PER_PAGE = 5;

const SavedPosts = () =>{
    const dispatch = useDispatch();
    const {savedPostings, count} = useSelector(state => state.savedPosting);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchSavedPosts());
    }, [dispatch]);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = savedPostings?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(savedPostings?.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    console.log("abcd", savedPostings)
    return(
        <div className="savedpost-container">
            <div className="savedpost-data">
                <div className="savedpost-header">
                    <p style={{marginBottom:"8px", fontSize: "24px", fontWeight:"bold"}}>
                        Việc làm đã lưu
                    </p>
                    <p style={{fontSize:"15px"}}>
                    Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
                    </p>
                </div>
                <div className="savedpost-count">
                    Có <strong>{count}</strong> việc làm đã lưu
                </div>
                <div className="savedpost-list">
                    {currentItems?.length > 0 ?(
                        currentItems?.map(savedPosting => (
                            <SavedPostingItem savedPosting={savedPosting}/>
                        ))
                    ) : (
                        <div className="no-sp-list">
                            <div className="no-sp-image">
                                <img src={images.emptyApllication} alt="No Applications" />
                            </div>
                            <div className="no-sp-title">Bạn chưa lưu công việc nào!</div>
                            <div className="no-sp-button">
                                <Link style={{color: "white"}} to={'../../'}>Tìm việc ngay</Link>
                            </div>
                        </div>
                    )}
                </div>
                {savedPostings?.length > ITEMS_PER_PAGE && (
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    />
                )}
            </div>
            <div className="savedpost-profile">
                <ProfileJobSeeker></ProfileJobSeeker>
            </div>
        </div>
    );
}
export default SavedPosts;