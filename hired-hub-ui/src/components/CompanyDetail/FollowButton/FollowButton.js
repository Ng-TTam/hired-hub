import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSubscription, deleteSubscription, fetchSubscipptionStatus } from '../../../redux/subscriptionSlice';
import Button from '../../Button';
import styles from './FollowButton.module.scss';

const cx = classNames.bind(styles);

function FollowButton({ companyId, className }) {
    const dispatch = useDispatch();
    const { subscribed } = useSelector((state) => state.subscriptions);
    const isLogin = !!localStorage.getItem('token');

    useEffect(() => {
        if (isLogin) dispatch(fetchSubscipptionStatus(companyId));
    }, [dispatch, companyId, isLogin]);

    const handleOnClick = () => {
        if (subscribed) {
            dispatch(deleteSubscription(companyId));
        } else {
            dispatch(createSubscription(companyId));
        }
    };

    if (!isLogin) {
        return <></>;
    }

    return (
        <Button
            className={cx('wrapper', className)}
            leftIcon={!subscribed && <FontAwesomeIcon icon={faPlus} />}
            onClick={handleOnClick}
        >
            {subscribed ? 'Đang theo dõi' : 'Theo dõi công ty'}
        </Button>
    );
}

export default FollowButton;
