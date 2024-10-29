import NavbarCMS from "../../components/NavbarCMS/NavbarCMS";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div style={{ display: "flex"}}>
      <Sidebar />
      <div className="topNav" style={{ flex: 1 }}>
        <NavbarCMS />
      </div>
    </div>
  );
};

export default Dashboard;
