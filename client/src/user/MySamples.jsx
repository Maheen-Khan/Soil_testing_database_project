import React, { useEffect, useState } from 'react';
import './MySamples.css';
import axios from 'axios';

// const samplesData = [
//   { id: 1, date: '08/09/2024', status: 'In progress', details: 'Details of sample 1...' },
//   { id: 2, date: '04/10/2024', status: 'Completed', details: 'Details of sample 2...' },
//   { id: 3, date: '02/23/2021', status: 'Completed', details: 'Details of sample 3...' },
// ];


const MySamples = () => {
  const [samplesData,setSamplesData] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(()=>{

  const getSamples = async () =>  {
    try{
      console.log(1);
      const url = "http://localhost:3001/request/get/all/";
      
      const user2 = sessionStorage.getItem("user").slice(1,-1);
      console.log(2);
      
      const res = await axios.post(url + user2);
      console.log(3);

      const samplesData2 = res.data.map(i => ({
        id: i._id,
        date : new Date(i.createdAt).toLocaleDateString(),
        status : i.status,
        tests : i.tests
      })) ;

      setSamplesData(samplesData2);
      console.log(res.data[0].tests);
  
      
    }catch (err){
      console.log(err);
    }
  
  }


    getSamples()
  },[]);
  
  return (
    <div className="request-sample-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Soil Test</h2>
        {samplesData.map(sample => (
          <div
            key={sample.id}
            className="sample-item"
            onClick={() => {setSelectedSample(sample);
                            setSelectedResult(sample.tests);
                            }}
          >
            <p>{sample.date}</p>
            <p>Status: {sample.status}</p>
          </div>
        ))}
      </div>
      
        {/* Details Section */}
        <div className="details-section">
          {selectedSample ? (
            <div className="sample-details">
              <h3>Sample Details</h3>
              <p><strong>Date:</strong> {selectedSample.date}</p>
              <p><strong>Status:</strong> {selectedSample.status}</p>
              <p><strong>Details:</strong> {selectedSample.details}</p>
            </div>
          ) : (
            <div className="placeholder">
              <p>Select a sample to see details</p>
            </div>
          )}


{selectedResult ? (
  <div className="sample-details">
    <h3>Sample Details</h3>
    {selectedResult.map((test,index) => (
            <div key={index} className="test-item">
              <p><strong>{test.testId.testName}:</strong> {test.value} {test.testId.unit || ""}</p>
      </div>

    ))}

  </div>
) : (
            <div className="placeholder">
              <p></p>
            </div>
          )}
        </div>
    
    </div>
    
    
  );
};

export default MySamples;
