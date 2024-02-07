import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home(props) {

  

  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [trainData, setTrainData] = useState([])



  const handleDelete = async (num)=>{
    const headers = {
      Authorization: `Bearer ${token}`, // Include authorization header if needed
    };
    try{
      console.log(num)
      const responces = await axios.delete(`http://localhost:7002/admin/delete-TrainDetails/${num}`,
        {
          headers: headers,
        }
      )
      console.log(responces.status)
      window.location.reload()
    }catch (error){
      console.log(error)
    }
    
  }


  useEffect(() => {
    const fetchData = async () => {
      
      try {
        // Your headers
        const user = localStorage.getItem('currentUser')
        const headers = {
          Authorization: `Bearer ${token}`, // Include authorization header if needed
        };

        // Make a GET request with headers
        const response = await axios.get(`http://localhost:7002/admin/allTrainsOf/${user}`, {
          headers: headers,
        });

        // Handle the server response
        console.log('Server Response:', response.data);
        setTrainData(response.data)
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [token]);


    // const data = [
    //     {
    //         trainNumber:'12456',
    //         trainName:'test',
    //         classType:[{
    //           classtype:'General',
    //           numberOfSeats:'20',
    //         },
    //       {
    //         classtype: 'AC',
    //         numberOfSeats:'20'
    //       }],
    //       source:'Mandya',
    //       dest:'bangalore',
    //       dateOfJourney:"2024-12-12T20:13.489+00:00"
    //       }
    // ]

   

  return (
    <div>
   {token? <div>
    {trainData.map((item)=>{
        return  <div className='train-container'>
        <h3>{item.trainName} ({item.trainNumber}) {item.dateOfJourney} {item.time} </h3>
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
        <div className='buttons'>
            <Link onClick={(e) => props.onUpdate(e, item)} className='update-btn' to={`/admin/update`}>Update</Link>
            <a className='remove-btn' onClick={(e) => handleDelete(item.trainNumber)} href='#'>Delete</a>
        </div>
    </div>
    })}
    </div>:<div>You are not loggied in Please login <Link to={'/admin/login'}>Login</Link></div>}
    </div>
  )
}

export default Home