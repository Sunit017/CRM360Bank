package com.crm.customerservice.dto;


import lombok.Data;

import java.math.BigDecimal;

@Data
public class FinancialDetailsDTO {

    private BigDecimal monthlyIncome;

    private BigDecimal annualIncome;

    private String sourceOfFunds;

    private boolean carOwnership;

    private boolean homeOwnershipPermanent;

    private String sourceOfFundsCode;
}
