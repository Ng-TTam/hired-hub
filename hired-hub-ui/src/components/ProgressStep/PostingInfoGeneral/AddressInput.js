import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Select } from 'antd';
import { useEffect, useState } from 'react';

const AddressInput = ({ address, provinces, onChange }) => {
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const province = provinces.find((item) => item.id == address.province?.id);
        if (province) {
            setDistricts(province.districts);
        }
    }, [address, provinces]);

    const onSelectedProvinceChange = (e) => {
        const province = provinces.find((item) => item.id == e);
        if (province) {
            onChange({ province, district: province.districts[0] });
            setDistricts(province.districts);
        }
    };

    const onSelectedDistrictChange = (e) => {
        const district = districts.find((item) => item.id == e);
        if (district) {
            onChange({ district });
        }
    };

    const onLocationChange = (e) => {
        onChange({ location: e.target.value });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 5fr 1fr', alignItems: 'center', gap: '10px' }}>
            <Select
                placeholder="Tỉnh/Thành..."
                value={address.province?.id}
                options={provinces}
                onChange={onSelectedProvinceChange}
            />
            <Select
                placeholder="Quận/Huyện..."
                value={address.district?.id}
                options={districts}
                onChange={onSelectedDistrictChange}
            />
            <Input value={address.location} placeholder="Địa chỉ" onChange={onLocationChange} allowClear />
            <FontAwesomeIcon icon={faXmark} />
        </div>
    );
};

export default AddressInput;
