package com.crm.customerservice.repository;

import com.crm.customerservice.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepo extends JpaRepository<AddressEntity,Long> {
}
