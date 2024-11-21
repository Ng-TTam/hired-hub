import { useState, forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import images from '../../assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [fallback, setFallback] = useState('');

    useEffect(() => {
        if (!src) {
            setCurrentSrc(customFallback);
        } else {
            setCurrentSrc(src);
        }
    }, [src, customFallback]);

    const handleError = () => {
        setCurrentSrc(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={currentSrc}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
