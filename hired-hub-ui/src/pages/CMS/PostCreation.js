import React from "react";
import ProgressSteps from "../../components/ProgressStep/ProgressStep";
import './PostingCreation.scss';

const PostingCreation = () => {

  return (
    <div className="create-posting">
      <h3 className="title-posting-creation">Đăng tin tuyển dụng</h3>
      <ProgressSteps />
    </div>
  );
};

export default PostingCreation;
