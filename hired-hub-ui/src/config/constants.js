export const ExperienceRequire = Object.freeze({
    NO_EXPERIENCE_REQUIRE: { id: 'NO_EXPERIENCE_REQUIRE', name: 'Chưa có kinh nghiệm' },
    ONE_YEAR: { id: 'ONE_YEAR', name: '1 năm' },
    TWO_YEAR: { id: 'TWO_YEAR', name: '2 năm' },
    THREE_YEAR: { id: 'THREE_YEAR', name: '3 năm' },
    FOUR_YEAR: { id: 'FOUR_YEAR', name: '4 năm' },
    FIVE_YEAR: { id: 'FIVE_YEAR', name: '5 năm' },
    OVER_FIVE_YEAR: { id: 'OVER_FIVE_YEAR', name: 'Trên 5 năm' },
});

export const JobTypes = Object.freeze({
    FULL_TIME: { id: 'FULL_TIME', name: 'Toàn thời gian' },
    PASS_TIME: { id: 'PASS_TIME', name: 'Bán thời gian' },
    INTERN: { id: 'INTERN', name: 'Thực tập sinh' },
});

export const GenderRequire = Object.freeze({
    MALE: { id: 'MALE', name: 'Nam' },
    FEMALE: { id: 'FEMALE', name: 'Nữ' },
});

const constants = {
    ExperienceRequire,
    JobTypes,
};

export default constants;