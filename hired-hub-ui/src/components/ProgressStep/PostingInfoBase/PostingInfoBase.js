import { FolderEditIcon, PenLineIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchJobCategories } from '../../../redux/jobCategorySlice';
import { setPosting } from '../../../redux/postingSlice';
import './PostingInfoBase.scss';

const PostingInfoBase = () => {
    const dispatch = useDispatch();
    const jobCategories = useSelector((state) => state.jobCategories.list);
    const { posting } = useSelector((state) => state.postings);

    const [title, setTitle] = useState(posting?.title || '');
    const [mainJob, setMainJob] = useState(posting?.mainJob || {});
    const [subJobs, setSubJobs] = useState(posting?.subJobs || []);

    useEffect(() => {
        dispatch(fetchJobCategories());
    }, []);

    useEffect(() => {
        dispatch(
            setPosting({
                title,
                mainJob,
                subJobs,
            }),
        );
    }, [title, mainJob, subJobs]);

    return (
        <>
            <div className="field-container">
                <div>
                    <div className="icon">
                        <PenLineIcon size={20} />
                    </div>
                </div>
                <div className="content-container">
                    <h3>Tiêu đề tin tuyển dụng</h3>
                    <div className="input-container">
                        <input
                            name="title"
                            type="text"
                            id="input"
                            placeholder="Nhập tiêu đề"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="underline" />
                    </div>
                </div>
            </div>

            <div className="field-container">
                <div>
                    <div className="icon">
                        <FolderEditIcon size={20} />
                    </div>
                </div>
                <div className="content-container">
                    <h3>Ngành nghề và lĩnh vực</h3>
                    <div className="input-two-block-container">
                        <div className="select-container half-container">
                            <span>Ngành nghề chính</span>
                            <Select
                                name="mainJob"
                                options={jobCategories}
                                value={mainJob}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                onChange={setMainJob}
                            />
                        </div>
                        <div className="select-container half-container">
                            <span>Ngành nghề phụ</span>
                            <Select
                                name="subJobs"
                                options={jobCategories}
                                value={subJobs}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                isMulti
                                onChange={setSubJobs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostingInfoBase;
