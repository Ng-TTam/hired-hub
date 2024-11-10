import React, { useState } from 'react';
import './CreateCompanyForm.scss';

const CreateCompanyForm = () => {
    const [formData, setFormData] = useState({
        logo: '',
        companyName: '',
        taxCode: '',
        businessArea: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        scale: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Handle form submission
    };

    const handleLogoChange = (e) => {
        // Handle logo file upload
        const file = e.target.files[0];
        if (file) {
            console.log('Selected logo:', file);
        }
    };

    return (
        <form className="company-form" onSubmit={handleSubmit}>
            <div className="form-group-1">
                <div className="logo-upload">
                    <label>Logo</label>
                    <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} />
                    <button type="button" className="change-logo-btn">
                        Đổi logo
                    </button>
                </div>
            </div>
            <div className="form-grid">
                {/* Left Column */}
                <div className="form-column">
                    <div className="form-group-1">
                        <label>Tên công ty</label>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Nhập tên công ty"
                            value={formData.companyName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group-1">
                        <label>Mã số thuế</label>
                        <input
                            type="text"
                            name="taxCode"
                            placeholder="Nhập mã số thuế"
                            value={formData.taxCode}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group-1">
                        <label>Lĩnh vực hoạt động</label>
                        <select name="businessArea" value={formData.businessArea} onChange={handleInputChange}>
                            <option value="">Chọn lĩnh vực hoạt động</option>
                            <option value="tech">Công nghệ</option>
                            <option value="finance">Tài chính</option>
                            <option value="retail">Bán lẻ</option>
                        </select>
                    </div>

                    <div className="form-group-1">
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ công ty"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group-1">
                        <label>Điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="form-column">
                    <div className="form-group-1">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email công ty"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group-1">
                        <label>Website</label>
                        <input
                            type="url"
                            name="website"
                            placeholder="https://"
                            value={formData.website}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group-1">
                        <label>Quy mô</label>
                        <select name="scale" value={formData.scale} onChange={handleInputChange}>
                            <option value="">Chọn quy mô công ty</option>
                            <option value="small">Dưới 50 nhân viên</option>
                            <option value="medium">50-200 nhân viên</option>
                            <option value="large">Trên 200 nhân viên</option>
                        </select>
                    </div>

                    {/* <div className="form-group-1 description-group">
            <label>Mô tả công ty</label>
            <div className="text-editor-toolbar">
              <button type="button">B</button>
              <button type="button">I</button>
              <button type="button">U</button>
              <button type="button">≡</button>
              <button type="button">⋮</button>
            </div>
            <textarea
              name="description"
              placeholder="Nhập vào nội dung"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div> */}
                </div>
            </div>

            <div className="form-footer">
                <button type="submit" className="submit-btn">
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default CreateCompanyForm;
