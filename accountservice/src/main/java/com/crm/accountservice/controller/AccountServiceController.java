package com.crm.accountservice.controller;

import com.crm.accountservice.entity.AccountEntity;
import com.crm.accountservice.services.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/account-service")
public class AccountServiceController {
    @Autowired
    private IAccountService accountService;

    @GetMapping("/all-accounts")
    public ResponseEntity<List<AccountEntity>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/account/{customerId}")
    public ResponseEntity<List<AccountEntity>> getAccounts(@PathVariable String customerId) {
        return ResponseEntity.ok(accountService.getAccountsByCustomerId(customerId));
    }
}
