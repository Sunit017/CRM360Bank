package com.crm.accountservice.services;

import com.crm.accountservice.entity.AccountEntity;
import com.crm.accountservice.repository.AccountRepo;
import lombok.experimental.PackagePrivate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@PackagePrivate
class IAccountServiceImpl implements IAccountService {
    @Autowired
    private AccountRepo accountRepo;

    @Override
    public List<AccountEntity> getAllAccounts() {
        return accountRepo.findAll();
    }

    @Override
    public List<AccountEntity> getAccountsByCustomerId(String customerId) {
        return accountRepo.findByCustomerId(customerId);
    }

}
