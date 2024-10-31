import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import CMSRoutes from '../routes/CMSRoutes';
import BussinessRoutes from '../routes/BussinessRoutes';
import HomeRoutes from '../routes/HomeRoutes';

function App() {
  return (
    <Router>

      {/* Route of CMS for */}
      <CMSRoutes />

      {/* Route of  */}
      <BussinessRoutes />

      <HomeRoutes />
    </Router>
  );
}

export default App;
