import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosting } from '../../../redux/postingSlice';
import AreaInput from '../AreaInput';

function FormAddress() {
    const dispatch = useDispatch();
    const { posting } = useSelector((state) => state.postings);
    const [areas, setAreas] = useState(posting.areas || [{}]);

    useEffect(() => {
        dispatch(
            setPosting({
                areas,
            }),
        );
    }, [areas]);

    const handleOnChangeArea = (value, index) => {
        setAreas((prevAreas) => {
            const updatedAreas = [...prevAreas];
            updatedAreas[index] = value;
            return updatedAreas;
        });
    };

    const handleAddAreas = () => {
        setAreas((prevAreas) => [...prevAreas, { province: {}, addresses: [{}] }]);
    };

    const handleRemoveArea = (index) => {
        const updatedAreas = [...areas];
        updatedAreas.splice(index, 1);
        setAreas(updatedAreas);
    };

    return (
        <>
            <div className="area-container">
                {areas.map((area, index) => (
                    <AreaInput
                        key={`area_${index}`}
                        area={area || {}}
                        index={index + 1}
                        removeAble={areas.length > 1}
                        onChange={(value) => handleOnChangeArea(value, index)}
                        onRemove={() => handleRemoveArea(index)}
                    />
                ))}
            </div>
            <button className="button-success" onClick={handleAddAreas}>
                Thêm khu vực mới
            </button>
        </>
    );
}

export default FormAddress;
