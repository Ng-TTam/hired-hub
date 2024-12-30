import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PageNotFound from '../pages/404';
import BussinessRoutes from '../routes/BussinessRoutes';
import CMSRoutes from '../routes/CMSRoutes';
import GuessRoutes from '../routes/GuessRoutes';
import JobSeekerRoutes from '../routes/JobSeekerRoutes';
import './App.scss';

function App() {
    const role = localStorage.getItem('role');

    return (
        <Router>
            <Routes>
                {role === 'ADMIN' && <Route path="/admin/*" element={<CMSRoutes />} />}
                {role === 'EMPLOYER' && <Route path="/business/*" element={<BussinessRoutes />} />}
                {role === 'JOB_SEEKER' && <Route path="/job-seeker/*" element={<JobSeekerRoutes />} />}
                <Route path="/*" element={<GuessRoutes />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
