import { Route, Routes } from 'react-router-dom';
import PostingReview from '../components/ManageCandidate/PostingReview/PostingReview';
import CVReview from '../components/ProfileCV/CVReview/CVReview';
import Dashboard from '../pages/Business/Dashboard';

const BussinessRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="cv-review/:applicationId" element={<CVReview />} />
            <Route path="/posting/:id" element={<PostingReview />} />
        </Routes>
    );
};

export default BussinessRoutes;
