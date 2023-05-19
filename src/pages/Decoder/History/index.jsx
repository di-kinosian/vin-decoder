import React, { useState } from "react";
import arrowIcon from "../../../assets/arrow.svg";
import "./index.scss";

export const History = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleHistory = () => {
    setIsOpen(!isOpen);
  };

  return props.list.length > 0 ? (
    <section className="history">
      <div className="history-title">
        <h3>Recently decoded VIN numbers</h3>
        <img
          src={arrowIcon}
          alt=""
          className={`history-title-icon ${isOpen ? 'open' : 'close'}`}
          onClick={toggleHistory}
        />
      </div>
      {isOpen && props.list.length > 0 ? (
        <ul className="history-list">
          {props.list.map((item, index) => (
            <li
              className="history-list-item"
              key={index.toString()}
              onClick={() => {
                props.onSelect(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  ) : null;
};
