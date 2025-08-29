package com.hisarhospital.hisar_hospital_api.exception;

/**
 * @author adilinan
 */

public class EmailAlreadyExistException extends RuntimeException{
    public EmailAlreadyExistException (String message) {
        super(message);
    }
}
