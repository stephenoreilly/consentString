import React, { useState } from 'react';
import { TCString } from '@iabtechlabtcf/core';

const App = () => {
  const [consentString, setConsentString] = useState('');
  const [decodedString, setDecodedString] = useState('');

  const handleInputChange = (event) => {
    setConsentString(event.target.value);
  };

  const handleDecode = () => {
    try {
      const decoded = TCString.decode(consentString);
      setDecodedString(JSON.stringify(decoded, null, 2));
    } catch (error) {
      setDecodedString('Invalid consent string');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Consent String Decoder</h1>
      <input
        type="text"
        value={consentString}
        onChange={handleInputChange}
        placeholder="Enter consent string"
        style={styles.input}
      />
      <button onClick={handleDecode} style={styles.button}>
        Decode Consent String
      </button>
      <pre style={styles.output}>{decodedString}</pre>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  output: {
    marginTop: '20px',
    whiteSpace: 'pre-wrap',
    maxWidth: '300px',
    backgroundColor: '#eee',
    padding: '10px',
    borderRadius: '5px',
  },
};

export default App;
