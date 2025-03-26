package com.crm.accountservice.services;

import com.crm.accountservice.entity.AccountEntity;

import java.util.List;

public interface IAccountService {
    List<AccountEntity> getAllAccounts();
    List<AccountEntity> getAccountsByCustomerId(String customerId);
}
