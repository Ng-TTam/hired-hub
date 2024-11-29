import React from "react";
import './PostingsApplicationItem.scss'
import images from "../../../assets/images";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import { useNavigate } from "react-router-dom";
import HtmlRenderer from "../../HtmlRenderer";

const PostingsApplicationItem = ({application}) =>{
    const navigate = useNavigate();

    const formatdate = (date) =>{
        return format(parseISO(date), "dd/MM/yyyy - HH:mm", { locale: vi });
    }

    const handCV = () =>{
        navigate(`../cv-review/${application.cv.id}`);
    }

    const handPosting = () =>{
        navigate(`../../posting/${application.posting.id}`);
    }

    const handCompany = () =>{
        navigate(`../../company/${application.posting.company.id}`);
    }

    return(
        <div className="pai-item">
            <div className="pai-avatar" style={{ alignSelf:"center"}}>
                <img src={images.logoDefault} alt="avtar ứng viên" style={{width:"102px", height:"102px", borderRadius:"5%"}}/>
            </div>
            <div className="pai-data">
                <div className="pai-title-block">
                    <div className="pai-posting-title" onClick={handPosting}>
                        {application?.posting.title || "Title"}
                    </div>
                    <div className="pai-money">
                        {`${application.posting.minimumSalary} - ${application.posting.maximumSalary} ${application.posting.currencyUnit}`}
                    </div>
                </div>
                <div className="pai-comany-name" onClick={handCompany}>
                    {application.posting.company.name}
                </div>
                <div className="pai-time-save">
                    {`Thời gian ứng tuyển: ${formatdate(application.createdAt)}`}
                </div>
                <div className="pai-time-save">
                    <div>CV ứng tuyển: </div>
                    <div className="pai-cv-des"><HtmlRenderer content={application.cv.description}/></div>
                </div>
                <div className="pai-infor">
                    <div className="pai-infor-time">
                        {`Trạng thái: ${
                            application.status === "PENDING" ? "Đang chờ phản hồi"
                            : application.status === "APPROVED" ? "Hồ sơ phù hợp"
                            : "Hồ sơ chưa phù hợp"
                        }`}
                    </div>
                    <button className="pai-action" onClick={handCV}>
                        <FontAwesomeIcon
                            icon={faEye}
                            style={{ color: '#00b14f', fontSize: '12px', marginRight: '10px' }}
                        />
                        Xem CV</button>
                    
                </div>
            </div>
        </div>
    );
}

export default PostingsApplicationItem;