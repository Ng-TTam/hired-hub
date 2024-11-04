import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import CMSRoutes from '../routes/CMSRoutes';
import BussinessRoutes from '../routes/BussinessRoutes';
import JobSeekerRoutes from '../routes/JobSeekerRoutes';
import GuessRoutes from '../routes/GuessRoutes';

function App() {
    return (
        <Router>
            {/* Route of CMS for */}
            <CMSRoutes />

            {/* Route of  */}
            <BussinessRoutes />

            <JobSeekerRoutes />

            <GuessRoutes />
        </Router>
    );
}

export default App;
