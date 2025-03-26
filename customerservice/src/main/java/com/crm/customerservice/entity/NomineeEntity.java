package com.crm.customerservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "nominee")
@AllArgsConstructor
@NoArgsConstructor
public class NomineeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nominee_id")
    private Long id;

    @Column(name = "number_or_street")
    private String numberOrStreet;

    @Column(name = "state_or_province")
    private String stateOrProvince;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "barangay")
    private String barangay;

    @Column(name = "region")
    private String region;

    @Column(name = "address_type")
    private String addressType;

    @Column(name = "name")
    private String name;

    @Column(name = "dob")
    private String dob;

    @Column(name = "relationship")
    private String relationship;

    @ManyToMany(mappedBy = "nominees")
    @JsonIgnore
    private Set<Customer> customers = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "address_id")
    @JsonIgnore
    private AddressEntity address;

}
