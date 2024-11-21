import React, { useEffect } from "react";
import './SavedPosts.scss';
import ProfileJobSeeker from "../ProfileCV/ProfileJobSeeker/ProfileJobSeeker";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedPosts } from "../../redux/savedPostingSlice";
import SavedPostingItem from "./SavedPostingItem/SavedPostingItem";

const SavedPosts = () =>{
    const dispatch = useDispatch();
    const {savedPostings, count} = useSelector(state => state.savedPosting);

    useEffect(() => {
        dispatch(fetchSavedPosts());
    }, [dispatch]);

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
                    Danh sách <strong>{count}</strong> việc làm đã lưu
                </div>
                <div className="savedpost-list">
                    {savedPostings?.map(savedPosting => (
                        <SavedPostingItem savedPosting={savedPosting}/>
                    ))}
                </div>
            </div>
            <div className="savedpost-profile">
                <ProfileJobSeeker></ProfileJobSeeker>
            </div>
        </div>
    );
}
export default SavedPosts;