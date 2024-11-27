import React, { useEffect } from 'react';
import CVItem from '../CVItem/CVItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCVs } from '../../../redux/cvSlice';
import images from '../../../assets/images';
import './CVList.scss';

const CVList = () => {
    const dispatch = useDispatch();
    const { list: cvList, loading, error } = useSelector(state => state.cv);

    const handleDelete = (cvId) => {
        dispatch(fetchCVs());
    };

    useEffect(() => {
        dispatch(fetchCVs());
    }, [dispatch]);

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">Lỗi: {error.message}</div>;

    return (
        <div className="cv-list">
            {cvList.length > 0 ? (
                cvList.map(cv => (
                    <CVItem 
                        key={cv.id}
                        cvId={cv.id}
                        titleBox={cv.description}
                        onDelete={handleDelete}
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
