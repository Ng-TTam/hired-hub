import React, { useEffect } from 'react';
import CVItem from '../CVItem/CVItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCVs } from '../../../redux/cvSlice';
import images from '../../../assets/images';
import './CVList.scss';

const CVList = () => {
    const dispatch = useDispatch();
    const { list: cvList, loading, error } = useSelector(state => state.cv);

    // Cập nhật danh sách CV khi có sự thay đổi
    const handleDelete = (cvId) => {
        dispatch(fetchCVs()); // Gọi lại action fetchCVs để tải lại dữ liệu sau khi xóa
    };

    useEffect(() => {
        dispatch(fetchCVs()); // Lấy danh sách CV khi component mount
    }, [dispatch]);

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">Lỗi: {error.message}</div>;

    return (
        <div className="cv-list">
            {cvList.length > 0 ? (
                cvList.map(cv => (
                    <CVItem 
                        key={cv.id} // Đảm bảo mỗi item có key duy nhất
                        cvId={cv.id}
                        titleBox={cv.description}
                        onDelete={handleDelete} // Truyền handleDelete xuống CVItem
                    />
                ))
            ) : (
                <div className="box-conten box-no-cv">
                    <img className='no-cv' src={images.noCVImage} alt='no-cv' />
                    <p>Bạn chưa tạo CV nào</p>
                </div>
            )}
        </div>
    );
};

export default CVList;
