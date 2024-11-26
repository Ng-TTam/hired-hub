import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem/MenuItem';

const cx = classNames.bind(styles);

function Menu({ items = [], onClickItem }) {
    return (
        <div className={cx('wrapper')}>
            {items.map((item) => (
                <MenuItem key={item.to} item={item} onClick={onClickItem} />
            ))}
        </div>
    );
}

export default Menu;
