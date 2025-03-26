package com.crm.customerservice.repository;

import com.crm.customerservice.entity.BusinessDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessDetailsRepo extends JpaRepository<BusinessDetailsEntity,Long> {
}
