import React, { useState, useEffect, useMemo } from "react";
import "./index.scss";
import { Alert } from "../../components/Alert";
import { History } from "./History";
import { validateVin } from "../../helpers/validateVin";
import { getVinData } from "../../api/getVinData";

const isEmpty = (value) => {
  return value === null || value === undefined || value === "";
};

const getErrorFromResults = (results) => {
  return results.find((i) => i.Variable === "Error Text").Value;
};

export const Decoder = () => {
  const [vin, setVin] = useState("");
  const [decodedData, setDecodedData] = useState(null);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [inputError, setInputError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  });

  const decodedDataList = useMemo(
    () =>
      decodedData?.Results?.length
        ? decodedData.Results.filter((item) => !isEmpty(item.Value))
        : [],
    [decodedData]
  );

  const handleVinChange = (event) => {
    const eventValue = event.target.value;
    if (eventValue.length <= 17) {
      setVin(eventValue);
    }
  };

  const onVinInputBlur = () => {
    if (!vin || validateVin(vin)) {
      setInputError("");
    } else {
      setInputError("Enter correct VIN code");
    }
  };

  const isButtonDisabled = useMemo(() => {
    return !validateVin(vin);
  }, [vin]);

  const decodeVin = (vinValue) => {
    getVinData(
      vinValue,
      (data) => {
        setDecodedData(data);
        addToHistory(vinValue);
        setVin("");
        setErrorMessage(getErrorFromResults(data.Results));
      },
      () => {
        setErrorMessage("Failed to fetch data");
      }
    );
  };

  const handleDecode = () => {
    decodeVin(vin);
  };

  const addToHistory = (vin) => {
    const vinList = [...new Set([vin, ...history])].slice(0, 5);
    setHistory(vinList);
  };

  return (
    <div className="decoder">
      <div className="decoder-form">
        <h1>VIN Decoder</h1>
        <div className="decoder-form-content">
          <div className="decoder-form-input-container">
            <input
              className="decoder-form-input"
              type="text"
              value={vin}
              onChange={handleVinChange}
              placeholder="Enter VIN (17-character)"
              onBlur={onVinInputBlur}
            />
            {inputError && (
              <div className="decoder-form-input-error">{inputError}</div>
            )}
          </div>
          <button
            className="decoder-form-button"
            onClick={handleDecode}
            disabled={isButtonDisabled}
          >
            Decode
          </button>
        </div>
      </div>

      <History list={history} onSelect={decodeVin} />

      {decodedData?.Message && <Alert type="info">{decodedData.Message}</Alert>}
      {errorMessage && <Alert type="error">{errorMessage}</Alert>}
      {decodedDataList.map((data) => (
        <div className="decoded-data">
          <div className="decoded-data-value">{data.Variable}: </div>
          <div className="decoded-data-variable">{data.Value}</div>
        </div>
      ))}
    </div>
  );
};
