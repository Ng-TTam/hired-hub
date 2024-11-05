import React from 'react';
import PostingJob from '../PostingJob/PostingJob';
import PostingStat from '../PostingStat/PostingStat';
import Notification from '../Notification/Notification';
import ManageCandidate from '../ManageCandidate/ManageCandidate';

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
                return <div>Chọn một mục từ sidebar để xem nội dung.</div>;
        }
    };

    return (
        <div className="content">
            {renderContent()}
        </div>
    );
};

export default Content;
