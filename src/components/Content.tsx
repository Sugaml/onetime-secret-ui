import React, { useState } from "react";
import { generateSecretUrl } from "../services/api";
import "./content.css"; 

const SecretUrlComponent: React.FC = () => {
  const [content, setContent] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [validDays, setValidDays] = useState("");
  const [url, setUrl] = useState<string | null>(null);

  const handleButtonClick = async () => {
    try {
      if (content.trim() === "" || passphrase.trim() === "" || validDays.trim() === "") {
        alert("All fields must be filled.");
        return;
      }

      const response = await generateSecretUrl(content, passphrase, parseInt(validDays, 10));
      setUrl(response);
    } catch (error) {
      // Handle error if needed.
    }
  };

  return (
    <div className="container">
      <label className="label">
        Secret Content:
        <textarea
          rows={4}
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your secret content here..."
        />
      </label>
      <label className="label">
        Passphrase:
        <input
          type="password"
          className="input"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="Enter passphrase"
        />
      </label>
      <label className="label">
        Valid Days:
        <input
          type="number"
          className="input"
          value={validDays}
          onChange={(e) => setValidDays(e.target.value)}
          placeholder="Enter the number of valid days"
        />
      </label>
      <br />
      <button className="button" onClick={handleButtonClick}>
        Create Secret
      </button>
      {url && (
        <div className="urlContainer">
          <p className="urlText">Secret URL:</p>
          <a className="urlLink" href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  );
};

export default SecretUrlComponent;
