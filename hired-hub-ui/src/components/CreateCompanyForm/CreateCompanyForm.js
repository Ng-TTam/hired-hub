import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Select, Upload } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../assets/images';
import { createCompany } from '../../redux/companySlice';
import { fetchScaleCategories } from '../../redux/scaleCategorySlice';
import EditorContent from '../EditorContent/EditorContent';
import Image from '../Image';
import styles from './CreateCompanyForm.module.scss';

const cx = classNames.bind(styles);
const { Option } = Select;

const CreateCompanyForm = () => {
    const dispatch = useDispatch();
    const scaleCategories = useSelector((state) => state.scaleCategories.list);

    const [form] = Form.useForm();
    const [logoPreview, setLogoPreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);

    useEffect(() => {
        dispatch(fetchScaleCategories());
    }, [dispatch]);

    const handleSubmit = (values) => {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('taxCode', values.taxCode);
        formData.append('address', values.address);
        formData.append('phone', values.phone);
        formData.append('email', values.email);
        formData.append('website', values.website || null);
        formData.append('description', values.description || null);

        if (values.logo && values.logo[0]) {
            formData.append('logo', values.logo[0].originFileObj);
        }
        if (values.coverImage && values.coverImage[0]) {
            formData.append('coverImage', values.coverImage[0].originFileObj);
        }

        const selectedScaleCategory = scaleCategories.find((category) => category.id === values.scaleCategory);
        if (selectedScaleCategory) {
            formData.append('scaleCategory.id', selectedScaleCategory.id);
        }

        dispatch(createCompany(formData));
    };

    const handleCoverPreview = ({ file }) => {
        setCoverPreview(URL.createObjectURL(file.originFileObj));
    };

    const handleLogoPreview = ({ file }) => {
        setLogoPreview(URL.createObjectURL(file.originFileObj));
    };

    return (
        <Form
            form={form}
            layout="vertical"
            className={cx('company-form')}
            onFinish={handleSubmit}
            initialValues={{ scaleCategory: '' }}
        >
            <div className={cx('upload-section')}>
                <div className={cx('cover-upload-container')}>
                    <Image
                        className={cx('cover-preview-container')}
                        src={coverPreview}
                        alt="cover preview"
                        fallback={images.defaultCompanyCover}
                    />
                    <Form.Item name="coverImage" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList || []}>
                        <Upload
                            className={cx('change-logo-btn')}
                            accept="image/*"
                            maxCount={1}
                            showUploadList={false}
                            onChange={handleCoverPreview}
                        >
                            <FontAwesomeIcon icon={faCamera} />
                        </Upload>
                    </Form.Item>
                </div>
                <div className={cx('logo-upload-container')}>
                    <Image
                        className={cx('logo-preview-container')}
                        src={logoPreview}
                        alt="Logo preview"
                        fallback={images.logoDefault}
                    />
                    <Form.Item name="logo" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList || []}>
                        <Upload
                            accept="image/*"
                            maxCount={1}
                            showUploadList={false}
                            onChange={handleLogoPreview}
                            className={cx('change-logo-btn')}
                        >
                            <FontAwesomeIcon icon={faCamera} />
                        </Upload>
                    </Form.Item>
                </div>
            </div>

            {/* Form Fields */}
            <div className={cx('form-grid')}>
                {/* Left Column */}
                <div className={cx('form-column')}>
                    <Form.Item
                        label="Tên công ty"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
                    >
                        <Input placeholder="Nhập tên công ty" />
                    </Form.Item>
                    <Form.Item
                        label="Mã số thuế"
                        name="taxCode"
                        rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
                    >
                        <Input placeholder="Nhập mã số thuế" />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                        <Input placeholder="Nhập địa chỉ công ty" />
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </div>

                {/* Right Column */}
                <div className={cx('form-column')}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                    >
                        <Input placeholder="Nhập email công ty" />
                    </Form.Item>
                    <Form.Item label="Website" name="website">
                        <Input placeholder="https://example.com" />
                    </Form.Item>
                    <Form.Item label="Quy mô" name="scaleCategory">
                        <Select value={form.scaleCategory} placeholder="Chọn quy mô công ty">
                            {scaleCategories?.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
            </div>
            <Form.Item label="Mô tả công ty" name="description">
                <EditorContent className={cx('description-group')} />
            </Form.Item>
            {/* Footer */}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Lưu
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateCompanyForm;
