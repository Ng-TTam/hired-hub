import styles from './ContentIcon.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ContentIcon({ icon, title, content, className, style }) {
    return (
        <div className={cx('wrapper', className)} style={style}>
            {icon && <div className={cx('icon')}>{icon}</div>}
            <div className={cx('info')}>
                {title && <div className={cx('title')}>{title}</div>}
                {content && <div className={cx('content')}>{content}</div>}
            </div>
        </div>
    );
}

export default ContentIcon;
