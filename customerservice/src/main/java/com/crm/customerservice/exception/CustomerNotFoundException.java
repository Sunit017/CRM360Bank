package com.crm.customerservice.exception;

public class CustomerNotFoundException extends RuntimeException {

    public CustomerNotFoundException(String message) {
        super(message);
    }
}