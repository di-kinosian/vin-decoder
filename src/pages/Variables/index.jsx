import sanitizeHtml from "sanitize-html";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { getVariablesList } from "../../api/getVariablesList";

export const Variables = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getVariablesList((data) => {
      setList(data.Results);
    });
  }, []);

  return (
    <>
      <h2 className="page-title">Variables</h2>
      <div className="list">
        {list.map((variable) => (
          <Link
            to={`/variables/${variable.ID}`}
            className="list-link"
            key={variable.ID}
          >
            <div className="list-row">
              <span className="list-row-name">{variable.Name}</span>

              <div
                className="list-row-description"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(variable.Description),
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
