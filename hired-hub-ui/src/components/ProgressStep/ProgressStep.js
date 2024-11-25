import classNames from 'classnames/bind';
import { LoaderCircleIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createPosting, fetchPosting, reset, updatePosting } from '../../redux/postingSlice';
import PostingInfoBase from './PostingInfoBase/PostingInfoBase';
import PostingInfoDetail from './PostingInfoDetail/PostingInfoDetail';
import PostingInfoGeneral from './PostingInfoGeneral/PostingInfoGeneral';
import PostingInfoReceiveCV from './PostingInfoReceiveCV/PostingInfoReceiveCV';
import styles from './ProgressStep.module.scss';

const cx = classNames.bind(styles);

const ProgressSteps = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posting, success, loading } = useSelector((state) => state.postings);
    const { id } = useParams();

    const [currentStep, setCurrentStep] = useState(1);
    const validateFunctions = useRef([]);

    useEffect(() => {
        if (id) dispatch(fetchPosting(id));
        return () => {
            dispatch(reset());
        };
    }, [dispatch, id]);

    const handleSubmit = () => {
        const isValid = validateFunctions.current[currentStep]?.();
        if (isValid) {
            const { areas, salaryType, ...postingRequest } = posting;
            if (id) dispatch(updatePosting(postingRequest));
            else dispatch(createPosting(postingRequest));
        }
    };

    useEffect(() => {
        if (success) {
            navigate('/business/posting-job');
        }
    }, [success, navigate]);

    const steps = [
        {
            title: 'Thông tin cơ bản',
            content: (
                <div className={cx('step-content')}>
                    <PostingInfoBase validate={(validateFn) => (validateFunctions.current[1] = validateFn)} />
                </div>
            ),
        },
        {
            title: 'Thông tin chung',
            content: (
                <div className={cx('step-content')}>
                    <PostingInfoGeneral validate={(validateFn) => (validateFunctions.current[2] = validateFn)} />
                </div>
            ),
        },
        {
            title: 'Chi tiết',
            content: (
                <div className={cx('step-content')}>
                    <PostingInfoDetail validate={(validateFn) => (validateFunctions.current[3] = validateFn)} />
                </div>
            ),
        },
        {
            title: 'Thông tin nhận CV',
            content: (
                <div className={cx('step-content')}>
                    <PostingInfoReceiveCV validate={(validateFn) => (validateFunctions.current[4] = validateFn)} />
                </div>
            ),
        },
    ];

    const handleNext = () => {
        const isValid = validateFunctions.current[currentStep]?.();
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length));
        }
    };

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

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
                        {currentStep === 1 ? (
                            <button className={cx('nav-button')} onClick={() => navigate('/business/posting-job')}>
                                Trở lại
                            </button>
                        ) : (
                            <button className={cx('nav-button')} onClick={handlePrev}>
                                Trước
                            </button>
                        )}

                        {currentStep === steps.length ? (
                            <button className={cx('nav-button')} onClick={handleSubmit}>
                                {loading ? <LoaderCircleIcon /> : 'Gửi'}
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
