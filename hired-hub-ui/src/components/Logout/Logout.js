import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authenticationSlice';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = useSelector((state) => state.authentication);

    useEffect(() => {
        dispatch(logout());
    }, [dispatch, navigate]);

    useEffect(() => {
        if (!isLogin) {
            setTimeout(() => {
                navigate('/');
            }, 300);
        }
    }, [isLogin]);

    return null;
}

export default Logout;
