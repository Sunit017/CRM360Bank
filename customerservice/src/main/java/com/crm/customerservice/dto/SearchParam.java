package com.crm.customerservice.dto;

import lombok.Data;

@Data
public class SearchParam {
    private String customerId;

    private String firstName;

    private String middleName;

    private String lastName;

    private String mobileNumber;

    private String emailAddress;

    private String ekycArnNumber;
}
