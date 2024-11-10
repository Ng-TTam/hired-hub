import { PenLineIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosting } from '../../../redux/postingSlice';
import '../PostingInfoBase/PostingInfoBase.scss';

const PostingInfoReceiveCV = () => {
    const dispath = useDispatch();
    const posting = useSelector((state) => state.postings.posting);

    const [expiredDate, setExpriedDate] = useState(posting?.expiredDate || '');

    console.log(posting);

    useEffect(() => {
        dispath(
            setPosting({
                expiredDate,
            }),
        );
    }, [expiredDate]);

    return (
        <div className="field-container">
            <div>
                <div className="icon">
                    <PenLineIcon size={20} />
                </div>
            </div>
            <div className="content-container">
                <h3>Thông tin chung</h3>
                <div className="input-two-block-container">
                    <div className="select-container">
                        <span>Hạn chót nhận CV</span>
                        <div className="input-container">
                            <input
                                type="date"
                                id="expiryDate"
                                value={expiredDate}
                                placeholder="yyyy-mm-dd"
                                pattern="\d{4}/\d{2}/\d{2}"
                                onChange={(e) => setExpriedDate(e.target.value)}
                                required
                            />
                            <div className="underline" />
                        </div>
                    </div>
                </div>
                <h4>Thông tin người nhận CV</h4>
                <div className="input-two-block-container">
                    <div className="select-container">
                        <span>Họ tên</span>
                        <div className="input-container">
                            <input type="text" id="name" placeholder="Nhập họ tên" required />
                            <div className="underline" />
                        </div>
                    </div>
                    <div className="select-container">
                        <span>Số điện thoại</span>
                        <div className="input-container">
                            <input type="text" id="phoneNumber" placeholder="Nhập số điện thoại" required />
                            <div className="underline" />
                        </div>
                    </div>
                    <div className="select-container">
                        <span>Email</span>
                        <div className="input-container">
                            <input type="text" id="email" placeholder="Nhập email" required />
                            <div className="underline" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostingInfoReceiveCV;
