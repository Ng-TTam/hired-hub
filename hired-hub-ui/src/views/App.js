import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import CMSRoutes from '../routes/CMSRoutes';
import BussinessRoutes from '../routes/BussinessRoutes';

function App() {
  return (
    <Router>

      {/* Route of CMS for */}
      <CMSRoutes />

      {/* Route of  */}
      <BussinessRoutes />
    </Router>
  );
}

export default App;
