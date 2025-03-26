package com.crm.customerservice.controller;

import com.crm.customerservice.dto.*;
import com.crm.customerservice.service.ICustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;

    @GetMapping("/all")
    public Page<CustomerDTO> getAllCustomers(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size)  {
        return customerService.getAllCustomers(page, size);
    }

    @GetMapping("/search")
    public ResponseEntity<List<CustomerDTO>> searchCustomers(
            @Valid CustomerDTO customerDTO,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "middleName",required = false) String middleName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "customerId", required = false) Long customerId,
            @RequestParam(value = "emailAddress", required = false) String emailAddress,
            @RequestParam(value = "mobileNumber", required = false) String mobileNumber,
            @RequestParam(value = "ekycArnNumber", required = false) String ekycArnNumber) {

        List<CustomerDTO> customers = customerService.searchCustomers(firstName,middleName, lastName, customerId, emailAddress, mobileNumber, ekycArnNumber);
        return ResponseEntity.ok(customers);
    }

    @GetMapping("kyc/{customerId}")
    public ResponseEntity<KYCHighRiskDTO> getKYCHighRiskDetails(@PathVariable Long customerId)
    {
       KYCHighRiskDTO highRiskDTO=customerService.getKYCHighRiskDetails(customerId);
       return ResponseEntity.ok(highRiskDTO);
    }

    @GetMapping("/business-details/{customerId}")
    public ResponseEntity<BusinessDetailsDTO> getBusinessDetails(@PathVariable Long customerId)
    {
        BusinessDetailsDTO detailsDTO=customerService.getBusinessDetails(customerId);
        return ResponseEntity.ok(detailsDTO);
    }

    @GetMapping("personalinfo/{customerId}")
    public ResponseEntity<PersonalDetailsDTO>getPersonalDetails(@PathVariable Long customerId){
        PersonalDetailsDTO personalDetailsDTO = customerService.getPersonalDeatils(customerId);
        return ResponseEntity.ok(personalDetailsDTO);
    }

    @GetMapping("financialinfo/{customerId}")
    public ResponseEntity<FinancialDetailsDTO>getFinancialDetails(@PathVariable Long customerId){
        FinancialDetailsDTO financialDetailsDTO = customerService.getFinancialDetails(customerId);
        return ResponseEntity.ok(financialDetailsDTO);
    }

    @GetMapping("{customerId}/accounts")
    public ResponseEntity<List<AccountDto>> getAccountById(@PathVariable String customerId){
        List<AccountDto> accountDto =  customerService.getAccountsByCustomerId(customerId);
        return ResponseEntity.ok(accountDto);
    }

    @GetMapping(value="{customerId}/address",produces = "application/json")
    public ResponseEntity<AddressDTO> getAddressDetails(@PathVariable Long customerId,@RequestParam String addressType){

        AddressDTO addressDTO=customerService.getAddressDetails(customerId,addressType);
        return ResponseEntity.ok(addressDTO);
    }

}
