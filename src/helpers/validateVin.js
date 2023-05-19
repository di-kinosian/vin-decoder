const VIN_REGEX =
  /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/;

export const validateVin = (vin) => VIN_REGEX.test(vin);
