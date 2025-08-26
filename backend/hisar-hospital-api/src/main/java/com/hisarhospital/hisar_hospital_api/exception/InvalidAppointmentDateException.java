package com.hisarhospital.hisar_hospital_api.exception;

/**
 * @author adilinan
 */
 
public class InvalidAppointmentDateException extends RuntimeException {
  public InvalidAppointmentDateException(String message) {
    super(message);
  }
}
