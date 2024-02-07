import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style.css"
import { Link } from 'react-router-dom';

const Mytrains = () => {

  
  const [token, setToken] = useState(localStorage.getItem('authUserToken') || null);
  const [trainData, setTrainData] = useState([])


  const handleDelete = async (num) => {
    const userConfirmed = window.confirm('Do you want to proceed?');

    if (userConfirmed) {
      console.log(num);
      const headers = {
        Authorization: `Bearer ${token}`, 
      };
      try{
        console.log(num)
        const responces = await axios.delete(`http://localhost:7001/home/delete-reservation/${num}`,
          {
            headers: headers,
          }
        )
        console.log(responces.status)
        window.location.reload()
      }catch (error){
        console.log(error)
      }
    } else {
      console.log('User clicked Cancel');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        
        
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        
        const response = await axios.get(`http://localhost:7001/home/get-Reservations`, {
          headers: headers,
        });

    
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
   {token? <div>
    {trainData.map((item)=>{
        return  <div className='train-container'>
        <h3>{item.trainName} ({item.trainNumber}) {item.dateOfJourney} {item.time}</h3>
        <div className='source-dest'>
            <p className='source'>{item.source}</p>
            <p>to</p>
            <p className='dest'>{item.dest}</p>
        </div>
        <div className='class-details'>
         <div className='class-type'>
                <p>{item.classtype}</p>
                <p>{item.numberOfSeats}</p>
            </div>
        </div>
        <div className='buttons'>
            <a className='remove-btn' href='#' onClick={() => handleDelete(item.pnrNumber)}>Delete</a>
        </div>
    </div>
    })}
    </div>:<div>You are not loggied in Please login <Link to={'/user/login'}>Login</Link></div>}
    </div>
  )
};

export default Mytrains;
