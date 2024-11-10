import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import PostingInfoBase from './PostingInfoBase/PostingInfoBase';
import PostingInfoDetail from './PostingInfoDetail/PostingInfoDetail';
import PostingInfoGeneral from './PostingInfoGeneral/PostingInfoGeneral';
import PostingInfoReceiveCV from './PostingInfoReceiveCV/PostingInfoReceiveCV';
import styles from './ProgressStep.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createPosting } from '../../redux/postingSlice';

const cx = classNames.bind(styles);

const ProgressSteps = () => {
    const dispatch = useDispatch();
    const posting = useSelector((state) => state.postings.posting);

    const [currentStep, setCurrentStep] = useState(1);

    const handleSubmit = () => {
        const revertWorkAddress = () => {
            const areas = posting.areas;
            const addressList = areas.flatMap((area) =>
                area.addresses.map((address) => ({
                    province: area.province,
                    district: address.district,
                    location: address.location,
                })),
            );
            return addressList;
        };
        const { areas, salaryType, ...postingRequest } = posting;
        postingRequest.jobDescription = {
            ...postingRequest.jobDescription,
            workAddress: revertWorkAddress(),
        };
        console.log(postingRequest);
        dispatch(createPosting(postingRequest));
    };

    const steps = [
        {
            title: 'Thông tin cơ bản',
            content: (
                <div className={cx('step-content')}>
                    <PostingInfoBase />
                </div>
            ),
        },
        {
            title: 'Thông tin chung',
            content: (
                <div className={cx('step-content')}>
                    <PostingInfoGeneral />
                </div>
            ),
        },
        {
            title: 'Chi tiết',
            content: (
                <div className={cx('step-content')}>
                    <PostingInfoDetail />
                </div>
            ),
        },
        {
            title: 'Thông tin nhận CV',
            content: (
                <div className={cx('step-content')}>
                    <PostingInfoReceiveCV />
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

    const handleSendPosting = () => {};

    return (
        <div className={cx('wizard-container')}>
            <div className={cx('progress-container')}>
                {steps.map((step, index) => (
                    <div key={index} className={cx('step-item')}>
                        <div className={cx('step-number', { active: index + 1 <= currentStep })}>{index + 1}</div>
                        <div className={cx('step-text', { active: index + 1 <= currentStep })}>{step.title}</div>
                        {index < steps.length - 1 && (
                            <div className={cx('step-line', { active: index + 1 < currentStep })} />
                        )}
                    </div>
                ))}
            </div>

            <div className={cx('content-container')}>
                <div className={cx('content-wrapper')}>
                    <h2>Thông tin đăng tuyển chi tiết</h2>
                    <div className={cx('content-area')}>{steps[currentStep - 1].content}</div>

                    <div className={cx('button-container')}>
                        <button
                            className={cx('nav-button', { disabled: currentStep === 1 })}
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                        >
                            Trước
                        </button>

                        {currentStep === steps.length ? (
                            <button className={cx('nav-button')} onClick={handleSubmit}>
                                Gửi
                            </button>
                        ) : (
                            <button className={cx('nav-button')} onClick={handleNext}>
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
