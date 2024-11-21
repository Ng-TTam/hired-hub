import React from "react";
import { Routes, Route } from "react-router-dom";
import PostingJob from "../PostingJob/PostingJob";
import PostingStat from "../PostingStat/PostingStat";
import Notification from "../Notification/Notification";
import ManageCandidate from "../ManageCandidate/ManageCandidate";
import DashboardDefault from "../DashboardDefault/DashboardDefault";
import ProgressStep from "../ProgressStep";
import PostDetail from "../ProgressStep/PostDetail";

const Content = () => {
  return (
    <div className="content" style={{ height: "100%", width: "100%" }}>
      <Routes>
        <Route path="/dashboard" element={<DashboardDefault />} />
        <Route path="/posting-job" element={<PostingJob />} />
        <Route path="/manage-candidate" element={<ManageCandidate />} />
        <Route path="/posting-stat" element={<PostingStat />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/create-post" element={<ProgressStep />} />
        <Route path="/post-detail" element={<PostDetail />} />
        {/* Redirect to Dashboard if no route matches */}
        <Route path="*" element={<DashboardDefault />} />
      </Routes>
    </div>
  );
};

export default Content;
