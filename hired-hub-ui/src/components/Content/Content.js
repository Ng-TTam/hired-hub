import React from 'react';
import PostingJob from '../PostingJob/PostingJob';
import PostingStat from '../PostingStat/PostingStat';
import Notification from '../Notification/Notification';
import ManageCandidate from '../ManageCandidate/ManageCandidate';
import DashboardDefault from '../DashboardDefault/DashboardDefault';

const Content = ({ selectedItem }) => {
    const renderContent = () => {
        switch (selectedItem) {
            case 'PostingJob':
                return <PostingJob />;
            case 'PostingStat':
                return <PostingStat />;
            case 'ManageCandidate':
                return <ManageCandidate />;  
            case 'Notification':
                return <Notification />;
            default:
                return <DashboardDefault/>;
        }
    };

    return (
        <div className="content"
        style={{height:'100%', width:'100%'}}>
            {renderContent()}
        </div>
    );
};

export default Content;
