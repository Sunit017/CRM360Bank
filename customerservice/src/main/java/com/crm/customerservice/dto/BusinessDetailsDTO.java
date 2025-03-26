package com.crm.customerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusinessDetailsDTO {

    private String natureOfBusiness;
    private String businessName;
    private String businessIndustryType;
    private String officePhoneNumber;
    private int yearsOfOperating;
    private int monthsOperating;
    private String businessEmail;
}
