import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosting } from '../../../redux/postingSlice';
import AreaInput from '../AreaInput';
import { Typography } from 'antd';

function FormAddress({ validate }) {
    const dispatch = useDispatch();
    const { posting } = useSelector((state) => state.postings);
    const [areas, setAreas] = useState(posting.areas || [{}]);
    const [error, setError] = useState('');
    const { Text } = Typography;

    useEffect(() => {
        dispatch(
            setPosting({
                areas,
            }),
        );
    }, [areas, dispatch]);

    useEffect(() => {
        console.log(validate)
        if (validate) {
            validate(() => {
                const newError = '';

                areas.forEach((area) => {
                    if (area.province === null || area.addresses === null) {
                        newError = 'Vui lòng nhập đủ tỉnh và quận/huyện';
                    }else{
                        areas.addresses.forEach((address) => {

                        });
                    }
                });

                setError(newError);
                return Object.keys(newError).length === 0;
            });
        }
        console.log(areas)
    }, [validate, areas]);

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
                    <div key={`area_${index}`}>
                        <AreaInput
                            area={area || {}}
                            index={index + 1}
                            removeAble={areas.length > 1}
                            onChange={(value) => handleOnChangeArea(value, index)}
                            onRemove={() => handleRemoveArea(index)}
                        />
                        {error && (
                            <Text type="danger">{error}</Text>
                        )}
                    </div>
                ))}
            </div>
            <button className="button-success" onClick={handleAddAreas}>
                Thêm khu vực mới
            </button>
        </>
    );
}

export default FormAddress;
