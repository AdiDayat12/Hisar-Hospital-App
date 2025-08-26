package com.hisarhospital.hisar_hospital_api.exception;

/**
 * @author adilinan
 */

public class SlotNotAvailable extends RuntimeException {
    public SlotNotAvailable(String message) {
        super(message);
    }
}
