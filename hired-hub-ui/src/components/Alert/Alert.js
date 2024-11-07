import React, { useState, useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, type }) => {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (message) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        showAlert && (
            <div className={`alert ${type}`}>
                {message}
            </div>
        )
    );
};

export default Alert;
