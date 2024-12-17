import { Button, Form, Input, Modal, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobCategory, fetchJobCategories } from '../../redux/jobCategorySlice';

function JobCategoryManagement() {
    const dispatch = useDispatch();
    const { list, loading, success } = useSelector((state) => state.jobCategories);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchJobCategories());
    }, []);

    useEffect(() => {
        if (success) {
            handleCancel();
            dispatch(fetchJobCategories());
        }
    }, [success]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        setSubmitting(true);
        dispatch(createJobCategory(values));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSubmitting(false);
        form.resetFields();
    };

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
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={showModal}>
                    Tạo mới
                </Button>
            </Space>

            <Table columns={columns} dataSource={list} rowKey="id" loading={loading} pagination={false} />

            <Modal title="Tạo mới vị trí" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên!' },
                            {
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
                                    const isNameExist = list.some(
                                        (item) => item.name.toLowerCase() === value.toLowerCase(),
                                    );
                                    if (isNameExist) {
                                        return Promise.reject(new Error('Tên này đã tồn tại, vui lòng nhập tên khác!'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            Tạo mới
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default JobCategoryManagement;
