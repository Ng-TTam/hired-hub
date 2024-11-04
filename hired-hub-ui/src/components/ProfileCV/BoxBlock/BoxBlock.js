import React from "react";
import CVList from "../CVList/CVList"; // Đảm bảo đường dẫn đúng
import './BoxBlock.scss'

function BoxBlock({ titleBox}) {
    return (
        <div id="cv-list" className="box-block-addcv">
            <div className="boxheader">
                <h1 className="title">{titleBox}</h1>
                <a href='./tao-cv' className="btn btn-add-cv btn-primary-hover ">Tạo mới</a>
            </div>
            <CVList />
        </div>
    );
}

export default BoxBlock;