import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CMSRoutes from '../routes/CMSRoutes';
import BussinessRoutes from '../routes/BussinessRoutes';
import JobSeekerRoutes from '../routes/JobSeekerRoutes';
import GuessRoutes from '../routes/GuessRoutes';

function App() {
    const role = localStorage.getItem('role');
    console.log(role);

    return (
        <Router>
            <Routes>
                {role === 'ADMIN' && <Route path="/admin/*" element={<CMSRoutes />} />}
                {role === 'EMPLOYER' && <Route path="/business/*" element={<BussinessRoutes />} />}
                {role === 'JOB_SEEKER' && <Route path="/job-seeker/*" element={<JobSeekerRoutes />} />}
                <Route path="/*" element={<GuessRoutes />} />
            </Routes>
        </Router>
    );
}

export default App;
