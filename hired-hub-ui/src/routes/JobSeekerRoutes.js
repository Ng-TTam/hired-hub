import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import ProfileCV from '../components/ProfileCV/ProfileCV';
import CV from '../components/ProfileCV/CV/CV';
import CreateCV from '../components/ProfileCV/CreateCV/CreateCV';
import EditCV from '../components/ProfileCV/EditCV/EditCV';
import GetApplication from '../components/Application/GetApplication/GetApplication';
import GetApplicationInPosting from '../components/Application/GetApplicationInPosting/GetApplicationInPosting';

const JobSeekerRoutes = () => {
    return <Routes>
            <Route path="/qly-cv" exact element={<DefaultLayout children={<ProfileCV/>}/>} />
            <Route path="/xem-cv/:cvId" exact element={<DefaultLayout children={<CV/>}/>} />
            <Route path="/tao-cv" exact element={<DefaultLayout children={<CreateCV/>}/>} />
            <Route path="/edit-cv/:cvId" exact element={<DefaultLayout children={<EditCV/>}/>} />
            <Route path="/applications/:applicationId" exact element={<DefaultLayout children={<GetApplication/>}/>} />
            <Route path="/applications/posting/:postingId" exact element={<DefaultLayout children={<GetApplicationInPosting/>}/>} />
    </Routes>;
};

export default JobSeekerRoutes;
