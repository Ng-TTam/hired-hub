import React from "react";
import './SavedPostingItem.scss'
import images from "../../../assets/images";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import { unsavePosting } from "../../../redux/savedPostingSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SavedPostingItem = ({savedPosting}) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatdate = (date) =>{
        return format(parseISO(date), "dd/MM/yyyy - HH:mm", { locale: vi });
    }

    const handSavePost = async () =>{
        const unsaved ={postId: savedPosting.posting.id};
        await dispatch(unsavePosting(unsaved)).unwrap();
        window.location.reload();
    }

    const handPosting = () =>{
        navigate(`../posting/${savedPosting.posting.id}`);
    }

    const handCompany = () =>{
        navigate(`../company/${savedPosting.posting.company.id}`);
    }

    return(
        <div className="sp-item">
            <div className="spost-avatar">
                <img src={images.logoDefault} style={{width:"102px", height:"102px", borderRadius:"5%"}}/>
            </div>
            <div className="sp-data">
                <div className="sp-title-block">
                    <div className="sp-posting-title" onClick={handPosting}>
                        {savedPosting?.posting.title || "Title"}
                    </div>
                    <div className="sp-money">
                        {`${savedPosting.posting.minimumSalary} - ${savedPosting.posting.maximumSalary} ${savedPosting.posting.currencyUnit}`}
                    </div>
                </div>
                <div className="sp-comany-name" onClick={handCompany}>
                    {savedPosting.posting.company.name}
                </div>
                <div className="sp-time-save">
                    {`Đã lưu: ${formatdate(savedPosting.savedAt)}`}
                </div>
                <div className="sp-infor">
                    <div className="sp-infor-time">
                        {`Cập nhật ${formatDistanceToNow(new Date(savedPosting.posting.expiredAt), { locale: vi })} trước`}
                    </div>
                    <button className="sp-action" onClick={handSavePost}>
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: '#424e5c', fontSize: '12px', marginRight: '10px' }}
                        />
                        Bỏ lưu</button>
                    
                </div>
            </div>
        </div>
    );
}

export default SavedPostingItem;