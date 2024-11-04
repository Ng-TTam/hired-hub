import React from "react";
import CVItem from "./CVItem"; // Nhập component CVItem
// import "./BoxBlock.scss";

function BoxBlock({ titleBox, action, noCvImage, cvList, onDelete }) {
    return (
        <div id="cv-list" className="box-block">
            <div className="boxheader">
                <h1 className="title">{titleBox}</h1>
                <a href="#" className="btn btn-add-cv btn-primary-hover">
                    {action}
                </a>
                <div id="createCVModel" tabIndex="-1" role="dialog" className="modalfade">
                    {/* Nội dung modal sẽ được thêm vào đây */}
                </div>
            </div>
            {cvList.length > 0 ? ( // Kiểm tra xem danh sách CV có tồn tại không
                <div className="cv-list">
                    {cvList.map((cv, index) => (
                        <CVItem 
                            key={index}
                            cvId={cv.id} // Giả sử mỗi CV có một thuộc tính id
                            cvDescription={cv.description}
                            cvLink={cv.link}
                            editLink={cv.editLink}
                            onDelete={() => onDelete(cv.id)} // Gọi hàm onDelete khi cần
                        />
                    ))}
                </div>
            ) : (
                <div className="box-conten box-no-cv">
                    <img src={noCvImage} alt="no-cv" />
                    <p>Bạn chưa tạo CV nào</p>
                </div>
            )}
        </div>
    );
}

export default BoxBlock;