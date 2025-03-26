package com.crm.customerservice.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class AllowEmptyValueWithValidator implements ConstraintValidator<AllowEmptyValueWithValidation,String> {

    private String regexp;

    @Override
    public void initialize(AllowEmptyValueWithValidation constraintAnnotation) {
        this.regexp=constraintAnnotation.regexp();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value==null || value.trim().isEmpty())
        {
                return true;
        }
        return Pattern.matches(regexp,value);

    }
}
