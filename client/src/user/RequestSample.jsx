import React, { useState } from 'react';
import './RequestSample.css';

const soilTests = [
  { id: 1, name: 'Soil Lead Screening and pH Test', price: 25 },
  { id: 2, name: 'Basic Soil Quality Test', price: 20 },
  { id: 3, name: 'Lead XRF screening', price: 15 },
  { id: 4, name: 'pH Test', price: 10 },
  { id: 5, name: 'Soil Class', price: 12 },
  { id: 6, name: 'Soluble Salts', price: 18 },
  { id: 7, name: 'NPK kits', price: 22 },
  { id: 8, name: 'Organic content', price: 16 },
];

const RequestSample = () => {
  const [selectedTests, setSelectedTests] = useState([]);

  const handleCheckboxChange = (test) => {
    setSelectedTests((prevSelected) => {
      if (prevSelected.some((item) => item.id === test.id)) {
        // Remove if already selected
        return prevSelected.filter((item) => item.id !== test.id);
      } else {
        // Add if not selected
        return [...prevSelected, test];
      }
    });
  };

  const total = selectedTests.reduce((acc, test) => acc + test.price, 0);

  return (
    <div className="request-sample-page">
      {/* Selection Area */}
      <div className="selection-area">
        <h2>Select Soil Tests</h2>
        {soilTests.map((test) => (
          <div key={test.id} className="checkbox-item">
            <input
              type="checkbox"
              id={`test-${test.id}`}
              onChange={() => handleCheckboxChange(test)}
              checked={selectedTests.some((item) => item.id === test.id)}
            />
            <label htmlFor={`test-${test.id}`}>{test.name}</label>
          </div>
        ))}
      </div>

      {/* Summary Cart */}
      <div className="summary-cart">
        <h3>Summary</h3>
        {selectedTests.length === 0 ? (
          <p>No tests selected</p>
        ) : (
          <ul className="summary-list">
            {selectedTests.map((test) => (
              <li key={test.id} className="summary-item">
                <span>{test.name}</span>
                <span>${test.price}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="summary-total">
          <hr />
          <p>
            <strong>Total:</strong> <span>${total}</span>
          </p>
        </div>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default RequestSample;
