import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./CVItem.scss";
import HtmlRenderer from "../../HtmlRenderer";
import { Modal, notification } from "antd";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { fetchCVs, updateCV } from "../../../redux/cvSlice";

function CVItem({ cv, onDelete, onChange }) {
    const cvId = cv?.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState(cv?.name);
    const [isClickSave, setIsClickSave] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const containerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsClickSave(false);
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handEdit = () => {
        navigate(`../../job-seeker/cv-edit/${cvId}`);
    };

    const validateName = () => {
        const newErrors = {};
    
        if (!name) {
            newErrors.name = "* Tên CV không được để trống";
        }
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };

    const handleDelete = async () => {
        Modal.confirm({
            title: 'Bạn có chắc chắn?',
            content: `Bạn có chắc chắn muốn xóa CV ${cv?.name} không?`,
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                const handReject = async(cvId) => {
                    const token = localStorage.getItem('token');
                    try {
                        await axios.delete(`http://localhost:8888/api/v1/cv/${cvId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        onDelete(cvId);
                        notification.success({
                            message: 'Thành công',
                            description: 'Xóa thành công',
                        });
                    } catch (error) {
                        notification.error({
                            message: 'Thất bại',
                            description: `Xóa thất bại - ${
                                "CV đang tham gia ứng tuyển"
                            }`,
                        });
                    }
                };
                handReject(cvId);
            },
        });
        
    };

    const handSetName = () =>{
        setIsClickSave(true);
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        const isValid = validateName();
        if (isValid && cv?.name != name) {
            const updatedCV = {
                name: name,
                description: cv?.description,
                education: cv?.education,
                experience: cv?.experience,
                skill: cv?.skill,
                others: cv?.others,
            };
            try {
                await dispatch(updateCV({ cvId, updatedCV })).unwrap();
                dispatch(fetchCVs());
                notification.success({
                    message: 'Thành công',
                    description: 'Cập nhật thành công',
                });
            } catch (error) {
                notification.error({
                    message: 'Thất bại',
                    description: `Cập nhật thất bại`,
                });
            }
        };
        setIsClickSave(false);
        setIsModalOpen(false);
    };

    return (
        <div className="col-md-6 col-12 pr-12">
            {isModalOpen && <div className="overlay"></div>}
            <div className="box-cv">
                <div className="box-bg">
                    <div className="box-info">
                        <h4 className="description-cv">
                            <NavLink to={`../../job-seeker/cv-review/${cvId}`} className="select-cv">
                                {cv?.name}
                            </NavLink> <button className="edit-name-cv" onClick={handSetName}><FontAwesomeIcon icon={faEdit} style={{fontSize: '14px', marginRight: '10px' }}/></button>
                        </h4>
                        <ul className="action">
                            <li>
                                <button 
                                        onClick={handEdit}
                                        className="edit-button"
                                    >
                                    Chỉnh sửa
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={handleDelete}
                                    className="del-button"
                                >
                                    Xóa CV
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {isClickSave && (
                <div className='save-cv-container' ref={containerRef}>
                    <div className='save-cv-title'>Nhập tên CV</div>
                    <input
                    className='save-cv-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error-message-cv-crud">{errors.name}</span>}
                    <div className='save-cv-action'>
                    <button className='btn-submit' onClick={handleSubmit}>Lưu</button>
                    <button className='btn-c' onClick={() => {setIsModalOpen(false); setIsClickSave(false);}}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CVItem;
