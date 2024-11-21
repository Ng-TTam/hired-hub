import styles from './HtmlRenderer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HtmlRenderer = ({ content, className, children }) => {
    return <div className={cx('html-renderer', className)} dangerouslySetInnerHTML={{ __html: content || children }} />;
};

export default HtmlRenderer;
