import classNames from 'classnames/bind';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../PostingInfoBase/PostingInfoBase.scss';
import '../PostingInfoGeneral/PostingInfoGeneral.scss';
import AddressInput from './AddressInput';
import styles from './AreaInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AreaInput({ area, onChange, removeAble = false, onRemove, index = 1 }) {
    const provinces = useSelector((state) => state.provinces.list);

    const [districts, setDistricts] = useState(area?.province?.districts || []);
    const [addresses, setAddresses] = useState(area?.addresses || [{}]);

    useEffect(() => {
        if (area.province) {
            setDistricts(area.province.districts);
        }
    }, [area.province]);

    useEffect(() => {
        const newValue = {
            ...area,
            addresses,
        };
        onChange(newValue);
    }, [addresses]);

    const handleOnChangeProvince = (e) => {
        const province = provinces.find((item) => item.id == e.target.value);
        if (province) {
            setDistricts(province.districts);
            setAddresses([{ district: null, location: '' }]);
            onChange({
                ...area,
                province,
                addresses: [{ district: null, location: '' }],
            });
        }
    };

    const handleOnChangeAddress = (value, index) => {
        setAddresses((prevAddresses) =>
            prevAddresses.map((address, _index) => (_index === index ? { ...value } : address)),
        );
    };

    const handleAddAddress = () => {
        setAddresses((prevAddresses) => [...prevAddresses, { district: null, location: '' }]);
    };

    const handleRemoveAddress = (index) => {
        const updatedAddresses = [...addresses];
        updatedAddresses.splice(index, 1);
        setAddresses(updatedAddresses);
    };

    return (
        <div className="work-address">
            <div className={cx('area')}>
                <MapPin size={20} />
                <span>Khu vực {index}:</span>
                <select
                    className={cx('unset-margin')}
                    value={area?.province?.id || ''}
                    onChange={handleOnChangeProvince}
                >
                    <option value="">Chọn khu vực</option>
                    {provinces.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                {removeAble && <FontAwesomeIcon className={cx('icon-remove')} icon={faXmark} onClick={onRemove} />}
            </div>
            {addresses.map((address, _index) => (
                <AddressInput
                    key={`address_${_index}`}
                    address={address}
                    districtOptions={districts}
                    onChange={(value) => handleOnChangeAddress(value, _index)}
                    removeAble={addresses.length > 1}
                    onRemove={() => handleRemoveAddress(_index)}
                />
            ))}
            <h4 className={cx('label-add-address')} onClick={handleAddAddress}>
                + Thêm địa chỉ
            </h4>
        </div>
    );
}

export default AreaInput;
