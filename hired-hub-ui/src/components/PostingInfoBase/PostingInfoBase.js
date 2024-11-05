import React, { useState } from "react";
import { FolderEditIcon, PenLineIcon } from "lucide-react";
import "./PostingInfoBase.scss";

const PostingInfoBase = ({ setPostingInfoBaseData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostingInfoBaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div class="field-container">
        <div>
          <div className="icon">
            <PenLineIcon size={20} />
          </div>
        </div>
        <div className="content-container">
          <h3>Tiêu đề tin tuyển dụng</h3>
          <div className="input-container">
            <input name="title" onChange={handleChange} type="text" id="input" placeholder="Nhập tiêu đề" required />
            <div className="underline" />
          </div>
        </div>
      </div>

      <div class="field-container">
        <div>
          <div className="icon">
            <FolderEditIcon size={20} />
          </div>
        </div>
        <div className="content-container">
          <h3>Ngành nghê và lĩnh vực</h3>
          <div className="input-two-block-container">
            <div className="select-container">
              <span>Ngành nghề chính</span>
              <select name="mainJob" onChange={handleChange}>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>
            <div className="select-container">
              <span>Ngành nghề phụ</span>
              <select name="subJob" onChange={handleChange}>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostingInfoBase;
