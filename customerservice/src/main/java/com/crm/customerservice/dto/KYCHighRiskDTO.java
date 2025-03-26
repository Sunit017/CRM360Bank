package com.crm.customerservice.dto;

import lombok.Data;

@Data
public class KYCHighRiskDTO {

    private String sourceOfWealth;
    private String proofOfSow;
    private String customerLinkedCompanyNames;
    private String banksWithCustomersAccount;
    private String proofOfAddress;
}
