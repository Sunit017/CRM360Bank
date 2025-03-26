package com.crm.customerservice.service.client;

import com.crm.customerservice.dto.AccountDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "account360", url = "http://localhost:8081")
public interface AccountFeignClient {

    @GetMapping("account-service/account/{customerId}")
    List<AccountDto> getAccountByCustomerId(@PathVariable("customerId") String customerId);
}
