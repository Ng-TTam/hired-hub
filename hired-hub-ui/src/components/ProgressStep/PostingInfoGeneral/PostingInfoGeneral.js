import { InfoIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import constants from '../../../config/constants';
import { setPosting, setPostingJobDescription } from '../../../redux/postingSlice';
import { fetchPostions } from '../../../redux/postionCategorySlice';
import { fetchProvinces } from '../../../redux/provinceSlice';
import '../PostingInfoBase/PostingInfoBase.scss';
import './PostingInfoGeneral.scss';
import { Typography } from 'antd';
import AddressInput from './AddressInput';

const jobTypes = Object.values(constants.JobTypes);
const genders = [...Object.values(constants.GenderRequire)];
const expOptions = Object.values(constants.ExperienceRequire);

const PostingInfoGeneral = ({ validate }) => {
    const dispatch = useDispatch();
    const positions = useSelector((state) => state.positionCategories.list);
    const posting = useSelector((state) => state.postings.posting);
    const provinces = useSelector((state) => state.provinces.list);

    const [numberOfPosition, setNumberOfPosition] = useState(posting?.numberOfPosition || '');
    const [jobType, setJobType] = useState(posting?.jobType || '');
    const [genderRequire, setGenderRequire] = useState(posting?.genderRequire || '');
    const [position, setPosition] = useState(posting?.position || {});
    const [experienceRequire, setExperienceRequire] = useState(posting?.experienceRequire || '');
    const [currencyUnit, setCurrencyUnit] = useState(posting?.currencyUnit || '');
    const [salaryType, setSalaryType] = useState(posting?.salaryType || '');
    const [minimumSalary, setMinimumSalary] = useState(posting?.minimumSalary || '');
    const [maximumSalary, setMaximumSalary] = useState(posting?.maximumSalary || '');
    const [workAddress, setWorkAddress] = useState(posting?.jobDescription?.workAddress || []);
    const [provinceList, setProvinceList] = useState([]);
    const [errors, setErrors] = useState('');
    const { Text } = Typography;

    useEffect(() => {
        dispatch(fetchPostions());
        dispatch(fetchProvinces());
    }, []);

    useEffect(() => {
        const updatedProvinces = provinces.map((province) => ({
            ...province,
            value: province.id,
            label: province.name,
            districts: province.districts.map((district) => ({
                ...district,
                value: district.id,
                label: district.name,
            })),
        }));
        setProvinceList(updatedProvinces);
    }, [provinces]);

    useEffect(() => {
        dispatch(
            setPosting({
                numberOfPosition,
                jobType,
                genderRequire: genderRequire === 'none'? null : genderRequire,
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

    useEffect(() => {
        dispatch(
            setPostingJobDescription({
                workAddress,
            }),
        );
    }, [workAddress]);

    useEffect(() => {
        console.log('posting', posting)
        setNumberOfPosition(posting.numberOfPosition || '');
        setJobType(posting.jobType || '');
        setGenderRequire(posting.genderRequire || null);
        setPosition(posting.position || {});
        setExperienceRequire(posting.experienceRequire || '');
        setCurrencyUnit(posting.currencyUnit || '');
        setSalaryType(posting.salaryType || '');
        setMinimumSalary(posting.minimumSalary || '');
        setMaximumSalary(posting.maximumSalary || '');
        setWorkAddress(posting?.jobDescription?.workAddress || []);
        if (!posting.salaryType)
            if (posting.minimumSalary && posting.maximumSalary) setSalaryType('between');
            else if (posting.minimumSalary && !posting.maximumSalary) setSalaryType('from');
            else if (!posting.minimumSalary && posting.maximumSalary) setSalaryType('to');
            else setSalaryType('negotiable');
    }, [posting]);

    useEffect(() => {
        if (validate) {
            validate(() => {
                const newErrors = {};
                if (!posting.numberOfPosition) newErrors.numberOfPosition = 'Vui lòng nhập số lượng tuyển!';
                if (posting.numberOfPosition < 1) newErrors.numberOfPosition = 'Vui lòng nhập số lớn hơn 0!';
                if (!posting.jobType) newErrors.jobType = 'Vui lòng chọn loại công việc!';
                if (Object.keys(posting.position).length === 0) newErrors.position = 'Vui lòng nhập vị trí tuyển dụng!';
                if (!posting.experienceRequire) newErrors.experienceRequire = 'Vui lòng chọn kinh nghiệm yêu cầu!';
                if (!posting.currencyUnit) newErrors.currencyUnit = 'Vui lòng chọn đơn vị tiền tệ!';

                if (posting.salaryType === 'from' || posting.salaryType === 'between') {
                    if (!posting.minimumSalary) newErrors.minimumSalary = 'Vui lòng nhập lương tối thiểu!';
                }

                if (posting.salaryType === 'to' || posting.salaryType === 'between') {
                    if (!posting.maximumSalary) newErrors.maximumSalary = 'Vui lòng nhập lương tối đa!';
                }

                if (!posting.jobDescription?.workAddress?.length) {
                    newErrors.workAddress = 'Vui lòng nhập đầy đủ tỉnh/huyện!';
                } else {
                    posting.jobDescription.workAddress.forEach((address) => {
                        if (!address.province || !address.district) {
                            newErrors.workAddress = 'Vui lòng nhập đầy đủ tỉnh/huyện!';
                        }
                    });
                }
                setErrors(newErrors);
                return Object.keys(newErrors).length === 0;
            });
        }
    }, [
        validate,
        numberOfPosition,
        jobType,
        position,
        experienceRequire,
        currencyUnit,
        salaryType,
        minimumSalary,
        maximumSalary,
    ]);

    const handleOnChangePosition = (e) => {
        const selectedId = e.target.value;
        if (selectedId) {
            const newPosition = positions.find((item) => item.id == e.target.value);
            if (newPosition) {
                dispatch(setPosting({ position: newPosition }));
                setPosition(newPosition);
            }
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

    const handleOnWorkAddressChange = ({ province, district, location }, index) => {
        setWorkAddress((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                ...(province && { province }),
                ...(district && { district }),
                ...(location !== undefined && { location }),
            };
            return updated;
        });
    };

    const handleRemoveWorkAddress = (index) => {
        setWorkAddress((prev) => prev.filter((_, idx) => idx !== index));
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
                        {errors.numberOfPosition && <Text type="danger">{errors.numberOfPosition}</Text>}
                    </div>
                    <div className="select-container">
                        <span>Loại công việc</span>
                        <select id="select-job-type" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                            <option value="" disabled>
                                -- Chọn loại công việc --
                            </option>
                            {jobTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.jobType && <Text type="danger">{errors.jobType}</Text>}
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
                            <option value='none'>Không yêu cầu</option>
                            {genders.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="select-container">
                        <span>Cấp bậc</span>
                        <select id="select-position" value={position?.id || ''} onChange={handleOnChangePosition}>
                            <option value="" disabled>
                                -- Chọn cấp bậc --
                            </option>
                            {positions.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.position && <Text type="danger">{errors.position}</Text>}
                    </div>
                    <div className="select-container">
                        <span>Kinh nghiệm</span>
                        <select
                            id="select-exp"
                            value={experienceRequire}
                            onChange={(e) => setExperienceRequire(e.target.value)}
                        >
                            <option value="" disabled>
                                -- Chọn kinh nghiệm --
                            </option>
                            {expOptions.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.experienceRequire && <Text type="danger">{errors.experienceRequire}</Text>}
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
                            <option value="" disabled>
                                -- Chọn loại tiền tệ --
                            </option>
                            <option value="VND">VND</option>
                            <option value="USD">USD</option>
                        </select>
                        {errors.currencyUnit && <Text type="danger">{errors.currencyUnit}</Text>}
                    </div>
                    <div className="select-container">
                        <span>Kiểu lương</span>
                        <select id="select-salary-type" onChange={handleOnChangeSalaryType} value={salaryType}>
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
                            {errors.minimumSalary && <Text type="danger">{errors.minimumSalary}</Text>}
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
                            {errors.maximumSalary && <Text type="danger">{errors.maximumSalary}</Text>}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <h4>Địa chỉ làm việc</h4>
                <div className="area-container">
                    {workAddress.map((wa, index) => (
                        <AddressInput
                            key={`address_input_${index}`}
                            address={wa}
                            provinces={provinceList}
                            onChange={({ province, district, location }) =>
                                handleOnWorkAddressChange({ province, district, location }, index)
                            }
                            onRemove={() => handleRemoveWorkAddress(index)}
                        />
                    ))}
                    {errors.workAddress && <Text type="danger">{errors.workAddress}</Text>}
                    <button
                        className="button-success"
                        onClick={() => {
                            setWorkAddress((prev) => [...prev, {}]);
                        }}
                    >
                        Thêm khu vực mới
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostingInfoGeneral;
