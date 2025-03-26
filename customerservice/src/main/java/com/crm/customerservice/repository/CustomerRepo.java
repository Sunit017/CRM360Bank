package com.crm.customerservice.repository;


import com.crm.customerservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> , QuerydslPredicateExecutor<Customer> {
    @Query("SELECT c FROM Customer c JOIN FETCH c.addresses WHERE c.id = :customerId")
    Customer findCustomerWithAddresses(@Param("customerId") Long customerId);

}
