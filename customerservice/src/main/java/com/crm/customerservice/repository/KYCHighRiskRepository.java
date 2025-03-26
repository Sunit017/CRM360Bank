package com.crm.customerservice.repository;

import com.crm.customerservice.entity.KYCHighRiskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KYCHighRiskRepository extends JpaRepository<KYCHighRiskEntity,Long> {

}
