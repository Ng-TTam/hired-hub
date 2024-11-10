import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../PostingInfoBase/PostingInfoBase.scss';
import '../PostingInfoGeneral/PostingInfoGeneral.scss';
import styles from './AreaInput.module.scss';
import classNames from 'classnames/bind';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AddressInput({ address, onChange, removeAble = false, onRemove, districtOptions }) {
    const handleOnChangeDistrict = (e) => {
        const district = districtOptions.find((item) => item.id == e.target.value);
        if (district) {
            onChange({
                ...address,
                district,
            });
        }
    };

    const handleOnChangeLocation = (e) => {
        onChange({
            ...address,
            location: e.target.value,
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <select value={address.district?.id || ''} onChange={handleOnChangeDistrict}>
                    <option value="">Chọn quận</option>
                    {districtOptions?.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-container" style={{ width: '100%', marginLeft: '20px' }}>
                <input
                    type="text"
                    id="location"
                    placeholder="Nhập địa chỉ"
                    required
                    value={address.location || ''}
                    onChange={handleOnChangeLocation}
                />
                <div className="underline" />
            </div>
            {removeAble && <FontAwesomeIcon className={cx('icon-remove')} icon={faXmark} onClick={onRemove} />}
        </div>
    );
}

export default AddressInput;
