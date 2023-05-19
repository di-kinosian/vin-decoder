import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { useParams } from "react-router-dom";
import "./index.scss";
import { getVariablesList } from "../../api/getVariablesList";

export const VariableDetails = () => {
  const [variableData, setVariableData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getVariablesList((data) => {
      setVariableData(data.Results.find((item) => item.ID.toString() === id));
    });
  }, [id]);

  return variableData !== null ? (
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
  ) : null;
};
