import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/CMS/Dashboard';


const CMSRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="/dashboard/profile" element={<Profile />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default CMSRoutes;
