import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '../../../assets/images';
import { unsavePosting } from '../../../redux/savedPostingSlice';
import { convertSalary } from '../../../utils';
import './SavedPostingItem.scss';
import Image from '../../Image';

const SavedPostingItem = ({ savedPosting }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatdate = (date) => {
        if (!date) {
            console.error("Invalid date:", date);
            return "N/A";
        }
    
        try {
            return format(parseISO(date), 'dd/MM/yyyy - HH:mm', { locale: vi });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    };

    const handSavePost = async () => {
        const unsaved = { postId: savedPosting.posting.id };
        await dispatch(unsavePosting(unsaved)).unwrap();
        window.location.reload();
    };

    const handPosting = () => {
        navigate(`../../posting/${savedPosting.posting.id}`);
    };

    const handCompany = () => {
        navigate(`../../company/${savedPosting.posting.company.id}`);
    };

    return (
        <div className="sp-item">
            <div className="spost-avatar" style={{ alignSelf: 'center' }}>
                <Image className='img-cv-1'
                    src={savedPosting?.posting.company.logo? savedPosting?.posting.company.logo : images.logoDefault}
                    alt="Logo company"
                    fallback={images.logoDefault}
                    style={{width:"102px", height:"102px", borderRadius:"5%"}}
                />
            </div>
            <div className="sp-data">
                <div className="sp-title-block">
                    <div className="sp-posting-title" onClick={handPosting}>
                        {savedPosting?.posting.title || 'Title'}
                    </div>
                    <div className="sp-money">
                        {convertSalary(
                            savedPosting?.posting?.minimumSalary,
                            savedPosting?.posting?.maximumSalary,
                            savedPosting?.posting?.currencyUnit,
                        )}
                    </div>
                </div>
                <div className="sp-comany-name" onClick={handCompany}>
                    {savedPosting?.posting?.company?.name}
                </div>
                <div className="sp-time-save">{`Đã lưu: ${formatdate(savedPosting?.savedAt)}`}</div>
                <div className="sp-infor">
                    <div className="sp-infor-time">
                        {`Cập nhật ${formatDistanceToNow(new Date(savedPosting?.posting?.updatedAt), {
                            locale: vi,
                        })} trước`}
                    </div>
                    <button className="sp-action" onClick={handSavePost}>
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: '#424e5c', fontSize: '12px', marginRight: '10px' }}
                        />
                        Bỏ lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavedPostingItem;
