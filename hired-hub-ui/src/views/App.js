import "./App.scss";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import CMSRoutes from "../routes/CMSRoutes";
import BussinessRoutes from "../routes/BussinessRoutes";
import HomeRoutes from "../routes/HomeRoutes";

function App() {
  return (
    <BrowserRouter>
      <HomeRoutes />

      {/* Route of CMS for */}
      <CMSRoutes />

      {/* Route of  */}
      <BussinessRoutes />
    </BrowserRouter>
  );
}

export default App;
