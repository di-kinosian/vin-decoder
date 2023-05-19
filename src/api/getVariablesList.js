export const getVariablesList = (onSuccess) => {
  fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`
  )
    .then((response) => response.json())
    .then(onSuccess)
    .catch((error) => {
      console.error("Error while fetching data", error);
    });
};
