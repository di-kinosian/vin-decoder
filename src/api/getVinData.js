import { validateVin } from "../helpers/validateVin";

export const getVinData = (vin, onSuccess, onError) => {
  if (validateVin(vin)) {
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
    )
      .then((response) => response.json())
      .then(onSuccess)
      .catch(onError);
  }
};
