package com.graduation.hiredhub.repository.specification;

import com.graduation.hiredhub.entity.*;
import com.graduation.hiredhub.entity.enumeration.ExperienceRequire;
import com.graduation.hiredhub.entity.enumeration.JobType;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class PostingSpecifications {

    /**
     * Creates a {@link Specification} to find postings where either the title or
     * the company's name matches the given search text.
     *
     * @param searchValue the search text to match against the posting title or company name
     * @return a {@link Specification} for matching postings by title or company name
     */
    public static Specification<Posting> withSearchText(String searchValue) {
        return (root, query, criteriaBuilder) -> {
            if (searchValue.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            String pattern = "%" + searchValue + "%";
            Predicate titleMatch = criteriaBuilder.like(root.get("title"), pattern);

            Join<Posting, Employer> postingEmployerJoin = root.join("employer");
            Join<Employer, Company> employerCompanyJoin = postingEmployerJoin.join("company");
            Predicate companyNameMatch = criteriaBuilder.like(employerCompanyJoin.get("name"), pattern);

            return criteriaBuilder.or(titleMatch, companyNameMatch);
        };
    }

    /**
     * Creates a {@link Specification} to find postings with a specified province ID.
     *
     * @param provinceId the ID of the province
     * @return a {@link Specification} for filtering postings by province ID
     */
    public static Specification<Posting> hasProvince(Integer provinceId) {
        return (root, query, criteriaBuilder) -> {
            Join<Posting, JobDescription> postingJobDescriptionJoin = root.join("jobDescription");
            Join<JobDescription, WorkAddress> jobDescriptionWorkAddressJoin = postingJobDescriptionJoin.join("workAddress");
            return criteriaBuilder.equal(jobDescriptionWorkAddressJoin.get("province").get("id"), provinceId);
        };
    }

    /**
     * Creates a {@link Specification} to find postings with a specified district ID.
     *
     * @param districtId the ID of the district
     * @return a {@link Specification} for filtering postings by district ID
     */
    public static Specification<Posting> hasDistrict(Integer districtId) {
        return (root, query, criteriaBuilder) -> {
            Join<Posting, JobDescription> postingJobDescriptionJoin = root.join("jobDescription");
            Join<JobDescription, WorkAddress> jobDescriptionWorkAddressJoin = postingJobDescriptionJoin.join("workAddress");
            return criteriaBuilder.equal(jobDescriptionWorkAddressJoin.get("district").get("id"), districtId);
        };
    }

    /**
     * Creates a {@link Specification} to find postings with salaries in a specified range.
     * If min or max salary is null, that boundary is not applied.
     *
     * @param min the minimum salary
     * @param max the maximum salary
     * @return a {@link Specification} for filtering postings by salary range
     */
    public static Specification<Posting> hasSalaryInRange(Integer min, Integer max) {
        return (root, query, criteriaBuilder) -> {
            if (min == null && max == null) {
                return criteriaBuilder.conjunction();
            }

            Path<Integer> minimumSalary = root.get("minimumSalary");
            Path<Integer> maximumSalary = root.get("maximumSalary");

            Predicate finalPredicate = criteriaBuilder.conjunction();

            Predicate minimumGreaterThan = criteriaBuilder.or(
                    criteriaBuilder.isNull(minimumSalary),
                    criteriaBuilder.greaterThanOrEqualTo(minimumSalary, min)
            );
            Predicate maximumLessThan = criteriaBuilder.or(
                    criteriaBuilder.isNull(maximumSalary),
                    criteriaBuilder.lessThanOrEqualTo(maximumSalary, max)
            );

            if (min != null) {
                finalPredicate = criteriaBuilder.and(finalPredicate, minimumGreaterThan);
            }

            if (max != null) {
                finalPredicate = criteriaBuilder.and(finalPredicate, maximumLessThan);
            }

            return finalPredicate;
        };
    }

    /**
     * Creates a {@link Specification} to find postings with a specified main job category ID.
     *
     * @param categoryId the ID of the main job category
     * @return a {@link Specification} for filtering postings by main job category ID
     */
    public static Specification<Posting> hasMainJob(Integer categoryId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("mainJob").get("id"), categoryId);
    }

    /**
     * Creates a {@link Specification} to find postings with a specified sub-job category ID.
     *
     * @param categoryId the ID of the sub-job category
     * @return a {@link Specification} for filtering postings by sub-job category ID
     */
    public static Specification<Posting> hasSubJob(Integer categoryId) {
        return (root, query, criteriaBuilder) -> {
            Join<JobCategory, Posting> subJobsJoin = root.join("subJobs", JoinType.LEFT);
            return criteriaBuilder.equal(subJobsJoin.get("id"), categoryId);
        };
    }

    /**
     * Creates a {@link Specification} to find postings with a specified job category ID,
     * either as a main job or as a sub-job category.
     *
     * @param categoryId the ID of the job category
     * @return a {@link Specification} for filtering postings by job category ID
     */
    public static Specification<Posting> hasJobCategory(Integer categoryId) {
        return (root, query, criteriaBuilder) -> {
            Predicate mainJobPredicate = hasMainJob(categoryId).toPredicate(root, query, criteriaBuilder);
            Predicate subJobPredicate = hasSubJob(categoryId).toPredicate(root, query, criteriaBuilder);
            return criteriaBuilder.or(mainJobPredicate, subJobPredicate);
        };
    }

    /**
     * Creates a {@link Specification} to find postings with a specified job type.
     *
     * @param jobType the {@link JobType} of the posting
     * @return a {@link Specification} for filtering postings by job type
     */
    public static Specification<Posting> hasJobType(JobType jobType) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("jobType"), jobType);
    }

    /**
     * Creates a {@link Specification} to find postings with a specified position category ID.
     *
     * @param positionId the ID of the position category
     * @return a {@link Specification} for filtering postings by position category ID
     */
    public static Specification<Posting> hasPositionCategory(Integer positionId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("position").get("id"), positionId);
    }

    /**
     * Creates a {@link Specification} to find postings with a specified experience requirement.
     *
     * @param experienceRequire the {@link ExperienceRequire} enumeration value of the posting
     * @return a {@link Specification} for filtering postings by experience requirement
     */
    public static Specification<Posting> hasExperienceRequire(ExperienceRequire experienceRequire) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("experienceRequire"), experienceRequire);
    }

    private PostingSpecifications() {
    }
}
