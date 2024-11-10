import { LayoutList } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import '../PostingInfoBase/PostingInfoBase.scss';
import EditorContent from '../../EditorContent/EditorContent';
import { useDispatch, useSelector } from 'react-redux';
import { setPostingJobDescription } from '../../../redux/postingSlice';

const PostingInfoDetail = () => {
    const dispatch = useDispatch();
    const posting = useSelector((state) => state.postings.posting);

    const [description, setDescription] = useState(posting?.jobDescription?.description || '');
    const [requirement, setRequirement] = useState(posting?.jobDescription?.requirement || '');
    const [benefit, setBenefit] = useState(posting?.jobDescription?.benefit || '');

    useEffect(() => {
        dispatch(
            setPostingJobDescription({
                description,
                requirement,
                benefit,
            }),
        );
    }, [description, requirement, benefit]);

    return (
        <>
            <div className="field-container">
                <div>
                    <div className="icon">
                        <LayoutList size={20} />
                    </div>
                </div>
                <div className="content-container">
                    <h3>Nội dung tuyển dụng chi tiết</h3>
                    <h4>Mô tả công việc</h4>
                    <div>
                        <EditorContent value={description} onChange={setDescription} />
                    </div>
                </div>
            </div>

            <div className="field-container">
                <div>
                    <div className="icon">
                        <LayoutList size={20} />
                    </div>
                </div>
                <div className="content-container">
                    <h3>Yêu cầu ứng viên</h3>
                    <h4>Mô tả yêu cầu ứng viên</h4>
                    <div>
                        <EditorContent value={requirement} onChange={setRequirement} />
                    </div>
                </div>
            </div>

            <div className="field-container">
                <div>
                    <div className="icon">
                        <LayoutList size={20} />
                    </div>
                </div>
                <div className="content-container">
                    <h3>Quyền lợi ứng viên</h3>
                    <h4>Mô tả quyền lợi</h4>
                    <div>
                        <EditorContent value={benefit} onChange={setBenefit} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostingInfoDetail;
