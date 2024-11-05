import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CMSRoutes from '../routes/CMSRoutes';
import BussinessRoutes from '../routes/BussinessRoutes';
import JobSeekerRoutes from '../routes/JobSeekerRoutes';
import GuessRoutes from '../routes/GuessRoutes';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="cms/*" element={<CMSRoutes />} />
                <Route path="bussiness/*" element={<BussinessRoutes />} />
                <Route path="job-seeker/*" element={<JobSeekerRoutes />} />
                <Route path="/*" element={<GuessRoutes />} />
            </Routes>
        </Router>
    );
}

export default App;
