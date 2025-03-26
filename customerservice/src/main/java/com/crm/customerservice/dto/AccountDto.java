package com.crm.customerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {
    private String customerId;
    private String accountType;
    private double balance;
    private String accountNumber;
    private String accountState;
    private Date accountOpeningDate;
    private Date accountCloseDate;
    private String currentBalance;
    private String AvailableBalance;
    private String accruedInterest;
}
