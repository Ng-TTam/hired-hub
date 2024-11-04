import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authenticationSlice';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        setTimeout(() => {
            navigate('/');
        }, 300);
    }, [dispatch, navigate]);

    return null;
}

export default Logout;
