import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { useParams } from "react-router-dom";
import "./index.scss";

export const VariableDetails = () => {
  const [variableData, setVariableData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setVariableData(data.Results.find((item) => item.ID.toString() === id));
      })
      .catch((error) => {
        console.error("Error decoding VIN:", error);
      });
  }, [id]);

  console.log(variableData, "here");

  return (
    <>
      {variableData !== null ? (
        // <div className="data-variable">
        <div className="data">
          <h2>Variable Details:</h2>
          <h3>Name:</h3>
          <div className="data-name">{variableData.Name}</div>

          <h3>Description:</h3>
          <div
            className="data-description"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(variableData.Description),
            }}
          />
        </div>
      ) : // </div>
      null}
    </>
  );
};
