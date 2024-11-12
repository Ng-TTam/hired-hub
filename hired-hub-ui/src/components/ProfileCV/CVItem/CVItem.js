import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./CVItem.scss";

function CVItem({ cvId, titleBox, onDelete }) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const navigate = useNavigate();

    const handEdit = () => {
        navigate(`../edit-cv/${cvId}`);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8888/api/v1/cv/${cvId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Xóa CV thành công!");
            onDelete(cvId); // Gọi hàm onDelete để cập nhật lại danh sách
            setShowConfirmDialog(false);
        } catch (error) {
            console.error("Lỗi khi xóa CV:", error);
            setShowConfirmDialog(false);
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
                        </h4>
                        <ul className="action">
                            <li>
                                <button 
                                        onClick={handEdit}
                                        className="confirm-button"
                                    >
                                    Chỉnh sửa
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setShowConfirmDialog(true)} // Hiện hộp thoại khi nhấn nút
                                    className="del-button"
                                >
                                    Xóa CV
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
                    <button onClick={handleDelete} className="del-button">Xác nhận</button>
                    <button onClick={() => setShowConfirmDialog(false)} className="cancel-button">Hủy</button>
                </div>
            )}
        </div>
    );
}

export default CVItem;
