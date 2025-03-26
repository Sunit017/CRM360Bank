package com.crm.customerservice.exception;

public class CustomerDetailsNotFoundException extends RuntimeException{

    public CustomerDetailsNotFoundException(String message) {
        super(message);
    }
}
