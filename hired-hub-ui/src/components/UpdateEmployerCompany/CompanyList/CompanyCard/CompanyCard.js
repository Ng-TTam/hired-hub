import { useDispatch } from 'react-redux';
import images from '../../../../assets/images';
import Image from '../../../Image';
import styles from './CompanyCard.module.scss';
import classNames from 'classnames/bind';
import { updateEmployerCompany } from '../../../../redux/employerSilce';

const cx = classNames.bind(styles);

function CompanyCard({ company }) {
    const dispatch = useDispatch();

    return (
        <div className={cx('wrapper')}>
            <Image className={cx('logo')} src={company?.logo} alt="Logo công ty" fallback={images.logoDefault} />
            <div className={cx('infor')}>
                <span>{company?.name}</span>
                <span>MST: {company?.taxCode}</span>
                <span>{company?.address}</span>
            </div>
            <button
                className={cx('btn-select')}
                onClick={() => dispatch(updateEmployerCompany({ companyId: company.id }))}
            >
                Chọn
            </button>
        </div>
    );
}

export default CompanyCard;
