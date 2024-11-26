import { PenLineIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosting } from '../../../redux/postingSlice';
import '../PostingInfoBase/PostingInfoBase.scss';
import { Typography } from 'antd';

const PostingInfoReceiveCV = ({ validate }) => {
    const dispath = useDispatch();
    const posting = useSelector((state) => state.postings.posting);

    const [expiredAt, setExpriedDate] = useState(posting?.expiredAt || '');
    const [errors, setErrors] = useState('');
    const { Text } = Typography;
    // const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (expiredAt) {
            const date = new Date(expiredAt);
            date.setHours(23, 59, 59, 999);
            dispath(
                setPosting({
                    expiredAt: date.toISOString(),
                }),
            );
        }
    }, [expiredAt]);

    useEffect(() => {
        if (validate) {
            validate(() => {
                const newErrors = {};
                if (!expiredAt) {
                    newErrors.expiredAt = 'Vui lòng nhập thời gian hết hạn!';
                }
                setErrors(newErrors);
                return Object.keys(newErrors).length === 0;
            });
        }
    }, [validate, expiredAt]);

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
                                value={expiredAt ? expiredAt.split('T')[0] : ''}
                                placeholder="yyyy-mm-dd"
                                pattern="\d{4}/\d{2}/\d{2}"
                                onChange={(e) => setExpriedDate(e.target.value)}
                                required
                            />
                            <div className="underline" />
                        </div>
                        {errors.expiredAt && <Text type="danger">{errors.expiredAt}</Text>}
                    </div>
                </div>
                {/* <h4>Thông tin người nhận CV</h4>
                <div className="input-two-block-container">
                    <div className="select-container">
                        <span>Họ tên</span>
                        <div className="input-container">
                            <input
                                type="text"
                                id="name"
                                value={user.firstName + ' ' + user.lastName}
                                placeholder="Nhập họ tên"
                                required
                                disabled
                            />
                            <div className="underline" />
                        </div>
                    </div>
                    <div className="select-container">
                        <span>Số điện thoại</span>
                        <div className="input-container">
                            <input
                                type="text"
                                id="phoneNumber"
                                value={user.phoneNumber}
                                placeholder="Nhập số điện thoại"
                                required
                                disabled
                            />
                            <div className="underline" />
                        </div>
                    </div>
                    <div className="select-container">
                        <span>Email</span>
                        <div className="input-container">
                            <input
                                type="text"
                                id="email"
                                value={user.email}
                                placeholder="Nhập email"
                                required
                                disabled
                            />
                            <div className="underline" />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default PostingInfoReceiveCV;
