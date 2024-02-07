import React, { useState } from 'react';
import axios from 'axios';
import "../style.css"

const Search = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [trainDetails, setTrainDetails] = useState(null);

  const fetchTrainDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:7002/admin/get-train/${trainNumber}`);
      console.log(response.data)
      setTrainDetails(response.data);
    } catch (error) {
      alert("not found")
      console.error('Error fetching train details:', error);
    }
  };

  return (
    <div>
    <div className='search-container'>
      <h2>Train Details</h2>
      <label>
        Enter Train Number:
        <input
          type="text"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
        />
      </label>
      <button onClick={fetchTrainDetails}>Fetch Details</button>
    </div>
    {trainDetails && (
        <div className='train-container'>
        <h3>{trainDetails.trainName} ({trainDetails.trainNumber}) {trainDetails.dateOfJourney} {trainDetails.time}</h3>
        <div className='source-dest'>
            <p className='source'>{trainDetails.source}</p>
            <p>to</p>
            <p className='dest'>{trainDetails.dest}</p>
        </div>
        <div className='class-details'>
        {trainDetails.classType.map((classtrainDetails)=>{
            return <div className='class-type'>
                <p>{classtrainDetails.classtype}</p>
                <p>{classtrainDetails.numberOfSeats}</p>
            </div>
        })}
        </div>
    </div>
      )}
    </div>
  );
};

export default Search;
