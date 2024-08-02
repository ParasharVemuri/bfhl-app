import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      // Validate JSON format
      const parsedData = JSON.parse(inputValue);
      if (!parsedData || !parsedData.data || !Array.isArray(parsedData.data)) {
        setError('Invalid JSON format. Please provide an array under the "data" key.');
        return;
      }

      setError('');

      // Call the REST API
      const res = await axios.post('http://localhost:5000/bfhl', parsedData);
      setResponse(res.data);
    } catch (err) {
      setError('Failed to parse JSON or request error.');
    }
  };

  const handleOptionChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;
    const selectedValues = selectedOptions.map(option => option.value);
    const data = {};
    if (selectedValues.includes('Alphabets')) data.alphabets = response.alphabets;
    if (selectedValues.includes('Numbers')) data.numbers = response.numbers;
    if (selectedValues.includes('Highest alphabet')) data.highest_alphabet = response.highest_alphabet;

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Enter the JSON data and select the attributes from the drop down list to display them</h1>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Enter JSON here'
        rows={6}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Select
        isMulti
        options={[
          { value: 'Alphabets', label: 'Alphabets' },
          { value: 'Numbers', label: 'Numbers' },
          { value: 'Highest alphabet', label: 'Highest alphabet' },
        ]}
        onChange={handleOptionChange}
      />
      {renderResponse()}
    </div>
  );
}

export default App;

