package com.crm.customerservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD,ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AllowEmptyValueWithValidator.class)
public @interface AllowEmptyValueWithValidation {

    String message() default "Invalid Format";
    String regexp();


    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};


}
