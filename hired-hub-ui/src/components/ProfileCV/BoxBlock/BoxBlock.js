import React from "react";
// import "./BoxBlock.scss";
import CVItem from '../CVItem/CVItem'; // Import CVItem nếu bạn muốn sử dụng nó
import CVList from "../CVList/CVList";

function BoxBlock({ titleBox, action, noCvImage, cvList }) {
    return (
        <div id="cv-list" className="box-block">
            <div className="boxheader">
                <h1 className="title">{titleBox}</h1>
                <a href="#" className="btn btn-add-cv btn-primary-hover">
                    {action}
                </a>
            </div>
            {CVList && CVList.length > 0 ? ( // Kiểm tra xem danh sách CV có tồn tại không
                <CVList/>
            ) : (
                <div className="box-conten box-no-cv">
                    <img src={noCvImage} alt="no-cv" />
                    <p>Bạn chưa tạo CV nào</p>
                </div>
            )}
        </div>
    );
}

export default BoxBlock; // Xuất với tên đúng
