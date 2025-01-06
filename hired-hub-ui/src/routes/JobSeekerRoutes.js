import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import ProfileCV from '../components/ProfileCV/ProfileCV';
import CV from '../components/ProfileCV/CV/CV';
import CreateCV from '../components/ProfileCV/CreateCV/CreateCV';
import EditCV from '../components/ProfileCV/EditCV/EditCV';
import GetApplication from '../components/Application/GetApplication/GetApplication';
import GetApplicationInPosting from '../components/Application/GetApplicationInPosting/GetApplicationInPosting';
import SavedPosts from '../components/SavedPosts/SavedPosts';
import PostingsApplication from '../components/PostingsApplication/PostingsApplication';
import UpdateInfor from '../components/UpdateInfor/UpdateInfor';
import PageNotFound from '../pages/404';
import ChangePassword from '../components/ChangePassword/ChangePassword';

const JobSeekerRoutes = () => {
    return (
        <Routes>
            <Route path="/cv-management" exact element={<DefaultLayout children={<ProfileCV />} />} />
            <Route path="/cv-review/:cvId" exact element={<DefaultLayout children={<CV />} />} />
            <Route path="/cv-create" exact element={<DefaultLayout children={<CreateCV />} />} />
            <Route path="/cv-edit/:cvId" exact element={<DefaultLayout children={<EditCV />} />} />
            <Route path="/saved-posts" exact element={<DefaultLayout children={<SavedPosts />} />} />
            <Route path="/postings-application" exact element={<DefaultLayout children={<PostingsApplication />} />} />
            <Route path="/update-information" exact element={<DefaultLayout children={<UpdateInfor />} />} />
            <Route path="/change-password" exact element={<DefaultLayout children={<ChangePassword />} />} />
            <Route
                path="/applications/:applicationId"
                exact
                element={<DefaultLayout children={<GetApplication />} />}
            />
            <Route
                path="/applications/posting/:postingId"
                exact
                element={<DefaultLayout children={<GetApplicationInPosting />} />}
            />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default JobSeekerRoutes;
