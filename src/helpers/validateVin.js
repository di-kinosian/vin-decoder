const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/

export const validateVin = (vin) => VIN_REGEX.test(vin);
