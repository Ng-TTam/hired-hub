import { LayoutList } from "lucide-react";
import React from "react";
import "../PostingInfoBase/PostingInfoBase.scss";
import EditorContent from "../EditorContent/EditorContent";

const PostingInfoDetail = ({ setPostingInfoDetailData }) => {
  return (
    <>
      <div class="field-container">
        <div>
          <div className="icon">
            <LayoutList size={20} />
          </div>
        </div>
        <div className="content-container">
          <h3>Nội dung tuyển dụng chi tiết</h3>
          <h4>Mô tả công việc</h4>
          <div>
            <EditorContent />
          </div>
        </div>
      </div>

      <div class="field-container">
        <div>
          <div className="icon">
            <LayoutList size={20} />
          </div>
        </div>
        <div className="content-container">
          <h3>Yêu cầu ứng viên</h3>
          <h4>Mô tả yêu cầu ứng viên</h4>
          <div>
            <EditorContent />
          </div>
        </div>
      </div>

      <div class="field-container">
        <div>
          <div className="icon">
            <LayoutList size={20} />
          </div>
        </div>
        <div className="content-container">
          <h3>Quyền lợi ứng viên</h3>
          <h4>Mô tả quyền lợi</h4>
          <div>
          <EditorContent /></div>
        </div>
      </div>
    </>
  );
};

export default PostingInfoDetail;
