import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import ProfileCV from '../components/ProfileCV/ProfileCV';
import CV from '../components/ProfileCV/CV/CV';
import CreateCV from '../components/ProfileCV/CreateCV/CreateCV';
import EditCV from '../components/ProfileCV/EditCV/EditCV';

const JobSeekerRoutes = () => {
    return <Routes>
            <Route path="/qly-cv" exact element={<DefaultLayout children={<ProfileCV/>}/>} />
            <Route path="/xem-cv/:cvId" exact element={<DefaultLayout children={<CV/>}/>} />
            <Route path="/tao-cv" exact element={<DefaultLayout children={<CreateCV/>}/>} />
            <Route path="/edit-cv/:cvId" exact element={<DefaultLayout children={<EditCV/>}/>} />
    </Routes>;
};

export default JobSeekerRoutes;
