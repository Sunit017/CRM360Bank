package com.crm.customerservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        ErrorMessage message =new ErrorMessage(errors.toString(),HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex)
    {
        ErrorMessage errorMessage=new ErrorMessage(ex.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(errorMessage,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomerDetailsNotFoundException.class)
    public ResponseEntity<Object> handleCustomerNotFoundException(CustomerDetailsNotFoundException ex)
    {
        ErrorMessage errorMessage=new ErrorMessage(ex.getMessage(), HttpStatus.OK);
        return new ResponseEntity<>(errorMessage,HttpStatus.OK);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex)
    {
        ErrorMessage errorMessage=new ErrorMessage(ex.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(errorMessage,HttpStatus.OK);
    }

}
