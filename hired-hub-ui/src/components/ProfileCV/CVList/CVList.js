import React, { useEffect, useState } from 'react';
import CVItem from '../CVItem/CVItem'

const CVList = () => {
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCVs = async () => {
            try {
                const response = await fetch('localhost:8888/api/v1/cv');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCvs(data.data); // Giả sử dữ liệu được trả về nằm trong trường "data"
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCVs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="cv-list">
            {CVList.map((cvs) => (
                <CVItem 
                    key={cvs.id} // Sử dụng id của CV làm khóa duy nhất
                    cvId={cvs.id} 
                    cvDescription={cvs.description} 
                    cvLink={"localhost3000:cv/view/"+cvs.id}
                    editLink={"localhost3000:cv/edit/"+cvs.idd} // Nếu có
                />
            ))}
        </div>
    );
};

export default CVList;
