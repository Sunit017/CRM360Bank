package com.crm.customerservice.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="personaldetails")
@Entity
public class PersonalDetails {

    @Id
    private Long id;
    private String salutation;           // Salutation (e.g., Mr., Ms.)
    private String suffix;               // Suffix (e.g., Jr., Sr.)
    private String civilStatus;          // Civil Status (e.g., Single, Married)
    private String placeOfBirth;         // Place of Birth
    private String nationality;          // Nationality
    private int yearsInResidence;        // Years in Residence
    private String preferredMailingAddress; // Preferred Mailing Address
    private int numberOfDependents;      // Number of Dependents
    private String job;                  // My Job (employed or self-employed)
    private boolean marketingConsent;    // Marketing Consent (true/false)
    private LocalDateTime dateTimeField; // Date time field (using LocalDateTime for timestamp)
    private int nomineeCounter;          // Nominee Counter
    private String customerIdType;       // Customer ID Type
    private String cardIssuanceStatus;   // Card Issuance Status
    private String jobCode;              // My Job Code (employed or self-employed)
    private boolean dataPrivacyAgreement;// Data Privacy Agreement (true/false)
    private boolean recordEditByCustomer;// Record Edit by Customer (true/false)
    private String fatcaW9IdType;        // FATCA - W9 Form Details - ID Type
    private String fatcaW9IdNumber;      // FATCA - W9 Form Details - ID Number
    private boolean termConditions;      // Term Conditions (true/false)
    private String clientType;           // Client Type
    private String fatcaCertificationStatus; // FATCA - Certification of US/Non-US Status
    private String designation;          // Designation
    private String idmArnNumber;         // IDM ARN No
    private String arnNumber;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;
}
