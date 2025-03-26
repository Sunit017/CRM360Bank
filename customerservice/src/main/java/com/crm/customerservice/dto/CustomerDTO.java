package com.crm.customerservice.dto;

import com.crm.customerservice.entity.AddressEntity;
import com.crm.customerservice.entity.BusinessDetailsEntity;
import com.crm.customerservice.entity.KYCHighRiskEntity;
import com.crm.customerservice.entity.NomineeEntity;
import com.crm.customerservice.entity.PersonalDetails;
import com.crm.customerservice.util.RegexConstants;
import com.crm.customerservice.validation.AllowEmptyValueWithValidation;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Data
public class CustomerDTO{

    private String firstName;

    private String middleName;

    private String lastName;

    @Min(value = 1000000000L, message = "Customer ID must be 10 digits")
    private Long customerId;

    @AllowEmptyValueWithValidation(regexp = RegexConstants.MOBILE_NUMBER_REGEX, message = "Mobile number must be exactly 10 digits")
    private String mobileNumber;

    @Email(message = "Email address must be valid")
    private String emailAddress;

    @AllowEmptyValueWithValidation(regexp = RegexConstants.EKYC_ARN_NUMBER_REGEX, message = "eKYC ARN Number must be a number")
    private String ekycArnNumber;

    private LocalDate clientBirthDate;
    private String gender;
    private LocalDate creationDate;
    private String branch;
    private String homePhoneNumber;
    private String mobileNumber2;
    private Set<AddressEntity> addresses;
    private Set<NomineeEntity> nominees;
    private KYCHighRiskEntity kycDetails;
    private PersonalDetails personalDetails;

}

