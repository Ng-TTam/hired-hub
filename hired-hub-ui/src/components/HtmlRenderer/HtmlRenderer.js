import styles from './HtmlRenderer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HtmlRenderer = ({ content, className }) => {
    return <div className={cx('html-renderer', className)} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HtmlRenderer;
