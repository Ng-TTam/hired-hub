package com.graduation.hiredhub.repository.specification;

import com.graduation.hiredhub.entity.User;
import com.graduation.hiredhub.entity.enumeration.Role;
import com.graduation.hiredhub.entity.enumeration.Status;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecifications {
    public static Specification<User> hasRole(Role role) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("account").get("role"), role);
    }

    public static Specification<User> hasEmail(String email) {
        String pattern = "%" + email + "%";
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(root.get("account").get("email"), pattern);
    }

    public static Specification<User> hasStatus(Status status) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("account").get("status"), status);
    }

    public static Specification<User> isNotPending() {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.notEqual(root.get("account").get("status"), Status.PENDING);
    }

    private UserSpecifications() {
    }
}
