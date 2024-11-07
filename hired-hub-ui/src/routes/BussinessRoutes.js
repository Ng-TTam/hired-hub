import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployerRegister from '../components/EmloyerRegister';
import OTP from '../components/OTP/OTP';
import CreateCompanyForm from '../components/CreateCompanyForm/CreateCompanyForm';


const BussinessRoutes = () => {
  return (
    <Routes>
      <Route path='/employer/register' element={<EmployerRegister />} />
      <Route path='/employer/otp' element={<OTP />} />
      <Route path='/company/create' element={<CreateCompanyForm />} />
    </Routes>
  );
};

export default BussinessRoutes;
