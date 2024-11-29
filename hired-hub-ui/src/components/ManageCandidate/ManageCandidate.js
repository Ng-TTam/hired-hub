import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Menu, Button, Modal } from 'antd'; // Import Ant Design components
import { fetchApplications, resetApplication, setApplicationStatus } from '../../redux/applicationSlice';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import './ManageCandidate.scss';
import Image from '../Image';
import images from '../../assets/images/index';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';
import HtmlRenderer from '../HtmlRenderer';

const ITEMS_PER_PAGE = 5;

const ManageCandidate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applications } = useSelector((state) => state.application);
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterStatusLabel, setFilterStatusLabel] = useState('Tất cả');
    const [isOpenStatus, setIsOpenStatus] = useState(false);
    const [filterPosting, setFilterPosting] = useState(null);
    const [filterPostingLabel, setFilterPostingLabel] = useState('Tất cả');
    const [isOpenPosting, setIsOpenPosting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleToggleStatus = () => {
        setIsOpenStatus(!isOpenStatus);
    };
    const handleTogglePosting = () => {
        setIsOpenPosting(!isOpenPosting);
    };

    useEffect(() => {
        dispatch(fetchApplications());
        return () => {
            dispatch(resetApplication());
        };
    }, [dispatch]);

    const handCV = (application) => {
        window.open(`../business/cv-review/${application.id}`, '_blank');
    };

    const handPosting = (application) => {
        navigate(`./posting/${application.posting.id}`);
    };

    const handApproved = async (applicationId) => {
        var ok = false;
        Modal.confirm({
            title: 'Bạn có chắc chắn?',
            content: 'Bạn có chắc chắn muốn cập nhật không?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                ok = true;
            },
        });
        if(ok){
            const applicationStatus = { applicationStatus: 'APPROVED' };
            await dispatch(setApplicationStatus({ applicationId, applicationStatus })).unwrap();
            dispatch(fetchApplications());
        }
    };

    const handRejected = async (applicationId) => {
        var ok = false;
        Modal.confirm({
            title: 'Bạn có chắc chắn?',
            content: 'Bạn có chắc chắn muốn cập nhật không?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                ok = true;
            },
        });
        if(ok){
            const applicationStatus = { applicationStatus: 'REJECTED' };
            await dispatch(setApplicationStatus({ applicationId, applicationStatus })).unwrap();
            dispatch(fetchApplications());
        }
    };

    const handPending = async (applicationId) => {
        const applicationStatus = { applicationStatus: 'PENDING' };
        await dispatch(setApplicationStatus({ applicationId, applicationStatus })).unwrap();
        dispatch(fetchApplications());
    };

    const pendingMenu = (applicationId) => (
        <Menu>
            <Menu.Item onClick={() => handApproved(applicationId)}>Approve</Menu.Item>
            <Menu.Item onClick={() => handRejected(applicationId)}>Reject</Menu.Item>
        </Menu>
    );
    const rejectMenu = (applicationId) => (
        <Menu>
            <Menu.Item onClick={() => handApproved(applicationId)}>Approve</Menu.Item>
            {/* <Menu.Item onClick={() => handPending(applicationId)}>Pending</Menu.Item> */}
        </Menu>
    );
    const approveMenu = (applicationId) => (
        <Menu>
            <Menu.Item onClick={() => handRejected(applicationId)}>Reject</Menu.Item>
            {/* <Menu.Item onClick={() => handPending(applicationId)}>Pending</Menu.Item> */}
        </Menu>
    );

    const statusOptions = [
        { key: 'null', label: 'Tất cả' }, // Null key for showing all
        { key: 'PENDING', label: 'Chưa phản hồi' },
        { key: 'APPROVED', label: 'Hồ sơ phù hợp' },
        { key: 'REJECTED', label: 'Hồ sơ không phù hợp' },
    ];

    const statusMenu = (
        <Menu
            onClick={({ key }) => {
                const selectedOption = statusOptions.find((option) => option.key === key);
                setFilterStatus(key);
                setFilterStatusLabel(selectedOption?.label || 'Tất cả');
                setCurrentPage(1);
            }}
            items={statusOptions.map((option) => ({
                key: option.key,
                label: option.label,
            }))}
        />
    );

    const postingOptions = [
        { key: 'null', label: 'Tất cả' },
        ...[...new Set(applications?.map((application) => application?.posting?.id))].map((id) => {
            const posting = applications.find((application) => application?.posting?.id === id)?.posting;
            return { key: id, label: posting?.title || 'Mô tả không có' };
        }),
    ];
    const postingMenu = (
        <Menu
            onClick={({ key }) => {
                const selectedOption = postingOptions.find((option) => option.key === key);
                setFilterPosting(key);
                setFilterPostingLabel(selectedOption?.label || 'Tất cả');
                setCurrentPage(1);
            }}
            items={postingOptions.map((option) => ({
                key: option.key,
                label: option.label,
            }))}
        />
    );

    const filteredApplications = applications?.filter((app) => {
        const isStatusMatch = filterStatus ? (filterStatus === 'null' ? true : app.status === filterStatus) : true;
        const isPostingMatch = filterPosting
            ? filterPosting === 'null'
                ? true
                : app.posting?.id === filterPosting
            : true;
        return isStatusMatch && isPostingMatch;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredApplications?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredApplications?.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className="header-candidate">
                <div className="text-candidate">
                    <span>Quản lý ứng viên</span>
                </div>
                <div className="select-candidate">
                    <div className="text-header-select-posting">
                        <span>Bài tuyển dụng: </span>
                    </div>
                    <div className="pa-header-select-posting">
                        <Dropdown
                            overlay={postingMenu}
                            trigger={['click']}
                            placement="bottom"
                            overlayClassName="pa-custom-dropdown-status"
                            onClick={handleTogglePosting}
                            onBlur={() => setIsOpenPosting(false)}
                        >
                            <button className="pa-filter-dropdown-status">
                                {filterPostingLabel}
                                <FontAwesomeIcon
                                    icon={isOpenPosting ? faChevronUp : faChevronDown} // Dùng mũi tên hướng lên khi dropdown mở
                                    style={{ transition: 'transform 0.2s' }}
                                />
                            </button>
                        </Dropdown>
                    </div>
                    <div className="text-header-select-status">
                        <span>Trạng thái ứng tuyển: </span>
                    </div>
                    <div className="pa-header-select-status">
                        <Dropdown
                            overlay={statusMenu}
                            trigger={['click']}
                            placement="bottom"
                            overlayClassName="pa-custom-dropdown-status"
                            onClick={handleToggleStatus}
                            onBlur={() => setIsOpenStatus(false)}
                        >
                            <button className="pa-filter-dropdown-status">
                                {filterStatusLabel}
                                <FontAwesomeIcon
                                    icon={isOpenStatus ? faChevronUp : faChevronDown} // Dùng mũi tên hướng lên khi dropdown mở
                                    style={{ transition: 'transform 0.2s' }}
                                />
                            </button>
                        </Dropdown>
                    </div>
                </div>
            </div>
            {currentItems?.length > 0 ? (
                <div style={{ width: '100%', marginTop: '10px'}}>
                    <table className="custom-table-candidate">
                        <thead>
                            <tr>
                                <th>Ứng viên</th>
                                <th>CV</th>
                                <th>Bài tuyển dụng</th>
                                <th>Thông tin liên hệ</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((application) => (
                                <tr key={application?.id}>
                                    <td className="candidate-info">
                                        <div className="cv-manage-image">
                                            <Image
                                                src={application?.cv?.jobSeeker?.avatar}
                                                alt={application?.cv.id}
                                                fallback={images.avatarDefault}
                                                className="avatar"
                                            />
                                        </div>
                                        <div className="cv-manage-name">
                                            {application?.cv?.jobSeeker?.firstName}{' '}
                                            {application?.cv?.jobSeeker?.lastName || 'Nguyễn Văn A'}
                                        </div>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <div className="cv-description" onClick={() => handCV(application)}>
                                            <HtmlRenderer content={application?.cv?.description || 'CV Description'}/>
                                        </div>
                                        <div className="cv-update-time">
                                            Cập nhật:{' '}
                                            {application?.cv.updatedAt
                                                ? `${formatDistanceToNow(new Date(application.cv.updatedAt), {
                                                      locale: vi,
                                                  })} trước`
                                                : 'Vừa xong'}
                                        </div>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <div className="posting-title-appli" onClick={() => handPosting(application)}>
                                            {application?.posting?.title || 'Title'}
                                        </div>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <div className="contact-info">{application?.email || 'email@example.com'}</div>
                                        <div className="contact-info">
                                            {application?.cv?.jobSeeker?.phoneNumber || '01234567890'}
                                        </div>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        {application?.status === 'PENDING' ? (
                                            <Dropdown overlay={pendingMenu(application?.id)} trigger={['hover']}>
                                                <Button className="status-button" style={{ width: '99.4px' }}>
                                                    {application?.status || 'None'}
                                                </Button>
                                            </Dropdown>
                                        ) : application?.status === 'APPROVED' ? (
                                            <Dropdown overlay={approveMenu(application?.id)} trigger={['hover']}>
                                                <Button className="status-button active" style={{ width: '99.4px' }}>
                                                    {application?.status || 'None'}
                                                </Button>
                                            </Dropdown>
                                        ) : (
                                            <Dropdown overlay={rejectMenu(application?.id)} trigger={['hover']}>
                                                <Button className="status-button deactive" style={{ width: '99.4px' }}>
                                                    {application?.status || 'None'}
                                                </Button>
                                            </Dropdown>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            ) : (
                <div className="no-application-table">
                    <div className="no-pa-image-appli">
                        <img src={images.emptyCV} />
                    </div>
                    <div className="no-pa-message-appli">
                        <span>Không tìm thấy ứng viên nào</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCandidate;
