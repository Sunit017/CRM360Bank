package com.crm.customerservice.exception;

public class InvalidInputException extends RuntimeException{

    public InvalidInputException(String message){
        super(message);
    }
}
