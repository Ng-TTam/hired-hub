package com.graduation.hiredhub.repository.specification;

import com.graduation.hiredhub.entity.Company;
import org.springframework.data.jpa.domain.Specification;

public class CompanySpecifications {
    public static Specification<Company> isActive(boolean isActive) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("isActive"), isActive);
    }

    public static Specification<Company> hasName(String name) {
        String pattern = "%" + name + "%";
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(root.get("name"), pattern);
    }

    private CompanySpecifications() {
    }
}
