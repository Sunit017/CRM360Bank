package com.crm.accountservice.repository;

import com.crm.accountservice.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccountRepo extends JpaRepository<AccountEntity,String> {
    List<AccountEntity> findByCustomerId(String customerId);
}
