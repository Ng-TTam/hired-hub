import { Route, Routes } from 'react-router-dom';
import CVReview from '../components/ProfileCV/CVReview/CVReview';
import Dashboard from '../pages/Business/Dashboard';
import PageNotFound from '../pages/404';

const BussinessRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="cv-review/:applicationId" element={<CVReview />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default BussinessRoutes;
