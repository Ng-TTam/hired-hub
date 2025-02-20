import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCVs } from '../../../redux/cvSlice';
import images from '../../../assets/images';
import './CVSelect.scss';
import { NavLink } from 'react-router-dom';
import HtmlRenderer from '../../HtmlRenderer';

const CVSelect = ({ onCVSelect }) => {
    const dispatch = useDispatch();
    const { list: cvList, loading, error } = useSelector(state => state.cv);
    const [selectedCV, setSelectedCV] = useState(null);

    useEffect(() => {
        dispatch(fetchCVs());
    }, [dispatch]);

    const handleCVClick = (cvId) => {
        setSelectedCV(prevCV => {
            const newCV = prevCV === cvId ? null : cvId;
            onCVSelect(newCV);
            return newCV;
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        cvList.length > 0 ? (
            <div className="box-conten">
                {cvList.map(cv => (
                    <div key={cv.id} className={cv.id}>
                        <div
                            className={`box-bg-1 ${selectedCV === cv.id ? 'selected' : ''}`}
                            onClick={() => handleCVClick(cv.id)}
                        >
                            <div className="box-info-1">
                                <h4 className="description-cv-1">
                                    <NavLink to={`../../job-seeker/cv-review/${cv.id}`} className="select-cv">
                                        <HtmlRenderer content={cv?.name || "None"}/>
                                    </NavLink>
                                </h4>
                            </div>
                        </div>
                    </div>
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

export default CVSelect;
