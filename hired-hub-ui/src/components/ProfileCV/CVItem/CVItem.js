import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import "./CVItem.scss";

function CVItem({ cvId, titleBox, onDelete }) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8888/api/v1/cv/${cvId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Xóa CV thành công!");
            onDelete(cvId);
            setShowConfirmDialog(false); // Ẩn hộp thoại sau khi xóa thành công
        } catch (error) {
            console.error("Lỗi khi xóa CV:", error);
            alert("Đã xảy ra lỗi khi xóa CV.");
        }
    };

    return (
        <div className="col-md-6 col-12 pr-12">
            <div className="box-cv">
                <div className="box-bg">
                    <div className="box-info">
                        <h4 className="description-cv">
                            <NavLink to={`../xem-cv/${cvId}`} className="select-cv">
                                {titleBox}
                            </NavLink>
                            <NavLink to="../" className="edit">
                                edit
                            </NavLink>
                        </h4>
                        <ul className="action">
                            <li>
                                <button 
                                    onClick={() => setShowConfirmDialog(true)} // Hiện hộp thoại khi nhấn nút
                                    className="delete-button"
                                >
                                    DELETE
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Hộp thoại xác nhận xóa */}
            {showConfirmDialog && (
                <div className="confirm-dialog">
                    <p>Bạn có chắc chắn muốn xóa CV này không?</p>
                    <button onClick={handleDelete} className="confirm-button">Xác nhận</button>
                    <button onClick={() => setShowConfirmDialog(false)} className="cancel-button">Hủy</button>
                </div>
            )}
        </div>
    );
}

export default CVItem;
