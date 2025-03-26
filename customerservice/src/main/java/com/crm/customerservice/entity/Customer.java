package com.crm.customerservice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "customerId")
public class Customer {

    @Id
    @Column(name = "customer_id")
    private String customerId; // 10-digit unique ID, can be string

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "ekyc_arn_number")
    private String ekycArnNumber;

    @Column(name = "client_birth_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate clientBirthDate;

    @Column(name = "gender")
    private String gender; // Can be 'M' or 'F'

    @Column(name = "creation_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

    @Column(name = "branch")
    private String branch;

    @Column(name = "home_phone_number")
    private String homePhoneNumber;

    @Column(name = "mobile_number_2")
    private String mobileNumber2;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JoinTable(
            name = "customer_address_nominee",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "address_id")
    )
    @ToString.Exclude
    private Set<AddressEntity> addresses = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JoinTable(
            name = "customer_address_nominee",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "nominee_id")
    )
    @ToString.Exclude
    private Set<NomineeEntity> nominees = new HashSet<>();

    @OneToOne(mappedBy = "customer")
    private KYCHighRiskEntity kycDetails;

    @OneToOne(mappedBy = "customer")
    private PersonalDetails personalDetails;

    @OneToOne(mappedBy = "customer")
    private BusinessDetailsEntity businessDetailsEntity;

    @OneToOne(mappedBy = "customer")
    private FinancialDetails financialDetails;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return Objects.equals(customerId, customer.customerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId);
    }

}
