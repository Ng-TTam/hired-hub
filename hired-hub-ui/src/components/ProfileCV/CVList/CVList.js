import React, { useEffect } from 'react';
import CVItem from '../CVItem/CVItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCVs } from '../../../redux/cvSlice';
import images from '../../../assets/images'
import './CVList.scss'

const CVList = () => {
    const dispatch = useDispatch();
    const { list: cvList, loading, error } = useSelector(state => state.cv);

    useEffect(() => {
        dispatch(fetchCVs());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        cvList.length > 0 ? (
            <div className="cv-list">
                {cvList.map(cv => (
                    <CVItem 
                        cvkey={cv.id}
                        cvId={cv.id} 
                        titleBox={cv.description} 
                    />
                ))}
            </div>
        ) : (
            <div className="box-conten box-no-cv">
                <img className='no-cv' src={images.noCVImage} alt='no-cv'/>
                <p>Bạn chưa tạo CV nào</p>
                
            </div>
        )
    );
};

export default CVList;
