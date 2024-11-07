import { useState } from 'react';
import Content from "../../components/Content/Content";
import NavbarCMS from "../../components/NavbarCMS/NavbarCMS";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('dashboard');

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar  onSelectItem={handleSelectItem} selectedItem={selectedItem} />
      <div className="topNav" style={{flex:1}}>
        <NavbarCMS />
        <div className="content">
          <Content  selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
