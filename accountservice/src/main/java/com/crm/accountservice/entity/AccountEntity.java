package com.crm.accountservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "account")
public class AccountEntity {
    @Id
    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "account_holder_name")
    private String accountHolderName;

    @Column(name = "account_type")
    private String accountType;

    @Column(name = "account_state")
    private String accountState;

    @Column(name = "account_opening_date")
    private Date accountOpeningDate;

    @Column(name = "account_close_date")
    private Date accountCloseDate;

    @Column(name = "current_balance")
    private String currentBalance;

    @Column(name = "available_balance")
    private String AvailableBalance;

    @Column(name = "accrued_interest")
    private String accruedInterest;

    @Column(name = "customer_id")
    private String customerId;
}
