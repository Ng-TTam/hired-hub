import { Input, Select } from "antd";
import { useEffect, useState } from "react";

const AddressInput = ({ address, provinces, onChange }) => {
    const [districts, setDistricts] = useState([]);
    console.log('province', provinces)

    useEffect(() => {
        const province = provinces.find(item => item.id == address.province.value);
        if(province){
            setDistricts(province.districts);
        }
    },[address]);

    const onSelectedStatusChange = (e) => {
        const province = provinces.find(item => item.id == e);
        if(province){
            setDistricts(province.districts);
        }
    };

    return (
        <div className="area-container">
            <Select
                placeholder="Trạng thái..."
                value={selectDistrict}
                options={provinces}
                onChange={onSelectedStatusChange}
                allowClear
            />
            <Select
                placeholder="Trạng thái..."
                value={selectProvince}
                options={districts}
                onChange={onSelectedStatusChange}
                allowClear
            />
            <Input value={address.location} />
            <button className="button-success">Thêm khu vực mới</button>
        </div>
    );
};

export default AddressInput;
