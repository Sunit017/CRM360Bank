package com.crm.customerservice.service;

import com.crm.customerservice.dto.*;
import com.crm.customerservice.entity.Customer;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICustomerService {

    Page<CustomerDTO> getAllCustomers(int page, int size);
    List<CustomerDTO> searchCustomers(String firstName,String middleName,String lastName, Long customerId,
                                      String emailAddress, String mobileNumber, String ekycArnNumber) ;

    KYCHighRiskDTO getKYCHighRiskDetails(Long customerId);

    PersonalDetailsDTO getPersonalDeatils(Long customerId);

    BusinessDetailsDTO getBusinessDetails(Long customerId);

    FinancialDetailsDTO getFinancialDetails(Long customerId);

    List<AccountDto> getAccountsByCustomerId(String customerId);

    AddressDTO getAddressDetails(Long customerId,String addressType);
}
