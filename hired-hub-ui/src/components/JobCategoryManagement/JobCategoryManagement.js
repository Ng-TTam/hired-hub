import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobCategories } from '../../redux/jobCategorySlice';

function JobCategoryManagement() {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.jobCategories);

    useEffect(() => {
        dispatch(fetchJobCategories());
    }, []);

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (title, record, index) => index + 1,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={list} rowKey="id" loading={loading} pagination={false} />
        </div>
    );
}

export default JobCategoryManagement;
