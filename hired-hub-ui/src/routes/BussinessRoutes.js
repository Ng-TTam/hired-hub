import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Business/Dashboard';

const BussinessRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<Dashboard />} />
        </Routes>
    );
};

export default BussinessRoutes;