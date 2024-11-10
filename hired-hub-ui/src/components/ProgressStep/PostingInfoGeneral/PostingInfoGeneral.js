import { InfoIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import constants from '../../../config/constants';
import { setPosting } from '../../../redux/postingSlice';
import { fetchPostions } from '../../../redux/postionCategorySlice';
import { fetchProvinces } from '../../../redux/provinceSlice';
import '../PostingInfoBase/PostingInfoBase.scss';
import FormAddress from './FormAddress';
import './PostingInfoGeneral.scss';

const jobTypes = Object.values(constants.JobTypes);
const genders = [{ id: null, name: 'Không yêu cầu' }, ...Object.values(constants.GenderRequire)];
const expOptions = Object.values(constants.ExperienceRequire);

const PostingInfoGeneral = () => {
    const dispatch = useDispatch();
    const positions = useSelector((state) => state.positionCategories.list);
    const posting = useSelector((state) => state.postings.posting);

    const [numberOfPosition, setNumberOfPosition] = useState(posting?.numberOfPosition || '');
    const [jobType, setJobType] = useState(posting?.jobType || '');
    const [genderRequire, setGenderRequire] = useState(posting?.genderRequire || '');
    const [position, setPosition] = useState(posting?.position || {});
    const [experienceRequire, setExperienceRequire] = useState(posting?.experienceRequire || '');
    const [currencyUnit, setCurrencyUnit] = useState(posting?.currencyUnit || '');
    const [salaryType, setSalaryType] = useState(posting?.salaryType || '');
    const [minimumSalary, setMinimumSalary] = useState(posting?.minimumSalary || '');
    const [maximumSalary, setMaximumSalary] = useState(posting?.maximumSalary || '');

    // useEffect(() => {
    //     if (posting) {
    //         setNumberOfPosition(posting.numberOfPosition || '');
    //         setJobType(posting.jobType || '');
    //         setGenderRequire(posting.genderRequire || '');
    //         setPosition(posting.position || {});
    //         setExperienceRequire(posting.experienceRequire || '');
    //         setCurrencyUnit(posting.currencyUnit || {});
    //         setSalaryType(posting.salaryType || '');
    //         setMinimumSalary(posting.minimumSalary || '');
    //         setMaximumSalary(posting.maximumSalary || '');
    //     }
    // }, [posting]);

    useEffect(() => {
        dispatch(fetchPostions());
        dispatch(fetchProvinces());
    }, []);

    useEffect(() => {
        dispatch(
            setPosting({
                numberOfPosition,
                jobType,
                genderRequire,
                position,
                experienceRequire,
                currencyUnit,
                salaryType,
                minimumSalary: minimumSalary === '' ? null : minimumSalary,
                maximumSalary: maximumSalary === '' ? null : maximumSalary,
            }),
        );
    }, [
        numberOfPosition,
        jobType,
        genderRequire,
        position,
        experienceRequire,
        currencyUnit,
        salaryType,
        minimumSalary,
        maximumSalary,
        dispatch,
    ]);

    const handleOnChangePosition = (e) => {
        const newPosition = positions.find((item) => item.id == e.target.value);
        if (newPosition) {
            dispatch(setPosting({ position: newPosition }));
        }
    };

    const handleOnChangeSalaryType = (e) => {
        switch (e.target.value) {
            case 'from': {
                setMaximumSalary('');
                break;
            }
            case 'to': {
                setMinimumSalary('');
                break;
            }
            case 'nagotiable': {
                setMinimumSalary('');
                setMaximumSalary('');
            }
        }
        setSalaryType(e.target.value);
    };

    return (
        <div className="field-container">
            <div>
                <div className="icon">
                    <InfoIcon size={20} />
                </div>
            </div>
            <div className="content-container">
                <h3>Thông tin chung</h3>
                <div className="input-two-block-container">
                    <div className="select-container">
                        <span>Số lượng tuyển</span>
                        <div className="input-container">
                            <input
                                type="number"
                                id="number-of-position"
                                placeholder="Nhập số lượng"
                                required
                                value={numberOfPosition}
                                onChange={(e) => setNumberOfPosition(e.target.value)}
                            />
                            <div className="underline" />
                        </div>
                    </div>
                    <div className="select-container">
                        <span>Loại công việc</span>
                        <select id="select-job-type" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                            {jobTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="input-two-block-container">
                    <div className="select-container">
                        <span>Giới tính</span>
                        <select
                            id="select-gender"
                            value={genderRequire}
                            onChange={(e) => setGenderRequire(e.target.value)}
                        >
                            {genders.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="select-container">
                        <span>Cấp bậc</span>
                        <select id="select-position" value={position.id} onChange={handleOnChangePosition}>
                            {positions.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="select-container">
                        <span>Kinh nghiệm</span>
                        <select
                            id="select-exp"
                            value={experienceRequire}
                            onChange={(e) => setExperienceRequire(e.target.value)}
                        >
                            {expOptions.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h4>Mức lương</h4>
                <div className="input-two-block-container">
                    <div className="select-container">
                        <span>Loại tiền tệ</span>
                        <select
                            id="select-currency-unit"
                            value={currencyUnit}
                            onChange={(e) => setCurrencyUnit(e.target.value)}
                        >
                            <option value="VND">VND</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <div className="select-container">
                        <span>Kiểu lương</span>
                        <select id="select-salary-type" onChange={handleOnChangeSalaryType} value={salaryType}>
                            <option value="" disabled>
                                -- Chọn kiểu lương --
                            </option>
                            <option value="between">Trong khoảng</option>
                            <option value="from">Từ</option>
                            <option value="to">Đến</option>
                            <option value="negotiable">Thoả thuận</option>
                        </select>
                    </div>

                    {salaryType === 'between' || salaryType === 'from' ? (
                        <div className="select-container">
                            <span>Từ</span>
                            <div className="input-container">
                                <input
                                    type="number"
                                    id="min"
                                    placeholder="Nhập số tiền ít nhất"
                                    required
                                    value={minimumSalary}
                                    onChange={(e) => setMinimumSalary(e.target.value)}
                                />
                                <div className="underline" />
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {salaryType === 'between' || salaryType === 'to' ? (
                        <div className="select-container">
                            <span>Đến</span>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="max"
                                    placeholder="Nhập số tiền nhều nhất"
                                    required
                                    value={maximumSalary}
                                    onChange={(e) => setMaximumSalary(e.target.value)}
                                />
                                <div className="underline" />
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <h4>Khu vực làm việc</h4>
                <FormAddress />
            </div>
        </div>
    );
};

export default PostingInfoGeneral;
