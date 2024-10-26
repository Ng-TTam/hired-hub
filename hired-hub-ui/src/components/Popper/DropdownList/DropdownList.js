import styles from './DropdownList.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function DropdownList({ items, selectedItem, onSelect }) {
    return (
        <div className={cx('wrapper')}>
            {items?.map((item) => (
                <div
                    key={item.id}
                    className={cx('item', {
                        selected: item.id === selectedItem?.id,
                    })}
                    onClick={() => onSelect(item)}
                >
                    <span>{item.name}</span>
                    {item.id === selectedItem?.id && <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />}
                </div>
            ))}
        </div>
    );
}

export default DropdownList;
