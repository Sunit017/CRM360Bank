package com.crm.customerservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "business_details")
public class BusinessDetailsEntity {

    @Id
    private Long id;
    private String natureOfBusiness;
    private String businessName;
    private String businessIndustryType;
    private String officePhoneNumber;
    private int yearsOfOperating;
    private int monthsOperating;
    private String businessEmail;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;

}
