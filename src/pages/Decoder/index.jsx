import React, { useState, useEffect } from "react";
import thanIcon from "../../assets/thanIcon.svg";
import "./index.scss";

const isEmpty = (value) => {
  return value === null || value === undefined || value === "";
};

export const Decoder = () => {
  const [vin, setVin] = useState("");
  const [decodedData, setDecodedData] = useState(null);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history" || []))
  );
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  });

  const handleVinChange = (event) => {
    const eventValue = event.target.value;
    if (eventValue.length <= 17) {
      setVin(eventValue);
    }
  };

  const handleDecode = () => {
    if (validateVin(vin)) {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setDecodedData(data.Results.filter((item) => !isEmpty(item.Value)));
          addToHistory(vin);
          setVin("");
        })
        .catch((error) => {
          console.error("Error decoding VIN:", error);
        });
    }
  };
  const addToHistory = (vin) => {
    const vinList = [...new Set([vin, ...history])].slice(0, 5);
    console.log(vinList, "vinList");
    setHistory(vinList);
  };

  const validateVin = (vin) => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegex.test(vin);
  };

  const openHistory = () => {
    setIsOpen(!isOpen);
  };

  // console.log(history, "history");
  return (
    <div className="decoder">
      <div className="decoder-container">
        <h1 className="container-header">VIN Decoder</h1>
        <div className="decoder-container-content">
          <input
            className="decoder-container-content-input"
            type="text"
            value={vin}
            onChange={handleVinChange}
            placeholder="Enter VIN (17-character)"
          />
          <button
            className="decoder-container-content-button"
            onClick={handleDecode}
            disabled={!vin || vin.length < 17}
          >
            Decoder
          </button>
        </div>
      </div>
      <div className="history-title">
        <h3>Recently decoding VIN numbers</h3>
        {/* <div className="history-title-icon" onClick={openHistory}>+</div> */}
        <img
          src={thanIcon}
          alt="thanIcon"
          // className="history-title-icon"
          className={isOpen ? 'history-title-rotated' : 'history-title-icon'}
          onClick={openHistory}
        />
      </div>
      {isOpen && history.length > 0 ? (
        <div className="history">
          <ul>
            {history.map((vin, index) => (
              <li
                className="history-item"
                key={index.toString()}
                // onClick={handleDecode}
              >
                {vin}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {decodedData && (
        <>
          <h3>Decoded Data:</h3>
          {decodedData.map((data) => (
            <div className="decoded-data">
              <div className="decoded-data-value">{data.Variable}: </div>
              <div className="decoded-data-variable">{data.Value}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
