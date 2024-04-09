import React, { useState } from "react";
import QrReader from "react-qr-reader";

const QRCodeReader = ({ handleScan }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (err) => {
    setErrorMessage("Error accessing camera");
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default QRCodeReader;
