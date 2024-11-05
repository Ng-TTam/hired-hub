import { useEffect, useState } from "react";
import React from "react";
import "./ProgressStep.scss";
import PostingInfoBase from "../PostingInfoBase/PostingInfoBase";
import PostingInfoGeneral from "../PostingInfoGeneral/PostingInfoGeneral";
import PostingInfoDetail from "../PostingInfoDetail/PostingInfoDetail";
import PostingInfoReceiveCV from "../PostingInfoReceiveCV/PostingInfoReceiveCV";

const ProgressSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [postingInfoBaseData, setPostingInfoBaseData] = useState({});
  const [postingInfoDetailData, setPostingInfoDetailData] = useState({});
  const [postingInfoGeneralData, setPostingInfoGeneralData] = useState({});
  const [postingInfoReciveCVData, setPostingInfoReceiveCVData] = useState({});

  const handleSubmit = () => {
    const posting = {
      title: postingInfoBaseData.title,
      experienceRequire: postingInfoGeneralData.experienceRequire,
      genderRequire: postingInfoGeneralData.genderRequire,
      numberOfPosition: postingInfoGeneralData.numberOfPosition,
      jobType: postingInfoGeneralData.jobType,
      applications: [],
      jobDescription: {
        description: postingInfoDetailData.description,
        requirement: postingInfoDetailData.requirement,
        benefit: postingInfoDetailData.benefit,
        workAddress: postingInfoGeneralData.workAddress || [],
      },
      mainJob: {
        id: postingInfoBaseData.mainJobId,
        name: postingInfoBaseData.mainJobName,
        description: postingInfoBaseData.mainJobDescription,
      },
      subJobs: postingInfoGeneralData.subJobs || [],
      position: {
        id: postingInfoGeneralData.positionId,
        name: postingInfoGeneralData.positionName,
        description: postingInfoGeneralData.positionDescription,
      },
      currencyUnit: postingInfoGeneralData.currencyUnit,
      minimumSalary: postingInfoGeneralData.minimumSalary,
      maximumSalary: postingInfoGeneralData.maximumSalary,
      expiredAt: postingInfoReciveCVData.expiredAt,
    };

    console.log("Dữ liệu gửi đi:", JSON.stringify(posting, null, 2));
  };

  const steps = [
    {
      title: "Thông tin cơ bản",
      content: (
        <div className="step-content">
          <PostingInfoBase setPostingInfoBase={setPostingInfoBaseData}/>
        </div>
      ),
    },
    {
      title: "Thông tin chung",
      content: (
        <div className="step-content">
          <PostingInfoGeneral setPostingInfoGeneralData={setPostingInfoGeneralData}/>
        </div>
      ),
    },
    {
      title: "Chi tiết",
      content: (
        <div className="step-content">
          <PostingInfoDetail setPostingInfoDetailData={setPostingInfoDetailData}/>
        </div>
      ),
    },
    {
      title: "Thông tin nhận CV",
      content: (
        <div className="step-content">
          <PostingInfoReceiveCV setPostingInfoReceiveCVData={setPostingInfoReceiveCVData}/>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSendPosting = () => {

  }

  return (
    <div className="wizard-container">
      {/* Progress Steps */}
      <div className="progress-container">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            <div
              className={`step-number ${
                index + 1 <= currentStep ? "active" : ""
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`step-text ${
                index + 1 <= currentStep ? "active" : ""
              }`}
            >
              {step.title}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-line ${
                  index + 1 < currentStep ? "active" : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="content-container">
        <div className="content-wrapper">
          <h2>Thông tin đăng tuyển chi tiết</h2>
          {/* Content Area */}
          <div className="content-area">{steps[currentStep - 1].content}</div>

          {/* Navigation Buttons */}
          <div className="button-container">
            <button
              className={`nav-button ${currentStep === 1 ? "disabled" : ""}`}
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Trước
            </button>

            {currentStep === steps.length ? (
              <button
                className="nav-button"
                onClick={handleSubmit}
              >
                Gửi
              </button>
            ) : (
              <button
                className={`nav-button ${
                  currentStep === steps.length ? "disabled" : ""
                }`}
                onClick={handleNext}
              >
                Tiếp theo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
