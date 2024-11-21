import { Route, Routes } from 'react-router-dom';
import PostingReview from '../components/ManageCandidate/PostingReview/PostingReview';
import CVReview from '../components/ProfileCV/CVReview/CVReview';
import UpdateEmployerCompany from '../components/UpdateEmployerCompany';
import Dashboard from '../pages/Business/Dashboard';

const BussinessRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="cv-review/:applicationId" element={<CVReview />} />
            <Route path="/posting/:id" element={<PostingReview />} />
            <Route path="/update-company" element={<UpdateEmployerCompany />} />
        </Routes>
    );
};

export default BussinessRoutes;
