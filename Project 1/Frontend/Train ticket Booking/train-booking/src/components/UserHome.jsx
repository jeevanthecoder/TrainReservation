import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserHome(props) {

  const [token, setToken] = useState(localStorage.getItem('authUserToken') || null);
  const [trainData, setTrainData] = useState([])

 
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        
        const headers = {
          Authorization: `Bearer ${token}`, 
        };

        
        const response = await axios.get(`http://localhost:7001/home/getAllTrains`);

        
        console.log('Server Response:', response.data);
        setTrainData(response.data)
      } catch (error) {
        
        console.error('Error:', error);
      }
    };

    
    fetchData();
  }, [token]);

   

  return (
    <div>
   <div>
    {trainData.map((item)=>{
        return  <div className='train-container'>
        <h3>{item.trainName} ({item.trainNumber}) {item.dateOfJourney} {item.time}</h3>
        <div className='source-dest'>
            <p className='source'>{item.source}</p>
            <p>to</p>
            <p className='dest'>{item.dest}</p>
        </div>
        <div className='class-details'>
        {item.classType.map((classItem)=>{
            return <div className='class-type'>
                <p>{classItem.classtype}</p>
                <p>{classItem.numberOfSeats}</p>
            </div>
        })}
        </div>
    </div>
    })}
    </div>
    </div>
  )
}

export default UserHome