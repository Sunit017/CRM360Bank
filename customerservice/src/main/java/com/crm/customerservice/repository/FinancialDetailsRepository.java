package com.crm.customerservice.repository;

import com.crm.customerservice.entity.FinancialDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialDetailsRepository extends JpaRepository<FinancialDetails,Long> {
}
