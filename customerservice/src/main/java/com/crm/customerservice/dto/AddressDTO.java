package com.crm.customerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {

    private String numberOrStreet;
    private String stateOrProvince;
    private String countryCode;
    private String zipCode;
    private String country;
    private String city;
    private String barangay;
    private String region;

}
