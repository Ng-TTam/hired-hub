import {
    faBriefcase,
    faBusinessTime,
    faCircleDollarToSlot,
    faLocationDot,
    faMagnifyingGlass,
    faStar,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from '../../../config';
import { fetchProvinces } from '../../../redux/provinceSlice';
import Button, { DropdownButton } from '../../Button';
import styles from './Filter.module.scss';
import { fetchPostions } from '../../../redux/postionCategorySlice';
import { fetchJobCategories } from '../../../redux/jobCategorySlice';
import { fetchPostings } from '../../../redux/postingSlice';

const cx = classNames.bind(styles);

const SalaryRanges = [
    { id: 'DEFAULT', name: 'Mức lương' },
    { id: 'BELOW_10_MILLION', name: 'Dưới 10 triệu', minSalary: 0, maxSalary: 10_000_000 },
    { id: 'FROM_15_TO_20_MILLION', name: '15 - 20 triệu', minSalary: 15_000_000, maxSalary: 20_000_000 },
    { id: 'FROM_10_TO_15_MILLION', name: '10 - 15 triệu', minSalary: 10_000_000, maxSalary: 15_000_000 },
    { id: 'FROM_20_TO_25_MILLION', name: '20 - 25 triệu', minSalary: 20_000_000, maxSalary: 25_000_000 },
    { id: 'FROM_25_TO_30_MILLION', name: '25 - 30 triệu', minSalary: 25_000_000, maxSalary: 30_000_000 },
    { id: 'FROM_30_TO_50_MILLION', name: '30 - 50 triệu', minSalary: 30_000_000, maxSalary: 50_000_000 },
    { id: 'ABOVE_50_MILLION', name: 'Trên 50 triệu', minSalary: 50_000_000, maxSalary: null },
    { id: 'NEGOTIABLE', name: 'Thỏa thuận', minSalary: null, maxSalary: null },
];

const jobTypes = [{ id: 'DEFAULT', name: 'Hình thức' }, ...Object.values(config.constants.JobTypes)];
const expOptions = [{ id: 'DEFAULT', name: 'Kinh nghiệm' }, ...Object.values(config.constants.ExperienceRequire)];

function Filter() {
    const provinceList = useSelector((state) => state.provinces.list);
    const postionList = useSelector((state) => state.positionCategories.list);
    const jobCategoryList = useSelector((state) => state.jobCategories.list);

    const dispatch = useDispatch();

    const [provinces, setProvinces] = useState([{ id: -1, name: 'Địa điểm' }]);
    const [districts, setDistricts] = useState([]);
    const [jobCateogies, setJobCategoires] = useState([{ id: -1, name: 'Ngành nghề' }]);
    const [positions, setPositions] = useState([{ id: -1, name: 'Cấp bậc' }]);

    const [searchText, setSearchText] = useState('');
    const [selectedProvince, setSelectedProvince] = useState(provinces[0]);
    const [selectedDistrict, setSeletedDistrict] = useState();
    const [selectedSalary, setSelectedSalary] = useState(SalaryRanges[0]);
    const [selectedJobCategory, setSeletedJobCategory] = useState(jobCateogies[0]);
    const [selectedExp, setSelectedExp] = useState(expOptions[0]);
    const [selectedPosition, setSelectedPosition] = useState(positions[0]);
    const [selectedJobType, setSelectedJobType] = useState(jobTypes[0]);

    useEffect(() => {
        dispatch(fetchProvinces());
        dispatch(fetchPostions());
        dispatch(fetchJobCategories());
        dispatch(fetchPostings({ pageable: { page: 0, size: 10 } }));
    }, [dispatch]);

    useEffect(() => {
        setProvinces([{ id: -1, name: 'Địa điểm' }, ...provinceList]);
    }, [provinceList]);

    useEffect(() => {
        setJobCategoires([{ id: -1, name: 'Ngành nghề' }, ...jobCategoryList]);
    }, [jobCategoryList]);

    useEffect(() => {
        setPositions([{ id: -1, name: 'Cấp bậc' }, ...postionList]);
    }, [postionList]);

    useEffect(() => {
        if (selectedProvince.id !== provinces[0].id) {
            setDistricts([{ id: -1, name: selectedProvince.name }, ...selectedProvince.districts]);
        } else {
            setDistricts([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (districts?.length > 0) setSeletedDistrict(districts[0]);
        else setSeletedDistrict({});
    }, [districts]);

    const handleSearch = () => {
        const criteria = {
            searchValue: searchText || null,
            provinceId: selectedProvince?.id !== -1 ? selectedProvince.id : null,
            districtId: selectedDistrict?.id !== -1 ? selectedDistrict.id : null,
            jobCategoryId: selectedJobCategory?.id !== -1 ? selectedJobCategory.id : null,
            positionId: selectedPosition?.id !== -1 ? selectedPosition.id : null,
            minSalary: selectedSalary.minSalary,
            maxSalary: selectedSalary.maxSalary,
            experienceRequire: selectedExp?.id !== 'DEFAULT' ? selectedExp.id : null,
            jobType: selectedJobType?.id !== 'DEFAULT' ? selectedJobType.id : null,
        };

        dispatch(fetchPostings({ criteria, pageable: { page: 0, size: 10 } }));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-container')}>
                <div className={cx('group-search')}>
                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                    <input
                        className={cx('search-text')}
                        placeholder="Vị trí tuyển dụng, tên công ty "
                        spellCheck={false}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className={cx('clear-btn')} onClick={() => setSearchText('')}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className={cx('search-location')}>
                        <DropdownButton
                            items={provinces}
                            selectedItem={selectedProvince}
                            filterSearch
                            leftIcon={<FontAwesomeIcon icon={faLocationDot} />}
                            onSelectItem={setSelectedProvince}
                        />
                    </div>
                </div>
                <DropdownButton
                    items={jobCateogies}
                    selectedItem={selectedJobCategory}
                    filterSearch
                    leftIcon={<FontAwesomeIcon icon={faBriefcase} />}
                    onSelectItem={setSeletedJobCategory}
                />
                <Button className={cx('search-btn')} primary height="40px" onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </div>

            <div className={cx('search-extra-container')}>
                <DropdownButton
                    items={expOptions}
                    selectedItem={selectedExp}
                    leftIcon={<FontAwesomeIcon icon={faStar} />}
                    onSelectItem={setSelectedExp}
                />
                <DropdownButton
                    items={SalaryRanges}
                    selectedItem={selectedSalary}
                    onSelectItem={setSelectedSalary}
                    leftIcon={<FontAwesomeIcon icon={faCircleDollarToSlot} />}
                />
                <DropdownButton
                    items={positions}
                    selectedItem={selectedPosition}
                    onSelectItem={setSelectedPosition}
                    filterSearch={positions.length > 10}
                    leftIcon={<FontAwesomeIcon icon={faStar} />}
                />
                <DropdownButton
                    items={jobTypes}
                    selectedItem={selectedJobType}
                    onSelectItem={setSelectedJobType}
                    leftIcon={<FontAwesomeIcon icon={faBusinessTime} />}
                />
            </div>

            {districts?.length > 0 && (
                <div className={cx('location-filter')}>
                    <span className={cx('label-location')}>Danh sách địa điểm: </span>
                    <div className={cx('list-location')}>
                        {districts.map((district) => (
                            <div
                                key={district.id}
                                className={cx('location-item', {
                                    active: district.id === selectedDistrict?.id,
                                })}
                                onClick={() => setSeletedDistrict(district)}
                            >
                                {district.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filter;
