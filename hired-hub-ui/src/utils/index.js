import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export const convertSalary = (minSalary, maxSalary) => {
    if (minSalary == null && maxSalary == null) {
        return 'Thỏa thuận';
    }
    if (minSalary != null && maxSalary != null) {
        return `${minSalary / 1_000_000} - ${maxSalary / 1_000_000} triệu`;
    }
    if (minSalary != null) {
        return `Trên ${minSalary / 1_000_000} triệu`;
    }
    return `Tới ${maxSalary / 1_000_000} triệu`;
};

export const convertWorkAddressSumary = (workAddresses) => {
    if (!workAddresses) return '';
    const addressesLength = workAddresses.length;

    if (addressesLength === 1) {
        const workAddress = workAddresses[0];
        return `${workAddress.province.name} - ${workAddress.district.name}`;
    } else if (addressesLength === 2) {
        const workAddress1 = workAddresses[0];
        const workAddress2 = workAddresses[1];
        return `${workAddress1.province.name}, ${workAddress2.province.name}`;
    } else if (addressesLength > 2) {
        const firstAddress = workAddresses[0];
        return `${firstAddress.province.name} & ${addressesLength - 1} nơi khác`;
    }

    return '';
};

export const convertWorkAddress = (workAddresses) => {
    if (!workAddresses) return '';
    const addressesLength = workAddresses.length;

    if (addressesLength === 0) {
        return '';
    }

    const formattedAddresses = workAddresses.map((workAddress, index) => {
        return (
            <span key={index}>
                {`${workAddress.province.name} - ${workAddress.district.name}`}
                {index < addressesLength - 1 && <br />}
            </span>
        );
    });

    return formattedAddresses;
};

export const convertWorkAddressDetail = (workAddresses) => {
    if (!workAddresses) return '';
    const addressesLength = workAddresses.length;

    if (addressesLength === 0) {
        return '';
    }

    const formattedAddresses = workAddresses.map((workAddress, index) => {
        return (
            <span key={index}>
                {`${workAddress.province.name}: ` +
                    `${workAddress.location ? workAddress.location + ' - ' : ''}` +
                    `${workAddress.district.name}`}
                {index < addressesLength - 1 && <br />}
            </span>
        );
    });

    return formattedAddresses;
};

export const getRemainingTime = (expiredAt) => {
    const currentTime = new Date();
    const expirationTime = new Date(expiredAt);

    const remainingTime = expirationTime - currentTime;

    if (remainingTime < 0) {
        return { remainingTime: 0, message: 'Hết hạn' };
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

    let message;
    if (days > 0) {
        message = `Còn lại ${days} ngày`;
    } else if (hours > 0) {
        message = `Còn lại ${hours} giờ`;
    } else {
        message = `Còn lại ${minutes} phút`;
    }

    return { remainingTime: remainingTime / 1000, message };
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy', { locale: vi });
};

export const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = parseISO(dateTimeString);
    return format(date, 'dd/MM/yyyy HH:mm', { locale: vi });
};

export const convertScaleCategory = (minEmployee, maxEmployee) => {
    if (minEmployee && maxEmployee) {
        return `${minEmployee} - ${maxEmployee} nhân viên`;
    } else if (!minEmployee && !maxEmployee) {
        return 'Không rõ';
    } else if (!minEmployee) {
        return `Tới ${maxEmployee} nhân viên`;
    }
    return `${minEmployee}+ nhân viên`;
};
