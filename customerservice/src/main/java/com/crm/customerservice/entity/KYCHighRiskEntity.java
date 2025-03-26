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
@Table(name = "kychighrisk")
public class KYCHighRiskEntity {

    @Id
    private Long id;

    private String sourceOfWealth;
    private String proofOfSow;
    private String customerLinkedCompanyNames;
    private String banksWithCustomersAccount;
    private String proofOfAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private Customer customer;
}
