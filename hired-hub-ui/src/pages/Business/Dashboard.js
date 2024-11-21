import NavbarCMS from '../../components/NavbarCMS/NavbarCMS';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import PostingJob from '../../components/PostingJob/PostingJob';
import ManageCandidate from '../../components/ManageCandidate/ManageCandidate';
import DashboardDefault from '../../components/DashboardDefault/DashboardDefault';
import PostingStat from '../../components/PostingStat/PostingStat';
import ProgressSteps from '../../components/ProgressStep';

const Dashboard = () => {
  return (
      <div style={{ display: 'flex' }}>
          <Sidebar />
          <div className="topNav" style={{ flex: 1 }}>
              <NavbarCMS />
              <div className="content">
                  <Routes>
                      <Route path="/dashboard" element={<DashboardDefault />} />
                      <Route path="/posting-job" element={<PostingJob />} />
                      <Route path="/manage-candidate" element={<ManageCandidate />} />
                      <Route path="/posting-stat" element={<PostingStat />} />
                      <Route path="/create-post" element={<ProgressSteps />} />
                      
                  </Routes>
              </div>
          </div>
      </div>
  );
};

export default Dashboard;
