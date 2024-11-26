import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ item, onClick }) {
    return (
        <NavLink to={item.to} className={cx('wrapper')} onClick={onClick}>
            {item.icon}
            <span>{item.title}</span>
        </NavLink>
    );
}

export default MenuItem;
