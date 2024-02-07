import React, { useState } from 'react'
import "../style.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function UserReservation(props) {
  const [token] = useState(localStorage.getItem('authUserToken') || null);

  const [options, seOptions] = useState([])

  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('');
  const [classInputValues, setClassInputValues] = useState({});
  const [classList, setClassList] = useState([])
 

  const handleClassInputChange = (event) => {
    const { name, value } = event.target;
    setClassInputValues((prevInputValues) => ({ ...prevInputValues, [name]: value }));
    console.log(classInputValues)
  };


  const [trainDetails, setTrainDetails] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    date: '',
    time: '',
    general: '',
    ac: '',
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:7002/admin/get-train/${trainDetails.trainNumber}`);
      console.log(response.data)
      const data = response.data

      setClassList(data.classType)

      const date_list = data.dateOfJourney.split("-")||[];
      
      const time = data.time.split(':')[0]+":"+data.time.split(':')[1]||''
      console.log(time)
      let date = ""
      for(let i=0; i<date_list.length; i++){
        date = date + date_list[i]
        if(i!== date_list.length-1){
          date = date+"-"
        }
      }

    const option_list = []
      for(let i=0;i<data.classType.length;i++){
        option_list.push(data.classType[i].classtype)
      }

      seOptions(option_list)
      const formatedData = {
        trainNumber: data.trainNumber,
        trainName: data.trainName,
        source: data.source,
        destination: data.dest,
        date: date,
        time: time,
        general: '',
        ac: ''
      }

      setTrainDetails(formatedData);
    } catch (error) {
      console.error('Error fetching train details:', error);
    }
  }

  
  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    
    setClassInputValues({});
  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainDetails({
      ...trainDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello")
    // Here you can use the trainDetails state as needed (e.g., send it to the server or store it in local state)
    let formatedDetails = {
    classtype: Object.keys(classInputValues)[0],
    numberOfSeats: classInputValues[Object.keys(classInputValues)[0]]
    }
    console.log(formatedDetails)
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      // Replace 'your-api-endpoint' with the actual endpoint where you want to send the data
      const response = await axios.post(`http://localhost:7001/home/reserve-ticket/${trainDetails.trainNumber}`, formatedDetails, {
        headers: headers,
      });

      // Handle the server response as needed
      console.log('Server response:', response.status);
      console.log('Server response:', response.data);
      alert("Your total cost Rs"+response.data.totalCost)
      navigate('/user/mytrains')
      window.location.reload()
    } catch (error) {
      // Handle errors
      console.error('Error sending data to server:', error);
    }
  };

  

  return (
    <div>
      {token ? <div className="train-form-container">
        <h2>Train Details Form</h2>
        <form>
          <label>
            Train Number:
            <input
              type="text"
              name="trainNumber"
              value={trainDetails.trainNumber}
              onChange={handleChange}
            />
            <button onClick={handleSearch}>Search</button>
          </label>
          <label>
            Train Name:
            <input
              type="text"
              name="trainName"
              value={trainDetails.trainName}
              onChange={handleChange}
              readOnly
              className='readonly'
            />
          </label>
          <label>
            Source:
            <input
              type="text"
              name="source"
              value={trainDetails.source}
              onChange={handleChange}
              readOnly
              className='readonly'
            />
          </label>
          <label>
            Destination:
            <input
              type="text"
              name="destination"
              value={trainDetails.destination}
              onChange={handleChange}
              readOnly
              className='readonly'
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={trainDetails.date}
              onChange={handleChange}
              readOnly
              className='readonly'
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={trainDetails.time}
              onChange={handleChange}
              readOnly
              className='readonly'
            />
          </label>
          <label>
          {classList.map((item)=>{
            return <p>{item.classtype} - Available Seats: {item.numberOfSeats}</p>
          })}
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">choose  class</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {selectedOption && (
        <div>
          <label>
            {selectedOption} No of seats:
            <input
              type="text"
              name={`${selectedOption}`}
              value={classInputValues[`${selectedOption}`] || ''}
              onChange={handleClassInputChange}
            />
          </label>
        </div>
      )}
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div> :
      <div>You are not loggied in Please login <Link to={'/user/login'}>Login</Link></div>
      }

    </div>
  )
}

export default UserReservation