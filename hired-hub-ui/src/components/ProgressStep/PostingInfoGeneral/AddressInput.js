import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Select } from 'antd';
import { useEffect, useState, useRef } from 'react';

const AddressInput = ({ address = {}, provinces = [], onChange, onRemove }) => {
    const [districts, setDistricts] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(address.location || '');
    const debounceTimeout = useRef(null);

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
        setCurrentLocation(newLocation);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            onChange({
                ...address,
                location: newLocation.trim(),
            });
        }, 2000);
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
                value={currentLocation}
                placeholder="Địa chỉ cụ thể"
                onChange={handleLocationChange}
                allowClear
            />
            <FontAwesomeIcon icon={faXmark} onClick={onRemove} style={{ cursor: 'pointer', color: 'red' }} />
        </div>
    );
};

export default AddressInput;
