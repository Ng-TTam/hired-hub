import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/CMS/Dashboard';
import PostingCreation from '../pages/CMS/PostCreation';
import PostingInfoBase from '../components/PostingInfoBase/PostingInfoBase';


const CMSRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/dashboard" element={<Dashboard />} />*/}
      <Route path="/postinginfo" element={<PostingInfoBase />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/posting/create" element={<PostingCreation />} />
    </Routes>
  );
};

export default CMSRoutes;
