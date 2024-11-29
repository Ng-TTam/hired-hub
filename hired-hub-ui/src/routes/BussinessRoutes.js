import { Route, Routes } from 'react-router-dom';
import CVReview from '../components/ProfileCV/CVReview/CVReview';
import Dashboard from '../pages/Business/Dashboard';

const BussinessRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="cv-review/:applicationId" element={<CVReview />} />
        </Routes>
    );
};

export default BussinessRoutes;
