import React, { useState } from 'react';
import { TCString } from '@iabtechlabtcf/core';

const App = () => {
  const [consentString, setConsentString] = useState('');
  const [decodedString, setDecodedString] = useState('');


  function convertSetsToArrays(obj) {
    // Check if the current object is an array
    if (Array.isArray(obj)) {
        return obj.map(convertSetsToArrays); // Recursively apply to each element
    }
    
    // Check if the current object is a set
    if (obj instanceof Set) {
        return Array.from(obj); // Convert Set to Array
    }

    // If the current object is an object, traverse its properties
    if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = convertSetsToArrays(obj[key]); // Recursively apply to each property
            }
        }
        return newObj;
    }

    // Return the original value if it's neither an array nor an object nor a set
    return obj;
}

  const handleInputChange = (event) => {
    setConsentString(event.target.value);
  };

  const handleDecode = () => {
    try {
      const decoded = TCString.decode(consentString);
      setDecodedString(JSON.stringify(convertSetsToArrays(decoded), null, 2));
      console.log(decoded)
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
