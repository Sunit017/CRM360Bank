package com.crm.customerservice.service;

import com.crm.customerservice.dto.BusinessDetailsDTO;
import com.crm.customerservice.dto.CustomerDTO;
import com.crm.customerservice.dto.KYCHighRiskDTO;
import com.crm.customerservice.dto.PersonalDetailsDTO;
import com.crm.customerservice.dto.SearchParam;
import com.crm.customerservice.dto.*;
import com.crm.customerservice.entity.*;
import com.crm.customerservice.exception.CustomerDetailsNotFoundException;
import com.crm.customerservice.exception.InvalidInputException;
import com.crm.customerservice.exception.ResourceNotFoundException;
import com.crm.customerservice.exception.SqlException;
import com.crm.customerservice.entity.QCustomer;
import com.crm.customerservice.repository.CustomerRepo;
import com.crm.customerservice.repository.KYCHighRiskRepository;
import com.crm.customerservice.service.client.AccountFeignClient;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.experimental.PackagePrivate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@PackagePrivate
class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private CustomerRepo customerRepository;
    @Autowired
    private KYCHighRiskRepository kycHighRiskRepository;
    @Autowired
    private ModelMapper modelMapper;
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    AccountFeignClient accountFeignClient;

    @Override
    public Page<CustomerDTO> getAllCustomers(int page, int size) {
        if (page < 0 || size <= 0) {
            throw new InvalidInputException("Page number and size must be greater than zero.");
        }
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            // Using the pageRequest object to fetch paginated data
            Page<Customer> pageOfCustomer = customerRepository.findAll(pageRequest);
            return pageOfCustomer.map(customer -> modelMapper.map(customer, CustomerDTO.class));
        } catch (DataAccessException exception) {
            throw new SqlException("Error occurred while retrieving customers from the database.");
        }
    }

    public List<CustomerDTO> searchCustomers(String firstName, String middleName, String lastName, Long customerId,
                                             String emailAddress, String mobileNumber, String ekycArnNumber) {

        if (areAllParametersNull(customerId, firstName, middleName, lastName, emailAddress, mobileNumber, ekycArnNumber)) {
            throw new IllegalArgumentException("At least one search parameter must be provided.");
        }
        List<Customer> customers = getSearchResult(firstName, middleName, lastName, customerId, emailAddress, mobileNumber, ekycArnNumber);

        if (customers.isEmpty()) {
            throw new CustomerDetailsNotFoundException("No customers found for the given search criteria.");
        }

        return customers.stream()
                .map(customer -> modelMapper.map(customer, CustomerDTO.class))
                .collect(Collectors.toList());
    }

    private boolean areAllParametersNull(Long customerId, String firstName, String middleName, String lastName, String emailAddress, String mobileNumber, String ekycArnNumber) {
        return Objects.isNull(customerId) && Objects.isNull(firstName) && Objects.isNull(middleName) && Objects.isNull(lastName) &&
                Objects.isNull(emailAddress) && Objects.isNull(mobileNumber) && Objects.isNull(ekycArnNumber);
    }

    private List<Customer> getSearchResult(String firstName, String middleName, String lastName, Long customerId,
                                           String emailAddress, String mobileNumber, String ekycArnNumber) {
        JPAQuery<Customer> query = new JPAQuery<>(entityManager);

        SearchParam searchParam = new SearchParam();
        searchParam.setFirstName(firstName);
        searchParam.setMiddleName(middleName);
        searchParam.setLastName(lastName);
        searchParam.setCustomerId(String.valueOf(customerId));
        searchParam.setEmailAddress(emailAddress);
        searchParam.setMobileNumber(mobileNumber);
        searchParam.setEkycArnNumber(ekycArnNumber);

        QCustomer qCustomer = QCustomer.customer;


        BooleanBuilder builder = new BooleanBuilder();
        if (searchParam.getFirstName() != null) {
            builder.or(qCustomer.firstName.eq(searchParam.getFirstName()));
        }
        if (searchParam.getMiddleName() != null) {
            builder.or(qCustomer.middleName.eq(searchParam.getMiddleName()));
        }
        if (searchParam.getLastName() != null) {
            builder.or(qCustomer.lastName.eq(searchParam.getLastName()));
        }
        if (searchParam.getCustomerId() != null) {
            builder.or(qCustomer.customerId.eq(searchParam.getCustomerId()));
        }
        if (searchParam.getEmailAddress() != null) {
            builder.or(qCustomer.emailAddress.eq(searchParam.getEmailAddress()));
        }
        if (searchParam.getMobileNumber() != null) {
            builder.or(qCustomer.mobileNumber.eq(searchParam.getMobileNumber()));
        }
        if (searchParam.getEkycArnNumber() != null) {
            builder.or(qCustomer.ekycArnNumber.eq(searchParam.getEkycArnNumber()));
        }

        return query.from(qCustomer).where(builder).fetch();
    }

    public Customer getCustomerWithAddresses(Long customerId) {
        return customerRepository.findCustomerWithAddresses(customerId);
    }

    @Override
    public KYCHighRiskDTO getKYCHighRiskDetails(Long customerId) {
        Optional<KYCHighRiskEntity> kycHighRiskEntityOptional = customerRepository.findById(customerId)
                .map(Customer::getKycDetails);
        return kycHighRiskEntityOptional.map(data -> modelMapper.map(data, KYCHighRiskDTO.class)).orElseThrow();
    }

    @Override
    public BusinessDetailsDTO getBusinessDetails(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerDetailsNotFoundException("Customer with ID " + customerId + " not found"));
        BusinessDetailsEntity businessDetailsEntity = customer.getBusinessDetailsEntity();
        if (businessDetailsEntity == null) {
            throw new ResourceNotFoundException("Business details for customer with ID " + customerId + " not found");
        }
        return modelMapper.map(businessDetailsEntity, BusinessDetailsDTO.class);
    }

    @Override
    public FinancialDetailsDTO getFinancialDetails(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerDetailsNotFoundException("Customer with ID " + customerId + " not found"));
        FinancialDetails financialDetails = customer.getFinancialDetails();
        if (financialDetails == null) {
            throw new ResourceNotFoundException("Business details for customer with ID " + customerId + " not found");
        }
        return modelMapper.map(financialDetails, FinancialDetailsDTO.class);
    }

    @Override
    public AddressDTO getAddressDetails(Long customerId, String addressType) {
        Customer customer= customerRepository.findById(customerId)
                .orElseThrow(()->new CustomerDetailsNotFoundException("Customer with ID " + customerId + " not found"));
        AddressEntity addressEntity=customer.getAddresses().stream()
                .filter(address->address.getAddressType().equalsIgnoreCase(addressType))
                .findFirst()
                .orElseThrow(()->new ResourceNotFoundException("Address of type " + addressType + " for customer with ID " + customerId + " not found"));

        return modelMapper.map(addressEntity,AddressDTO.class);
    }

    @Override
    public List<AccountDto> getAccountsByCustomerId(String customerId) {
        List<AccountDto> accountDtos = accountFeignClient.getAccountByCustomerId(customerId);
        if(accountDtos.isEmpty()){
            //return empty list
            return Collections.emptyList();
        }
        return accountFeignClient.getAccountByCustomerId(customerId);
    }


    @Override
    public PersonalDetailsDTO getPersonalDeatils(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerDetailsNotFoundException("Customer with ID " + customerId + " not found"));
        PersonalDetails personalDetails = customer.getPersonalDetails();
        if (personalDetails == null) {
            throw new ResourceNotFoundException("Business details for customer with ID " + customerId + " not found");
        }
        return modelMapper.map(personalDetails, PersonalDetailsDTO.class);
    }



}
