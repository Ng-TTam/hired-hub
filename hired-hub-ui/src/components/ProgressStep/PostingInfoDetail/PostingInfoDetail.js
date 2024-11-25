import { LayoutList } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import '../PostingInfoBase/PostingInfoBase.scss';
import EditorContent from '../../EditorContent/EditorContent';
import { useDispatch, useSelector } from 'react-redux';
import { setPostingJobDescription } from '../../../redux/postingSlice';
import { Typography } from 'antd';

const PostingInfoDetail = ({ validate }) => {
    const dispatch = useDispatch();
    const posting = useSelector((state) => state.postings.posting);

    const [description, setDescription] = useState(posting?.jobDescription?.description || '');
    const [requirement, setRequirement] = useState(posting?.jobDescription?.requirement || '');
    const [benefit, setBenefit] = useState(posting?.jobDescription?.benefit || '');
    const [errors, setErrors] = useState('');
    const { Text } = Typography;

    useEffect(() => {
        dispatch(
            setPostingJobDescription({
                description,
                requirement,
                benefit,
            }),
        );
    }, [description, requirement, benefit]);

    useEffect(() => {
        setDescription(posting?.jobDescription?.description || '');
        setRequirement(posting?.jobDescription?.requirement || '');
        setBenefit(posting?.jobDescription?.benefit || '');
    }, [posting]);

    useEffect(() => {
        if (validate) {
            validate(() => {
                const newErrors = {};
                if (!description.trim()) {
                    newErrors.description = 'Vui lòng nhập mô tả công việc!';
                }
                if (!requirement.trim()) {
                    newErrors.requirement = 'Vui lòng nhập yêu cầu ứng viên!';
                }
                if (!benefit.trim()) {
                    newErrors.benefit = 'Vui lòng nhập quyền lợi ứng viên';
                }
                setErrors(newErrors);
                return Object.keys(newErrors).length === 0;
            });
        }
    }, [validate, description, requirement, benefit]);

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
                    {errors.description && <Text type="danger">{errors.description}</Text>}
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
                    {errors.requirement && <Text type="danger">{errors.requirement}</Text>}
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
                    {errors.benefit && <Text type="danger">{errors.benefit}</Text>}
                </div>
            </div>
        </>
    );
};

export default PostingInfoDetail;
