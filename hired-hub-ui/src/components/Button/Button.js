import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = React.forwardRef(function Button(
    {
        to,
        href,
        primary = false,
        outline = false,
        text = false,
        rounded = false,
        disabled = false,
        small = false,
        large = false,
        dropdown = false,
        children,
        className,
        leftIcon,
        rightIcon,
        onClick,
        ...passProps
    },
    ref,
) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
        dropdown,
    });

    return (
        <Comp ref={ref} className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon', 'right')}>{rightIcon}</span>}
        </Comp>
    );
});

export default Button;
