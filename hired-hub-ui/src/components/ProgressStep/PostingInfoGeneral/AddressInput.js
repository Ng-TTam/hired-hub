import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Select } from 'antd';
import { useEffect, useState } from 'react';

const AddressInput = ({ address = {}, provinces = [], onChange, onRemove }) => {
    const [districts, setDistricts] = useState([]);
    
    useEffect(() => {
        const province = provinces.find((item) => item.id === address.province?.id);
        if (province) {
            setDistricts(province.districts || []);
        } else {
            setDistricts([]);
        }
    }, [address.province?.id, provinces]);

    const handleProvinceChange = (value) => {
        const selectedProvince = provinces.find((item) => item.id === value);
        if (selectedProvince) {
            onChange({
                ...address,
                province: selectedProvince,
                district: selectedProvince.districts?.[0] || null,
            });
        }
    };

    const handleDistrictChange = (value) => {
        const selectedDistrict = districts.find((item) => item.id === value);
        if (selectedDistrict) {
            onChange({
                ...address,
                district: selectedDistrict,
            });
        }
    };

    const handleLocationChange = (e) => {
        const newLocation = e.target.value;
        onChange({
            ...address,
            location: newLocation || '',
        });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 5fr 1fr', alignItems: 'center', gap: '10px' }}>
            <Select
                placeholder="Tỉnh/Thành..."
                value={address.province?.id || null}
                options={provinces.map((province) => ({
                    label: province.name,
                    value: province.id,
                }))}
                onChange={handleProvinceChange}
                allowClear
            />
            <Select
                placeholder="Quận/Huyện..."
                value={address.district?.id || null}
                options={districts.map((district) => ({
                    label: district.name,
                    value: district.id,
                }))}
                onChange={handleDistrictChange}
                allowClear
            />
            <Input
                value={address.location || ''}
                placeholder="Địa chỉ cụ thể"
                onChange={handleLocationChange}
                allowClear
            />
            <FontAwesomeIcon icon={faXmark} onClick={onRemove} style={{ cursor: 'pointer', color: 'red' }} />
        </div>
    );
};

export default AddressInput;
