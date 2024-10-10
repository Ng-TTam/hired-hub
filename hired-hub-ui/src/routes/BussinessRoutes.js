import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Bussiness/Auth';


const BussinessRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
    </Routes>
  );
};

export default BussinessRoutes;
