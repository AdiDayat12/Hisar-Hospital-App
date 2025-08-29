package com.hisarhospital.hisar_hospital_api.exception;

/**
 * @author adilinan
 */

public class SlotNotAvailableException extends RuntimeException {
    public SlotNotAvailableException(String message) {
        super(message);
    }
}
