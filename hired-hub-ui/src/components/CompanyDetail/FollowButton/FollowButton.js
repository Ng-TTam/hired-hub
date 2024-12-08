import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSubscription, deleteSubscription, fetchSubscipptionStatus } from '../../../redux/subscriptionSlice';
import Button from '../../Button';
import styles from './FollowButton.module.scss';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function FollowButton({ className }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { subscribed } = useSelector((state) => state.subscriptions);
    const isLogin = !!localStorage.getItem('token');

    useEffect(() => {
        if (isLogin) dispatch(fetchSubscipptionStatus(id));
    }, [dispatch, id, isLogin]);

    const handleOnClick = () => {
        if (subscribed) {
            dispatch(deleteSubscription(id));
        } else {
            dispatch(createSubscription(id));
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
