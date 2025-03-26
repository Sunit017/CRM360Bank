package com.crm.customerservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "financialdetails")
public class FinancialDetails {

    @Id
    private Long id;

    private BigDecimal monthlyIncome;

    private BigDecimal annualIncome;

    private String sourceOfFunds;

    private boolean carOwnership;

    private boolean homeOwnershipPermanent;

    private String sourceOfFundsCode;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;

}
