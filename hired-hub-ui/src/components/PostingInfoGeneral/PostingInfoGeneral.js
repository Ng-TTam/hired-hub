import React, { useState } from "react";
import { InfoIcon, MapPin} from "lucide-react";
import "./PostingInfoGeneral.scss";
import "../PostingInfoBase/PostingInfoBase.scss";

const PostingInfoGeneral = ({ setPostingInfoGeneralData }) => {
  const [salaryType, setSalaryType] = useState("");

  const handleSalaryTypeChange = (e) => {
    setSalaryType(e.target.value);
  };
  return (
    <div class="field-container">
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
              />
              <div className="underline" />
            </div>
          </div>
          <div className="select-container">
            <span>Loại công việc</span>
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
        </div>

        <div className="input-two-block-container">
          <div className="select-container">
            <span>Giới tính</span>
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
          <div className="select-container">
            <span>Cấp bậc</span>
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
          <div className="select-container">
            <span>Kinh nghiệm</span>
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
        </div>

        <h4>Mức lương</h4>
        <div className="input-two-block-container">
          <div className="select-container">
            <span>Loại tiền tệ</span>
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
          <div className="select-container">
            <span>Kiểu lương</span>
            <select onChange={handleSalaryTypeChange} value={salaryType}>
              <option value="">-- Chọn kiểu lương --</option>
              <option value="between">Trong khoảng</option>
              <option value="from">Từ</option>
              <option value="to">Đến</option>
              <option value="negotiable">Thoả thuận</option>
            </select>
          </div>

          {salaryType === "between" || salaryType === "from" ? (
            <div className="select-container">
              <span>Từ</span>
              <div className="input-container">
                <input
                  type="number"
                  id="min"
                  placeholder="Nhập số tiền ít nhất"
                  required
                />
                <div className="underline" />
              </div>
            </div>
          ) : (
            <></>
          )}
          {salaryType === "between" || salaryType === "to" ? (
            <div className="select-container">
              <span>Đến</span>
              <div className="input-container">
                <input
                  type="text"
                  id="max"
                  placeholder="Nhập số tiền nhều nhất"
                  required
                />
                <div className="underline" />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <h4>Khu vực làm việc</h4>
        <div className="area-container">
          <div className="area">
            <MapPin size={20} />
            <span>Khu vực 1:</span>
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <select>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>
            <div
              className="input-container"
              style={{ width: "100%", marginLeft: "20px" }}
            >
              <input
                type="text"
                id="location"
                placeholder="Nhập địa chỉ"
                required
              />
              <div className="underline" />
            </div>
          </div>
          <h4>+ Thêm địa chỉ</h4>
        </div>
        <button className="button-success">Thêm khu vực mới</button>
      </div>
    </div>
  );
};

export default PostingInfoGeneral;
